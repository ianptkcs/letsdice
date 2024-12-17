'use client';

import React from 'react';
import { ComboBox } from './ComboBox';
import { Item } from '@/interfaces/Item';
import { SystemContext } from '@/context/SystemContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const systems: Item[] = [
	{ label: 'D&D 5e', value: 'dnd5e' },
	{ label: 'D&D 3.5e', value: 'dnd35e' },
	{ label: 'Pathfinder 1e', value: 'pf1e' },
	{ label: 'Pathfinder 2e', value: 'pf2e' },
	{ label: 'Starfinder', value: 'starfinder' },
	{ label: 'Cypher System', value: 'cypher' },
	{ label: 'Call of Cthulhu', value: 'coc' },
	{ label: 'Savage Worlds', value: 'savage' },
	{ label: 'World of Darkness', value: 'wod' },
	{ label: 'GURPS', value: 'gurps' },
	{ label: 'Fate', value: 'fate' },
	{ label: 'Shadowrun', value: 'shadowrun' },
	{ label: 'Mutants & Masterminds', value: 'mnm' },
	{ label: 'Warhammer Fantasy Roleplay', value: 'wfrp' },
	{ label: 'Legend of the Five Rings', value: 'l5r' },
	{ label: 'Exalted', value: 'exalted' },
	{ label: 'Runequest', value: 'runequest' },
	{ label: 'Traveller', value: 'traveller' },
	{ label: 'Tales from the Loop', value: 'loop' },
	{ label: 'Blades in the Dark', value: 'blades' },
	{ label: 'Apocalypse World', value: 'apocalypse' },
	{ label: 'Monster of the Week', value: 'motw' },
	{ label: 'Dungeon World', value: 'dungeonworld' },
	{ label: 'Ironsworn', value: 'ironsworn' },
	{ label: 'Powered by the Apocalypse', value: 'pbta' },
	{ label: 'Old School Revival', value: 'osr' },
	{ label: 'Tunnels & Trolls', value: 'tnt' },
	{ label: 'Fiasco', value: 'fiasco' },
];

export default function SearchForm() {
	const [title, setTitle] = React.useState('');
	const systemContext = React.useContext(SystemContext);
	if (!systemContext) {
		throw new Error(
			'SystemContext must be used within a SystemContextProvider'
		);
	}
	const { system, setSystem } = systemContext;

	const formSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log({ title, system });
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
