import { Constituent, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Fetch all constituents
export const getAllConstituents = async (): Promise<Constituent[]> => {
    return await prisma.constituent.findMany();
};

// Add a new constituent or merge to an existing one
export const addOrMergeConstituent = async (
    name: string,
    email: string,
    address: string
): Promise<Constituent> => {
    return await prisma.constituent.upsert({
        where: { email: email.toLowerCase() },
        update: { name, address },
        create: { name, email: email.toLowerCase(), address },
    });
};

// Search for constituents by name
export const searchConstituentsByName = async (
    name?: string
): Promise<Constituent[]> => {
    /*
        NOTE: The `contains` filter is case-insensitive by default in Prisma when using SQLite.
    */
    const filter: Record<string, object> = {
        name: {
            contains: name,
        },
    };

    return await prisma.constituent.findMany({
        where: filter,
    });
};

// Search for constituents by signup date (before and after)
export const searchConstituentsByDate = async (
    before?: string,
    after?: string
): Promise<Constituent[]> => {
    // Parse the before and after parameters into Date objects
    const beforeDate = before ? new Date(before) : null;
    const afterDate = after ? new Date(after) : null;

    // Build the filter object based on the date parameters
    const filter: Record<string, object> = {};

    if (beforeDate) {
        filter.createdAt = { lte: beforeDate };
    }
    if (afterDate) {
        filter.createdAt = { ...filter.createdAt, gte: afterDate };
    }

    return await prisma.constituent.findMany({
        where: filter,
    });
};
