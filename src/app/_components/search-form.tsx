'use client';
import { Input, Button, Slider, Select, SelectItem } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { Role } from '@/utils/consts';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const searchSchema = z.object({
	players: z.array(
		z.object({
			id: z.string().min(1, 'Account ID is required'),
			role: z
				.string()
				.min(1, 'Role is required')
				.max(1, 'Role is single digit number'),
		})
	),
	lobby_type: z
		.string()
		.min(1, 'Lobby type is required')
		.max(1, 'Lobby type single digit number'),
	date: z
		.number()
		.min(1, 'Date is required')
		.max(1000, 'Max date is 1000 days in the past'),
});

const SearchFrom: React.FC = () => {
	const router = useRouter();
	const {
		control,
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: zodResolver(searchSchema),
		defaultValues: {
			players: [{ id: '', role: '' }],
			lobby_type: '7',
			date: 30,
		},
	});
	const onSubmit: SubmitHandler<z.infer<typeof searchSchema>> = (data) => {
		router.push(
			`/scout/?accountIDs=${data.players
				.map((player) => `${player.id}-${player.role}`)
				.join(',')}&lobby_type=${data.lobby_type}&date=${data.date}`
		);
	};
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'players',
	});
	return (
		<div className='flex w-full md:w-1/2 flex-wrap md:flex-nowrap gap-4'>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='flex flex-col items-center gap-4 w-full'
			>
				<Select label='Lobby Type' {...register('lobby_type')} className='w-48'>
					<SelectItem key={7} value='7'>
						Ranked
					</SelectItem>
					<SelectItem key={1} value='1'>
						Practice
					</SelectItem>
				</Select>
				<Slider
					label='How many days in the past?'
					step={1}
					maxValue={1000}
					minValue={1}
					defaultValue={30}
					className=' w-full md:w-1/2 text-foreground '
					color='foreground'
					{...register('date')}
					onChange={(value) => {}}
				/>
				<button
					className='bg-[#252525] p-4 rounded-xl text-foreground'
					onClick={() => append({ id: '', role: '' })}
					type='button'
				>
					Add new
				</button>
				<div className='w-full flex flex-col gap-6'>
					{fields.map((field, index) => (
						<div
							key={field.id}
							className='flex flex-row gap-4 w-full justify-center'
						>
							<div className='w-full flex flex-col gap-2'>
								<Input
									{...register(`players.${index}.id` as const)}
									placeholder='Account ID'
								/>
								{errors.players?.[index]?.id && (
									<span className='text-foreground font-extrabold text-lg'>
										{errors.players[index]?.id?.message}
									</span>
								)}
							</div>
							<div className='flex flex-col gap-2'>
								<Select
									{...register(`players.${index}.role` as const)}
									className='w-24 md:w-48'
									label='Role'
								>
									{Object.entries(Role).map(([key, value]) => (
										<SelectItem key={key} value={key}>
											{value}
										</SelectItem>
									))}
								</Select>
								{errors.players?.[index]?.id && (
									<span className='text-foreground font-extrabold text-lg'>
										{errors.players[index]?.role?.message}
									</span>
								)}
							</div>

							{fields.length > 1 ? (
								<>
									{!!index ? (
										<button
											className='bg-[#252525] p-4 rounded-xl text-foreground w-1/6 h-[56px]'
											onClick={() => remove(index)}
											type='button'
										>
											X
										</button>
									) : (
										<div className='w-1/6 p-4'></div>
									)}
								</>
							) : null}
						</div>
					))}
				</div>
				<Button
					size='md'
					type='submit'
					className='bg-[#252525]'
					disabled={isSubmitting}
				>
					Search
				</Button>
			</form>
		</div>
	);
};

export default SearchFrom;
