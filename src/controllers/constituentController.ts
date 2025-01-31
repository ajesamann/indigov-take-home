import { Request, Response } from 'express';
import { Constituent, PrismaClient } from '@prisma/client';
import { buildCSV } from '../utils/CSVUtils';
import { APIError } from '../utils/errorUtils';
import { isValidEmail } from '../utils/stringUtils';

const prisma = new PrismaClient();

// List all constituents
export const listConstituents = async (
    _: Request,
    res: Response
): Promise<void> => {
    try {
        const constituents: Constituent[] = await prisma.constituent.findMany();
        res.json({ data: constituents, count: constituents.length });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' });
    }
};

// List all constituents whose names contain the provided value from the `contains__name` query parameter
export const searchConstituentsByName = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { name__contains } = req.query;

        if (!name__contains || typeof name__contains !== 'string') {
            throw new APIError(
                'The name__contains param must be a string.',
                400
            );
        }

        const filter = {
            name: {
                contains: name__contains,
                mode: 'insensitive',
            },
        };

        const constituents: Constituent[] = await prisma.constituent.findMany({
            where: filter,
        });

        res.json({ data: constituents, count: constituents.length });
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

// Add new constituent (merge if exists)
export const addConstituent = async (
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

        const constituent: Constituent = await prisma.constituent.upsert({
            where: { email: lowercasedEmail },
            update: { name, address },
            create: { name, email: lowercasedEmail, address },
        });

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

// Export all constituents to CSV
export const exportCSV = async (_: Request, res: Response): Promise<void> => {
    try {
        const constituents: Constituent[] = await prisma.constituent.findMany();
        const csv: string = buildCSV(constituents);

        res.header('Content-Type', 'text/csv');
        res.attachment('constituents.csv');
        res.send(csv);
    } catch (error) {
        res.status(500).json({ error: 'Error exporting CSV.' });
    }
};
