'use client';

import {
	BadgeCheck,
	Bell,
	ChevronsUpDown,
	CreditCard,
	LogOut,
	Sparkles,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from '@/components/ui/sidebar';
import { useContext, useEffect } from 'react';
import { UserContext } from '@/context/UserContext';
import { Button } from '../ui/button';
import Link from 'next/link';
import { Skeleton } from '../ui/skeleton';
import { signOut } from 'firebase/auth';
import { auth } from '@/app/firebase/config';

export default function NavUser() {
	const { isMobile } = useSidebar();
	const userContext = useContext(UserContext);

	if (!userContext) {
		return null; // or handle the null case appropriately
	}

	const { user, loading, authUser } = userContext;

	if (!authUser)
		return (
			<div className='flex justify-between gap-4'>
				<Button className='w-full'>
					<Link href='/auth?t=signin'>Sign In</Link>
				</Button>
				<Button className='w-full'>
					<Link href='/auth?t=signup'>Sign Up</Link>
				</Button>
			</div>
		);

	if (loading)
		return (
			<div className='flex items-center gap-2 m-2'>
				<Skeleton className='h-8 w-8 rounded-lg' />
				<div className='flex flex-col gap-2'>
					<Skeleton className='h-[13.5px] w-[160px]' />
					<Skeleton className='h-[12px] w-[160px]' />
				</div>
			</div>
		);

	if (user)
		return (
			<SidebarMenu>
				<SidebarMenuItem>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<SidebarMenuButton
								size='lg'
								className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
							>
								<Avatar className='h-8 w-8 rounded-lg'>
									<AvatarImage
										src='https://i.pinimg.com/736x/5d/f4/18/5df418287735c4bc97bc8e4100d0a451.jpg'
										alt={user.slug}
									/>
									<AvatarFallback className='rounded-lg'>
										CN
									</AvatarFallback>
								</Avatar>
								<div className='grid flex-1 text-left text-sm leading-tight'>
									<span className='truncate font-semibold'>
										{user.slug}
									</span>
									<span className='truncate text-xs'>
										{user.slug}
									</span>
								</div>
								<ChevronsUpDown className='ml-auto size-4' />
							</SidebarMenuButton>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
							side={isMobile ? 'bottom' : 'right'}
							align='end'
							sideOffset={4}
						>
							<DropdownMenuLabel className='p-0 font-normal'>
								<div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
									<Avatar className='h-8 w-8 rounded-lg'>
										<AvatarImage
											src='https://i.pinimg.com/736x/5d/f4/18/5df418287735c4bc97bc8e4100d0a451.jpg'
											alt={user.slug}
										/>
										<AvatarFallback className='rounded-lg'>
											CN
										</AvatarFallback>
									</Avatar>
									<div className='grid flex-1 text-left text-sm leading-tight'>
										<span className='truncate font-semibold'>
											{user.slug}
										</span>
										<span className='truncate text-xs'>
											{user.slug}
										</span>
									</div>
								</div>
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<DropdownMenuItem>
									<Sparkles />
									Upgrade to Pro
								</DropdownMenuItem>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<DropdownMenuItem>
									<BadgeCheck />
									Account
								</DropdownMenuItem>
								<DropdownMenuItem>
									<CreditCard />
									Billing
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Bell />
									Notifications
								</DropdownMenuItem>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								onClick={async () => await signOut(auth)}
							>
								<LogOut />
								Log out
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</SidebarMenuItem>
			</SidebarMenu>
		);
}
