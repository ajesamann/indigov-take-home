import { Request, Response } from 'express';
import { Constituent } from '@prisma/client';
import { buildCSV } from '../utils/CSVUtils';
import { APIError } from '../utils/errorUtils';
import { isValidEmail } from '../utils/stringUtils';
import {
    getAllConstituents,
    searchConstituentsByName,
    addOrMergeConstituent,
    searchConstituentsByDate,
} from '../services/constituentService';

// List all constituents
export const getAllConstituentsHandler = async (
    _: Request,
    res: Response
): Promise<void> => {
    try {
        const constituents: Constituent[] = await getAllConstituents();
        res.json({ data: constituents, count: constituents.length });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' });
    }
};

// Add new constituent (merge if exists)
export const addNewConstituentHandler = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { name, email, address }: Partial<Constituent> = req.body;

    try {
        if (!name || !email || !address) {
            throw new APIError('Missing required fields.', 400);
        }

        if (!isValidEmail(email)) {
            throw new APIError('Invalid email address.', 400);
        }

        const lowercasedEmail: string = email.toLowerCase();
        const constituent: Constituent = await addOrMergeConstituent(
            name,
            lowercasedEmail,
            address
        );

        res.json({ data: constituent, count: 1 });
    } catch (error) {
        if (error instanceof APIError) {
            // Handle expected errors
            res.status(error.code).json({ error: error.message });
        } else {
            // Handle unexpected errors
            res.status(500).json({ error: 'Internal server error.' });
        }
    }
};

// Export constituents to CSV (optionally filtered by before and after dates)
export const exportToCSVHandler = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { before, after } = req.query;

        const constituents: Constituent[] = await searchConstituentsByDate(
            before as string,
            after as string
        );

        // Sort the constituents by createdAt date (ascending)
        constituents.sort(
            (a, b) =>
                new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime()
        );

        // Build CSV from sorted data
        const csv: string = buildCSV(constituents);

        res.header('Content-Type', 'text/csv');
        res.attachment('constituents.csv');
        res.send(csv);
    } catch (error) {
        res.status(500).json({ error: 'Error exporting CSV.' });
    }
};

// List all constituents whose names contain the provided value from the `contains__name` query parameter
export const searchConstituentsByNameHandler = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { name__contains } = req.query;

        const constituents: Constituent[] = await searchConstituentsByName(
            name__contains as string
        );

        res.json({ data: constituents, count: constituents.length });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' });
    }
};
