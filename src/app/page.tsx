import { BackgroundGradientAnimation } from './_components/background-gradient-animation';
import SearchFrom from './_components/search-form';
import { TypewriterEffectSmooth } from './_components/typewriter';
export default async function Home() {
	return (
		<main className='min-h-[100vh] relative overflow-clip flex flex-col items-center justify-center p-4 md:p-24 z-0'>
			<div className='fixed top-0'>
				<BackgroundGradientAnimation />
			</div>
			<div className=' z-50 inset-0 w-full  flex flex-col items-center justify-center overflow-hidden rounded-md'>
				<TypewriterEffectSmooth
					words={[
						{ text: 'DOTA' },
						{ text: '2' },
						{ text: 'SCOUTING' },
						{ text: 'TOOL' },
					]}
					className='select-none'
				/>
				<div className='w-[40rem] h-40 relative'>
					<div className='absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm' />
					<div className='absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4' />
					<div className='absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm' />
					<div className='absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4' />
				</div>
				<SearchFrom />
			</div>
		</main>
	);
}
