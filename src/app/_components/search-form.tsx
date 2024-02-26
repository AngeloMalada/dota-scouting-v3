'use client';
import { Input, Button, Slider } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Select, SelectItem } from '@nextui-org/react';
type Inputs = {
	accountIDs: string;
	lobby_type: string;
	date: number;
};
const SearchFrom: React.FC = () => {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<Inputs>();
	const onSubmit: SubmitHandler<Inputs> = (data) => {
		router.push(
			`/scout/?accountIDs=${data.accountIDs}&lobby_type=${data.lobby_type}&date=${data.date}`
		);
	};
	return (
		<div className='flex w-1/2  flex-wrap md:flex-nowrap gap-4'>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='flex flex-col items-center gap-4 w-full'
			>
				<div className='flex flex-row gap-4 w-full'>
					<Input
						type='text'
						label='Enter account IDs'
						{...register('accountIDs')}
					/>
					<Select
						label='Lobby Type'
						{...register('lobby_type')}
						className='w-48'
					>
						<SelectItem key={7} value='7'>
							Ranked
						</SelectItem>
						<SelectItem key={1} value='1'>
							Practice
						</SelectItem>
					</Select>
					<Slider
						label='Date'
						step={1}
						maxValue={1000}
						minValue={1}
						defaultValue={30}
						className=' w-1/2'
						color='foreground'
						{...register('date')}
						onChange={(value) => {}}
					/>
				</div>
				<Button size='md' type='submit'>
					Search
				</Button>
			</form>
		</div>
	);
};

export default SearchFrom;
