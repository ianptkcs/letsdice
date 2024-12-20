'use client';

import { auth } from '@/app/firebase/config';
import findUser from '@/lib/findUser';
import { User } from '@prisma/client';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

export interface UserContextType {
	user: User | null;
	setUser: React.Dispatch<React.SetStateAction<User | null>>;
	loading: boolean;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
	authUser: any;
}

export const UserContext = React.createContext<UserContextType | null>(null);

export default function UserContextProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [user, setUser] = React.useState<User | null>(null);
	const [loading, setLoading] = React.useState(true);
	const [authUser] = useAuthState(auth);

	useEffect(() => {
		const fetchUser = async () => {
			if (authUser) {
				const dbUser = await findUser({ uid: authUser.uid });
				setUser(dbUser);
			} else {
				setUser(null);
			}
			setLoading(false);
		};

		fetchUser();
	}, [authUser]);

	return (
		<UserContext.Provider
			value={{ user, setUser, loading, setLoading, authUser }}
		>
			{children}
		</UserContext.Provider>
	);
}
