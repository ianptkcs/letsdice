'use server';

import prisma from './db';

export default async function findUser({ uid }: { uid: string }) {
	return await prisma.user.findUnique({
		where: {
			firebaseUID: uid,
		},
	});
}
