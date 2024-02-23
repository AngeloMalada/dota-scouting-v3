import { getPlayerReport } from '@/utils/report-functions';
import Image from 'next/image';

export default async function Home() {
	const data = await getPlayerReport(179070642, { lobby_type: 7, date: 30 }, 2);
	return (
		<main className='flex min-h-screen flex-col items-center justify-between p-24'>
			{data.map((hero) => (
				<div key={hero.hero_id} className='flex flex-col items-center w-full'>
					<div className='flex flex-row gap-4'>
						<div className='flex flex-col gap-2 text-center'>
							<img className='  w-48' src={hero.image} alt={hero.hero_name} />
							<h1>{hero.hero_name}</h1>
							<p>points {Math.round(hero.points)}</p>
						</div>
						<div className='flex flex-col gap-4'>
							<img
								src={hero.avatar}
								alt=''
								width={100}
								height={100}
								className='w-12 h-12 rounded-xl'
							/>
							<p>{hero.personaname}</p>
						</div>
					</div>
				</div>
			))}
		</main>
	);
}
