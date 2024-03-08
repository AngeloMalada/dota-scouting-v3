import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Dota 2 scouting tool',
	description: 'App for scouting players',
	icons: [
		{
			rel: 'icon',
			type: 'image/png',
			sizes: '32x32',
			url: '/favicon.png',
		},
		{
			rel: 'apple-touch-icon',
			url: '/favicon.png',
		},
		{
			rel: 'icon',
			type: 'image/png',
			sizes: '16x16',
			url: '/favicon.png',
		},
		{
			rel: 'icon',
			url: '/favicon.png',
		},
	],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' className='dark'>
			<body>
				<div className='fixed top-0 left-0 w-full h-fit text-foreground z-10 bg-[#252525] p-4'>
					<ul>
						<li className='text-3xl font-bold'>
							<Link href={'/'}>HOME</Link>
						</li>
					</ul>
				</div>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
