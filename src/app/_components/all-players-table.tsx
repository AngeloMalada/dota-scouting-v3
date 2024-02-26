'use client';
import React from 'react';
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	getKeyValue,
} from '@nextui-org/react';
import { HeroData } from '@/utils/types';

const columns = [
	{
		key: 'personaname',
		label: 'PLAYER NAME',
	},
	{
		key: 'hero_name',
		label: 'HERO NAME',
	},
	{
		key: 'points',
		label: 'POINTS',
	},
	{
		key: 'last_played',
		label: 'LAST PLAYED',
	},
];

const AllPlayersTableComponent: React.FC<{ heroes: Readonly<HeroData[]> }> = ({
	heroes,
}) => {
	return (
		<Table aria-label='Example table with dynamic content'>
			<TableHeader columns={columns}>
				{(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
			</TableHeader>
			<TableBody items={heroes}>
				{(hero: HeroData) => (
					<TableRow key={hero.hero_id}>
						{(columnKey) => (
							<TableCell>
								{columnKey === 'last_played'
									? new Date(getKeyValue(hero, columnKey)).toLocaleDateString(
											'en-US',
											{
												timeZone: 'UTC',
												day: '2-digit',
												month: '2-digit',
												year: 'numeric',
											}
									  )
									: getKeyValue(hero, columnKey)}
							</TableCell>
						)}
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
};

export default AllPlayersTableComponent;
