import { getPlayerReport } from '@/utils/report-functions';
import PlayerReport from '../_components/player-report';
import { HeroData } from '@/utils/types';

export default async function ScoutReport({
	searchParams,
}: Readonly<{
	searchParams: {
		accountIDs: string;
		lobby_type: number;
		date: number;
	};
}>) {
	const data: string[] = [];
	searchParams.accountIDs.split(',').forEach(async (id) => {
		data.push(id);
	});

	let map: any = [];

	await Promise.all(
		data.map(async (id, index) => {
			const playerData = await getPlayerReport(
				parseInt(id.split('-')[0]),
				{ lobby_type: searchParams.lobby_type, date: searchParams.date },
				parseInt(id.split('-')[1])
			);
			if (playerData.length > 0) {
				map.push(playerData);
			} else {
				delete data[index];
			}
		})
	);
	map.sort((a: HeroData[], b: HeroData[]) => {
		const accountIdA = a[0].accountid;
		const accountIdB = b[0].accountid;

		const orderIndexA = data.findIndex((item) =>
			item.startsWith(`${accountIdA}-`)
		);
		const orderIndexB = data.findIndex((item) =>
			item.startsWith(`${accountIdB}-`)
		);

		return orderIndexA - orderIndexB;
	});

	return (
		<main className='flex min-h-screen flex-col items-center justify-between p-24 dark'>
			<PlayerReport heroes={map} data={data} />
		</main>
	);
}
