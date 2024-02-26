'use client';
import React from 'react';
import { Tabs, Tab, Card, CardBody } from '@nextui-org/react';
import { HeroData } from '@/utils/types';
import TableComponent from './table-component';
import AllPlayersTableComponent from './all-players-table';

const PlayerReport: React.FC<{
	heroes: Readonly<HeroData[][]>;
	data: string[];
}> = ({ heroes, data }) => {
	const filteredData = data.filter((item) => item);
	const flatHeroes = heroes.flat();
	flatHeroes.sort((a, b) => b.points - a.points);
	return (
		<div className='flex flex-col w-[100vw] px-2 md:w-full dark'>
			<Tabs aria-label='Options'>
				{heroes.map((hero, index) => (
					<Tab
						key={matchAccountId(filteredData[index], hero[0])}
						title={matchAccountId(filteredData[index], hero[0])}
					>
						<TableComponent heroes={hero} />
					</Tab>
				))}
				<Tab title='All'>
					<AllPlayersTableComponent heroes={flatHeroes} />
				</Tab>
			</Tabs>
		</div>
	);
};

export default PlayerReport;

export type DataArray = {
	data: Readonly<HeroData[]>;
};

function matchAccountId(accountId: string, hero: HeroData) {
	if (accountId.split('-')[0] == hero.accountid) {
		return `${hero.personaname} - ${Role[parseInt(accountId.split('-')[1])]}`;
	}
}

const Role: { [key: number]: string } = {
	1: 'Carry',
	2: 'Mid',
	3: 'Offlane',
	4: 'Support',
	5: 'Hard Support',
} as const;
