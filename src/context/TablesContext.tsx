'use client';

import React, { createContext, useEffect } from 'react';

import { GameMaster, Table } from '@prisma/client';
import searchTable from '@/lib/searchTable';
import countTable from '@/lib/countTables';

interface TablesContextType {
	tables: (Table & { gameMaster: GameMaster })[];
	setTables: React.Dispatch<
		React.SetStateAction<(Table & { gameMaster: GameMaster })[]>
	>;
	count: number;
	setCount: React.Dispatch<React.SetStateAction<number>>;
}

export const TablesContext = createContext<TablesContextType | null>(null);

export default function TablesContextProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [tables, setTables] = React.useState<
		(Table & { gameMaster: GameMaster })[]
	>([]);

	const [count, setCount] = React.useState(0);

	useEffect(() => {
		const fetchTables = async () => {
			const tables = await searchTable({
				title: '',
				system: '',
			});
			const count = await countTable({
				title: '',
				system: '',
			});
			setTables(tables);
			setCount(count);
		};

		fetchTables();
	}, []);

	return (
		<TablesContext.Provider value={{ tables, setTables, count, setCount }}>
			{children}
		</TablesContext.Provider>
	);
}
