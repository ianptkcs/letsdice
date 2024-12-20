'use server';

import prisma from './db';

export default async function countTable({
	title,
	system,
}: {
	title: string;
	system: string;
}) {
	return await prisma.table.count({
		where: {
			title: {
				contains: title,
			},
			system: {
				contains: system,
			},
		},
	});
}
