export type HeroData = {
	hero_id: number;
	last_played: number;
	games: number;
	win: number;
	with_games: number;
	with_win: number;
	against_games: number;
	against_win: number;
	points: number;
	avatar: string;
	personaname: string;
	hero_name: string;
	image: string;
};

export type ParamsData = {
	lobby_type: number;
	date: number;
};

export type WeightsData = {
	[index: number]: [number, number, number, number, number] | number[];
};

export type StatData = {
	'': number;
	id: number;
	name: string;
	primary_attr: string;
	attack_type: string;
	roles: string[];
	img: string;
	icon: string;
	base_health: number;
	base_health_regen: number;
	base_mana: number;
	base_mana_regen: number;
	base_armor: number;
	base_mr: number;
	base_attack_min: number;
	base_attack_max: number;
	base_str: number;
	base_agi: number;
	base_int: number;
	str_gain: number;
	agi_gain: number;
	int_gain: number;
	attack_range: number;
	projectile_speed: number;
	attack_rate: number;
	base_attack_time: number;
	attack_point: number;
	move_speed: number;
	turn_rate: number;
	cm_enabled: string;
	legs: string;
	day_vision: number;
	night_vision: number;
	localized_name: string;
	'1_pick': number;
	'1_win': number;
	'2_pick': number;
	'2_win': number;
	'3_pick': number;
	'3_win': number;
	'4_pick': number;
	'4_win': number;
	'5_pick': number;
	'5_win': number;
	'6_pick': number;
	'6_win': number;
	'7_pick': number;
	'7_win': number;
	'8_pick': number;
	'8_win': number;
	turbo_picks: number;
	turbo_picks_trend: number[];
	turbo_wins: number;
	turbo_wins_trend: number[];
	pro_pick: number;
	pro_win: number;
	pro_ban: number;
	pub_pick: number;
	pub_pick_trend: number[];
	pub_win: number;
	pub_win_trend: number[];
	pos1_pick: number;
	pos1_win: number;
	pos2_pick: number;
	pos2_win: number;
	pos3_pick: number;
	pos3_win: number;
	pos4_pick: number;
	pos4_win: number;
	pos5_pick: number;
	pos5_win: number;
	[index: string]: number | string | number[] | string[];
};
