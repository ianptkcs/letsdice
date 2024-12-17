'use client';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter, useSearchParams } from 'next/navigation';
import {
	useCreateUserWithEmailAndPassword,
	useSignInWithEmailAndPassword,
} from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase/config';
import { useContext, useState } from 'react';
import { UserContext } from '@/context/UserContext';
import prisma from '@/lib/db';
import createUser from '@/lib/createUser';

export default function AuthPage() {
	const searchParams = useSearchParams();
	const t = searchParams.get('t');
	const router = useRouter();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [createUserWithEmailAndPassword] =
		useCreateUserWithEmailAndPassword(auth);
	const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
	const userContext = useContext(UserContext);
	if (!userContext) {
		return null; // or handle the null case appropriately
	}

	const { setUser } = userContext;

	const handleSignUp = async () => {
		try {
			const res = await createUserWithEmailAndPassword(email, password);
			await signInWithEmailAndPassword(email, password);
			console.log(res);
			if (res && res.user) {
				const user = await createUser({ uid: res.user.uid });
				setUser(user);
			}
			setEmail('');
			setPassword('');
			console.log('User created');
			// router.push('/');
		} catch (e) {
			console.error(e);
		}
	};

	const handleSignIn = async () => {
		try {
			const res = await signInWithEmailAndPassword(email, password);
			if (res && res.user) {
				const user = await prisma.user.findUnique({
					where: {
						firebaseID: res.user.uid,
					},
				});
				setUser(user);
			}
			setEmail('');
			setPassword('');
			router.push('/');
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<div className='flex justify-center items-center h-full w-full'>
			<Tabs
				defaultValue={t ?? 'signin'}
				className='w-[400px]'
			>
				<TabsList className='grid w-full grid-cols-2'>
					<TabsTrigger value='signin'>Sign In</TabsTrigger>
					<TabsTrigger value='signup'>Sign Up</TabsTrigger>
				</TabsList>
				<TabsContent value='signin'>
					<Card>
						<CardHeader>
							<CardTitle>Sign In</CardTitle>
							<CardDescription>
								Choose an option to sign in
							</CardDescription>
						</CardHeader>
						<CardContent className='space-y-2'>
							<div className='space-y-1'>
								<Label htmlFor='email'>Email</Label>
								<Input
									id='email'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder='example@email.com'
									type='email'
								/>
							</div>
							<div className='space-y-1'>
								<Label htmlFor='password'>Password</Label>
								<Input
									id='password'
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
									placeholder='password'
									type='password'
								/>
							</div>
						</CardContent>
						<CardFooter>
							<Button
								className='w-full'
								onClick={handleSignIn}
							>
								Sign In
							</Button>
						</CardFooter>
					</Card>
				</TabsContent>
				<TabsContent value='signup'>
					<Card>
						<CardHeader>
							<CardTitle>Sign Up</CardTitle>
							<CardDescription>
								Choose an option to sign up
							</CardDescription>
						</CardHeader>
						<CardContent className='space-y-2'>
							<div className='space-y-1'>
								<Label htmlFor='email'>Email</Label>
								<Input
									id='email'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder='example@email.com'
									type='email'
								/>
							</div>
							<div className='space-y-1'>
								<Label htmlFor='password'>Password</Label>
								<Input
									id='password'
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
									placeholder='password'
									type='password'
								/>
							</div>
						</CardContent>
						<CardFooter>
							<Button
								className='w-full'
								onClick={handleSignUp}
							>
								Sign Up
							</Button>
						</CardFooter>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
