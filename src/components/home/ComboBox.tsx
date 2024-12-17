'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Item } from '@/interfaces/Item';

export function ComboBox({
	items,
	selectedItem,
	setSelectedItem,
}: {
	items: Item[];
	selectedItem: Item;
	setSelectedItem: React.Dispatch<React.SetStateAction<Item>>;
}) {
	const [open, setOpen] = React.useState(false);

	return (
		<Popover
			open={open}
			onOpenChange={setOpen}
		>
			<PopoverTrigger asChild>
				<Button
					variant='outline'
					role='combobox'
					aria-expanded={open}
					className='w-[200px] justify-between'
				>
					{selectedItem.value
						? items.find((item) => item === selectedItem)?.label
						: 'Select item...'}
					<ChevronsUpDown className='opacity-50' />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-[200px] p-0'>
				<Command>
					<CommandInput
						placeholder='Search item...'
						className='h-9'
					/>
					<CommandList>
						<CommandEmpty>No item found.</CommandEmpty>
						<CommandGroup>
							{items.map((item) => (
								<CommandItem
									key={item.value}
									value={item.value}
									onSelect={(currentValue) => {
										setSelectedItem(
											currentValue === selectedItem.value
												? { label: '', value: '' }
												: items.find(
														(item) =>
															item.value ===
															currentValue
												  ) || { label: '', value: '' }
										);
										setOpen(false);
									}}
								>
									{item.label}
									<Check
										className={cn(
											'ml-auto',
											selectedItem === item
												? 'opacity-100'
												: 'opacity-0'
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
