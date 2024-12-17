'use client';

import { User } from '@prisma/client';
import React from 'react';

export interface UserContextType {
	user: User | null;
	setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const UserContext = React.createContext<UserContextType | null>(null);

export default function UserContextProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [user, setUser] = React.useState<User | null>(null);

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
}
