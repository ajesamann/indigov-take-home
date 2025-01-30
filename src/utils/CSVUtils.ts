import { Constituent } from '@prisma/client';

export const buildCSV = (constituents: Constituent[]): string => {
    const headers: string = 'id,name,email,address,createdAt\n';
    const rows: string = constituents
        .map((c) => `${c.id},${c.name},${c.email},${c.address},${c.createdAt}`)
        .join('\n');

    return headers + rows;
};
