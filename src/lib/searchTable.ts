'use server';

import prisma from './db';

export default async function searchTable({
	title,
	system,
	cursor,
	prev,
}: {
	title: string;
	system: string;
	cursor?: number | undefined;
	prev?: boolean;
}) {
	return await prisma.table.findMany({
		where: {
			title: {
				contains: title,
			},
			system: {
				contains: system,
			},
		},
		include: {
			gameMaster: true,
		},
		take: prev ? -4 : 4,
		skip: cursor ? (prev ? 4 : 1) : 0,
		orderBy: {
			id: 'asc',
		},
		cursor: cursor ? { id: cursor } : undefined,
	});
}
