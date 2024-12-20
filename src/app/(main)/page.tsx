'use client';

import SearchCard from '@/components/home/SearchCard';
import SearchResults from '@/components/home/SearchResults';
import TableProviders from '@/components/TableProviders';
import React from 'react';

export default function Home() {
	return (
		<TableProviders>
			<div className='flex flex-col items-center gap-10'>
				<SearchCard />
				<SearchResults />
			</div>
		</TableProviders>
	);
}
