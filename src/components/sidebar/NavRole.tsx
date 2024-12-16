'use client';

import * as React from 'react';
import { Book, ChevronsUpDown, Dices, Plus } from 'lucide-react';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from '@/components/ui/sidebar';

const roles = [
	{
		name: 'Player',
		icon: Dices,
	},
	{
		name: 'Game Master',
		icon: Book,
	},
];

export function NavRole() {
	const { isMobile } = useSidebar();
	const [role, setRole] = React.useState(roles[0]);

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size='lg'
							className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
						>
							<div className='flex aspect-square size-6 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
								<role.icon className='size-3' />
							</div>
							<div className='grid flex-1 text-left text-sm leading-tight'>
								<span className='truncate font-semibold'>
									{role.name}
								</span>
							</div>
							<ChevronsUpDown className='ml-auto' />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
						align='start'
						side={isMobile ? 'bottom' : 'right'}
						sideOffset={4}
					>
						<DropdownMenuLabel className='text-xs text-muted-foreground'>
							Roles
						</DropdownMenuLabel>
						{roles.map((role, index) => (
							<DropdownMenuItem
								key={role.name}
								onClick={() => setRole(role)}
								className='gap-2 p-2'
							>
								<div className='flex size-6 items-center justify-center rounded-sm border'>
									<role.icon className='size-4 shrink-0' />
								</div>
								{role.name}
								<DropdownMenuShortcut>
									⌘{index + 1}
								</DropdownMenuShortcut>
							</DropdownMenuItem>
						))}
						<DropdownMenuSeparator />
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
