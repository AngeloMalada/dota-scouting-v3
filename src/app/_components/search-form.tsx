'use client';
import { Input, Button, Slider } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { Select, SelectItem } from '@nextui-org/react';
import { Role } from '@/utils/consts';
type Inputs = {
	accountIDs: { value: string }[];
	roles: { value: string }[];
	lobby_type: string;
	date: number;
};

const SearchFrom: React.FC = () => {
	const [numberOfFields, setNumberOfFields] = useState<number>(1);
	const router = useRouter();
	const {
		control,
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<Inputs>();
	const onSubmit: SubmitHandler<Inputs> = (data) => {
		const ids = concatIdsWithRoles(data.accountIDs as [], data.roles as []);
		router.push(
			`/scout/?accountIDs=${ids}&lobby_type=${data.lobby_type}&date=${data.date}`
		);
	};
	function concatIdsWithRoles(
		ids: { value: string }[],
		roles: { value: string }[]
	) {
		return ids
			.map((id, index) => {
				if (id.value !== '') {
					return `${id.value}-${roles[index].value}`;
				}
				return '';
			})
			.filter((value) => value !== '')
			.join(',');
	}
	const { append } = useFieldArray<Inputs>({
		control,
		name: 'accountIDs',
	});
	const { fields: rolesFields, append: rolesAppend } = useFieldArray({
		control,
		name: 'roles',
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
					onClick={() => setNumberOfFields((prev) => prev + 1)}
					type='button'
				>
					Add new
				</button>
				<div className='w-full flex flex-col gap-2'>
					{Array.from({ length: numberOfFields }, (_, index) => (
						<div key={index} className='flex flex-row gap-2 w-full'>
							<Input
								key={index}
								{...register(`accountIDs.${index}.value`)}
								placeholder='Account ID'
							/>
							<Select
								key={index}
								{...register(`roles.${index}.value`)}
								className='w-48'
								label='Role'
							>
								{Object.entries(Role).map(([key, value]) => (
									<SelectItem key={key} value={key}>
										{value}
									</SelectItem>
								))}
							</Select>
						</div>
					))}
				</div>
				<Button size='md' type='submit' className='bg-[#252525]'>
					Search
				</Button>
			</form>
		</div>
	);
};

export default SearchFrom;
