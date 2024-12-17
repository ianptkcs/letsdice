import React from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import SystemContextProvider from '@/context/SystemContext';
import SearchForm from './SearchForm';

export default function SearchCard() {
	return (
		<Card className='w-full'>
			<CardHeader>
				<CardTitle>Find TTRPG Tables</CardTitle>
				<CardDescription>100 tables found</CardDescription>
			</CardHeader>
			<CardContent>
				<SystemContextProvider>
					<SearchForm />
				</SystemContextProvider>
			</CardContent>
		</Card>
	);
}
