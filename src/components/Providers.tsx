import React from 'react';
import { SidebarProvider } from './ui/sidebar';
import UserContextProvider from '@/context/UserContext';

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider>
			<UserContextProvider>{children}</UserContextProvider>
		</SidebarProvider>
	);
}
