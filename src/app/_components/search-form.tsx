'use client';
import { Input, Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
type Inputs = {
	accountIDs: string;
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
		router.push(`/scout/?accountIDs=${data.accountIDs}`);
	};
	return (
		<div className='flex w-48 flex-wrap md:flex-nowrap gap-4'>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='flex flex-col items-center gap-4'
			>
				<Input
					type='text'
					label='Enter account IDs'
					{...register('accountIDs')}
				/>
				<Button size='md' type='submit'>
					Search
				</Button>
			</form>
		</div>
	);
};

export default SearchFrom;
