'use client';

import { TablesContext } from '@/context/TablesContext';
import React, { useEffect } from 'react';
import TableCard from './TableCard';
import { Card, CardContent } from '@/components/ui/card';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';
import { SystemContext } from '@/context/SystemContext';
import { TitleContext } from '@/context/TitleContext';
import { ChevronLeft, ChevronRight, Table } from 'lucide-react';
import { Button } from '../ui/button';
import searchTable from '@/lib/searchTable';

export default function SearchResults() {
	const systemContext = React.useContext(SystemContext);
	if (!systemContext) {
		throw new Error(
			'SystemContext must be used within a SystemContextProvider'
		);
	}
	const { system } = systemContext;

	const titleContext = React.useContext(TitleContext);
	if (!titleContext) {
		throw new Error(
			'TableContext must be used within a TableContextProvider'
		);
	}
	const { title } = titleContext;

	const tablesContext = React.useContext(TablesContext);
	if (!tablesContext) {
		throw new Error(
			'TableContext must be used within a TableContextProvider'
		);
	}
	const { tables, setTables, count } = tablesContext;

	const [myCursor, setMyCursor] = React.useState(
		tables.length > 0 ? tables.at(-1)?.id : undefined
	);

	const memoizedCursor = React.useMemo(() => {
		return tables.length > 0 ? tables.at(-1)?.id : undefined;
	}, [tables]);

	useEffect(() => {
		setMyCursor(memoizedCursor);
	}, [memoizedCursor]);

	const searchNextTables = async (cursor: number | undefined) => {
		const tables = await searchTable({
			title,
			system: system.value,
			cursor,
		});
		console.log(tables);
		setTables(tables);
		if (tables && tables.length !== 0) {
			setMyCursor(tables.at(-1)?.id);
		}
		setPrev((p) => p + 1);
	};

	const searchPrevTables = async (cursor: number | undefined) => {
		const tables = await searchTable({
			title,
			system: system.value,
			cursor,
			prev: true,
		});
		console.log(tables);
		setTables(tables);
		if (tables && tables.length !== 0) {
			setMyCursor(tables.at(-1)?.id);
		}
		setPrev((p) => p - 1);
		return;
	};

	const [prev, setPrev] = React.useState(0);

	return (
		<div className='flex w-full flex-col gap-4'>
			<p>Found {count} tables</p>
			{tables.length > 0 ? (
				<>
					<div className='grid grid-cols-4 gap-2'>
						{tables.toReversed().map((table, index) => (
							<TableCard
								key={index}
								table={table}
								gameMaster={table.gameMaster}
							/>
						))}
					</div>
				</>
			) : (
				<p>No more tables</p>
			)}
			<div className='flex justify-center gap-4'>
				<Button
					onClick={() => searchPrevTables(myCursor)}
					disabled={prev === 0}
					variant={'outline'}
				>
					<ChevronLeft />
				</Button>
				<Button
					onClick={() => searchNextTables(myCursor)}
					variant={'outline'}
					disabled={tables.length === 0}
				>
					<ChevronRight />
				</Button>
			</div>
		</div>
	);
}
