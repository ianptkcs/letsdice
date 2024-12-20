import React from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { GameMaster, Table, User } from '@prisma/client';
import findUser from '@/lib/findUser';
import Image from 'next/image';
import systemJSON from '@/data/Systems.json';
import { Item } from '@/interfaces/Item';

export default function TableCard({
	table,
	gameMaster,
}: {
	table: Table;
	gameMaster: GameMaster;
}) {
	const systems: Item[] = systemJSON;
	return (
		<Card className='w-full'>
			<CardHeader className='p-3'>
				<div className='flex justify-start items-center gap-2'>
					<Avatar className='h-8 w-8 rounded-lg border-2 border-gray-300'>
						<AvatarImage
							src='https://i.pinimg.com/736x/5d/f4/18/5df418287735c4bc97bc8e4100d0a451.jpg'
							alt={gameMaster.username}
						/>
						<AvatarFallback className='rounded-lg'>
							CN
						</AvatarFallback>
					</Avatar>
					<span className='truncate font-semibold'>
						{gameMaster.username}
					</span>
				</div>
			</CardHeader>
			<hr />
			<CardContent className='flex flex-col gap-2 p-3'>
				<div className='flex flex-col gap-1'>
					<span className='text-sm'>
						<b>Title: </b>
						{table.title}
					</span>
					<span className='text-sm truncate'>
						<b>Description: </b>
						{table.description}
					</span>
					<span className='text-sm'>
						<b>System: </b>
						{systems.find((s) => s.value === table.system)?.label}
					</span>
				</div>
				<img
					src='https://i.pinimg.com/736x/5d/f4/18/5df418287735c4bc97bc8e4100d0a451.jpg'
					alt='sim'
					className='rounded-sm object-fill'
				/>
			</CardContent>
		</Card>
	);
}
