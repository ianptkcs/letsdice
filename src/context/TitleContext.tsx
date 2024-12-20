'use client';

import React, { createContext } from 'react';

interface TitleContextType {
	title: string;
	setTitle: React.Dispatch<React.SetStateAction<string>>;
}

export const TitleContext = createContext<TitleContextType | null>(null);

export default function TitleContextProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [title, setTitle] = React.useState<string>('');

	return (
		<TitleContext.Provider value={{ title, setTitle }}>
			{children}
		</TitleContext.Provider>
	);
}
