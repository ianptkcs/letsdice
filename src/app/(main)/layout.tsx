import AppSidebar from '@/components/sidebar/AppSidebar';
import React from 'react';

export default function MainLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<AppSidebar />
			<main className='py-5 w-full'>{children}</main>
		</>
	);
}
