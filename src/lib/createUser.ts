'use server';

import prisma from './db';
import randomUsername from './randomUsername';

export default async function createUser({ uid }: { uid: string }) {
	return await prisma.user.create({
		data: {
			firebaseUID: uid,
			slug: randomUsername(uid),
		},
	});
}
