import React from 'react';
import { SidebarProvider } from './ui/sidebar';
import UserContextProvider from '@/context/UserContext';

export default function GeneralProviders({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<UserContextProvider>
			<SidebarProvider>{children}</SidebarProvider>
		</UserContextProvider>
	);
}
