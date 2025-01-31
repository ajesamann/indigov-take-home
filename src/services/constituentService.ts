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
    name: string
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
