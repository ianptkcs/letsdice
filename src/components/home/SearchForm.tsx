'use client';

import React from 'react';
import { ComboBox } from './ComboBox';
import { Item } from '@/interfaces/Item';
import { SystemContext } from '@/context/SystemContext';
import { Button } from '../ui/button';
import { TablesContext } from '@/context/TablesContext';
import { Input } from '../ui/input';
import searchTable from '@/lib/searchTable';
import { TitleContext } from '@/context/TitleContext';
import systemsJSON from '@/data/Systems.json';
import countTable from '@/lib/countTables';

const systems: Item[] = systemsJSON;

export default function SearchForm() {
	const systemContext = React.useContext(SystemContext);
	if (!systemContext) {
		throw new Error(
			'SystemContext must be used within a SystemContextProvider'
		);
	}
	const { system, setSystem } = systemContext;

	const titleContext = React.useContext(TitleContext);
	if (!titleContext) {
		throw new Error(
			'TableContext must be used within a TableContextProvider'
		);
	}
	const { title, setTitle } = titleContext;

	const tablesContext = React.useContext(TablesContext);
	if (!tablesContext) {
		throw new Error(
			'TableContext must be used within a TableContextProvider'
		);
	}
	const { setTables, setCount } = tablesContext;

	const formSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const tables = await searchTable({
			title,
			system: system.value,
		});
		const count = await countTable({
			title,
			system: system.value,
		});
		setTables(tables);
		setCount(count);
	};

	return (
		<form
			className='flex flex-col gap-4 items-center'
			onSubmit={formSubmit}
		>
			<div className='flex gap-4 w-full'>
				<Input
					placeholder='Tittle...'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<ComboBox
					items={systems}
					selectedItem={system}
					setSelectedItem={setSystem}
					keyword='system'
				/>
			</div>
			<Button
				type='submit'
				className='w-1/2'
			>
				Search
			</Button>
		</form>
	);
}
