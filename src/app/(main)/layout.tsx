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
			<main className='pt-5 w-full'>{children}</main>;
		</>
	);
}
