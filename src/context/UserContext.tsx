'use client';

import { User } from '@/interfaces/User';
import React from 'react';

const defaultUser: User = {
	name: 'John Doe',
	email: 'jhondoe@email.com',
	avatar: 'https://avatars.dicebear.com/api/avataaars/john-doe.svg',
};

export interface UserContextType {
	user: User;
	setUser: React.Dispatch<React.SetStateAction<User>>;
}

export const UserContext = React.createContext<UserContextType | null>(null);

export default function UserContextProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [user, setUser] = React.useState<User>(defaultUser);

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
}
