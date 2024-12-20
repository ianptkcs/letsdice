'use client';

import React, { createContext } from 'react';

import { Item } from '@/interfaces/Item';

interface SystemContextType {
	system: Item;
	setSystem: React.Dispatch<React.SetStateAction<Item>>;
}

export const SystemContext = createContext<SystemContextType | null>(null);

export default function SystemContextProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [system, setSystem] = React.useState<Item>({
		label: '',
		value: '',
	});

	return (
		<SystemContext.Provider value={{ system, setSystem }}>
			{children}
		</SystemContext.Provider>
	);
}
