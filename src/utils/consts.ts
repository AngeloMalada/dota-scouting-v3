export const flex = 0.25;
export const meta = true;
export const weights = {
	1: [0.85, 0.1, 0.05, 0.0, 0.0],
	2: [0.2, 0.6, 0.2, 0.0, 0.0],
	3: [0.1, 0.1, 0.7, 0.1, 0.0],
	4: [0.0, 0.1, 0.0, 0.5, 0.4],
	5: [0.0, 0.0, 0.0, 0.4, 0.6],
};

export const Role: { [key: number]: string } = {
	1: 'Carry',
	2: 'Mid',
	3: 'Offlane',
	4: 'Support',
	5: 'Hard Support',
} as const;
