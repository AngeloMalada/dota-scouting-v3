import { getPlayerReport } from '@/utils/report-functions';
import PlayerReport from '../_components/player-report';
import { useSearchParams } from 'next/navigation';
import { HeroData } from '@/utils/types';

export default async function ScoutReport({
	searchParams,
}: Readonly<{
	searchParams: {
		accountIDs: string;
	};
}>) {
	const data: string[] = [];
	searchParams.accountIDs.split(',').forEach(async (id) => {
		data.push(id);
	});

	const map: any = [];

	data.map(async (id, index) => {
		const playerData = await getPlayerReport(
			parseInt(id.split('-')[0]),
			{ lobby_type: 7, date: 30 },
			parseInt(id.split('-')[1])
		);
		if (playerData.length > 0) {
			map.push(playerData);
		} else {
			delete data[index];
		}
	});

	return (
		<main className='flex min-h-screen flex-col items-center justify-between p-24 dark'>
			<PlayerReport heroes={map} data={data} />
		</main>
	);
}
