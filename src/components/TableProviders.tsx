import SystemContextProvider from '@/context/SystemContext';
import TablesContextProvider from '@/context/TablesContext';
import TitleContextProvider from '@/context/TitleContext';
import React from 'react';

export default function TableProviders({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<TablesContextProvider>
			<TitleContextProvider>
				<SystemContextProvider>{children}</SystemContextProvider>
			</TitleContextProvider>
		</TablesContextProvider>
	);
}
