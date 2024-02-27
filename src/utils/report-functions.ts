import { stats } from './hero_stats2.ts';
import { weights, flex, meta } from './consts.ts';
import { HeroData, ParamsData, StatData, WeightsData } from './types.ts';

export async function getPlayerReport(
	player: number,
	params: ParamsData,
	playerRole: number
) {
	return await adjustPointsBasedOnMeta(player, params, playerRole);
}

async function removeHeroesWithNoGames(player: number, params: ParamsData) {
	const player_heroes = await get_player_heroes(player, params);
	return player_heroes.filter((hero) => hero.games > 0);
}
async function adjustPointsBasedOnRole(
	player: number,
	params: ParamsData,
	playerRole: number
) {
	const heroes = await removeHeroesWithNoGames(player, params);
	const weightsf: WeightsData = await calculateWeightf(weights, flex);
	heroes.map((hero: HeroData) => {
		hero.points = 0;

		for (let k = 1; k <= 5; k++) {
			const weight = weightsf[playerRole][k - 1];
			const stat = stats.find(
				(stat) => stat.id === hero.hero_id
			) as unknown as StatData;
			const pickRate = stat[`pos${k}_pick`] as number;
			const winRate = stat[`pos${k}_win`] as number;

			hero.points += weight * pickRate * winRate;
		}
	});

	return heroes;
}

async function adjustBasedOnPlayerMedal(
	player: number,
	params: ParamsData,
	playerRole: number
) {
	const heroes = await adjustPointsBasedOnRole(player, params, playerRole);
	const playerMedal = await get_player_medal(player);
	heroes.map((hero) => {
		const stat = stats.find(
			(stat) => stat.id === hero.hero_id
		) as unknown as StatData;
		const winrate = stat[`${playerMedal.rank_tier}_win`] as number;
		const pickrate = stat[`${playerMedal.rank_tier}_pick`] as number;
		hero.points = (2 * hero.points * winrate) / pickrate;
		hero.avatar = playerMedal.avatar;
		hero.personaname = playerMedal.personaname;
		hero.accountid = playerMedal.accountid;
	});
	return heroes;
}
async function adjustBasedOnPlayerPerformance(
	player: number,
	params: ParamsData,
	playerRole: number
) {
	const heroes = await adjustBasedOnPlayerMedal(player, params, playerRole);
	heroes.map((hero) => {
		hero.points = (hero.points * hero.win * hero.win) / hero.games;
	});
	return heroes;
}
async function adjustPointsBasedOnMeta(
	player: number,
	params: ParamsData,
	playerRole: number
) {
	const heroes = await getHeroName(player, params, playerRole);
	heroes.map((hero) => {
		const stat = stats.find(
			(stat) => stat.id === hero.hero_id
		) as unknown as StatData;
		hero.points = hero.points * (stat.pro_pick + stat.pro_ban);
		hero.points = Math.floor(hero.points);
	});
	setTimeToJS(heroes);
	normalizePoints(heroes);
	return removeHeroesWithNoPoints(heroes).sort((a, b) => {
		return b.points - a.points;
	});
}

async function getHeroName(
	player: number,
	params: ParamsData,
	playerRole: number
) {
	const heroes = await adjustBasedOnPlayerPerformance(
		player,
		params,
		playerRole
	);
	heroes.map((hero) => {
		const stat = stats.find(
			(stat) => stat.id === hero.hero_id
		) as unknown as StatData;
		hero.hero_name = stat.localized_name;
		hero.image = `${process.env.NEXT_PUBLIC_DOTA2IMAGES_URL}${stat.img}`;
	});
	return heroes;
}
async function setTimeToJS(heroes: HeroData[]) {
	heroes.map((hero) => {
		hero.last_played = hero.last_played * 1000;
	});
	return heroes;
}
async function get_player_medal(account_id: number) {
	const url = `${process.env.NEXT_PUBLIC_OPENDOTA_URL}/players/${account_id}`;
	const response = await fetch(url, { cache: 'no-store' });
	const data = await response.json();
	return {
		rank_tier: Math.floor(data.rank_tier / 10),
		personaname: data.profile.personaname,
		accountid: data.profile.account_id,
		avatar: data.profile.avatarfull,
	};
}
async function get_player_heroes(
	account_id: number,
	parameters: ParamsData
): Promise<HeroData[]> {
	const params = parameters
		? '?' + new URLSearchParams(parameters as unknown as string).toString()
		: '';
	const url = `${process.env.NEXT_PUBLIC_OPENDOTA_URL}/players/${account_id}/heroes${params}`;
	const response = await fetch(url);
	const data = await response.json();
	return data;
}

async function calculateWeightf(weights: WeightsData, flex: number) {
	const weightsf: WeightsData = {};

	for (const key in weights) {
		weightsf[key] = weights[key].map((value, index) => {
			return 0.2 * flex + value * (1 - flex);
		});
	}

	return weightsf;
}

async function normalizePoints(heroes: HeroData[]) {
	const sum = heroes.reduce((acc, hero) => {
		return acc + hero.points;
	}, 0);
	heroes.map((hero) => {
		hero.points = Math.round((hero.points / sum) * 1000);
	});
	return heroes;
}

function removeHeroesWithNoPoints(heroes: HeroData[]) {
	return heroes.filter((hero) => hero.points > 0);
}
