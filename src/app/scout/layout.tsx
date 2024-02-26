import React from 'react';

type Props = {};

function layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <div className='dark text-foreground bg-background'>{children}</div>;
}

export default layout;
