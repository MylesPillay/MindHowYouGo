import React from "react";

export const LoadingBlock = (): JSX.Element => {
	return (
		<div className='flex h-[86vh] items-center justify-center w-full'>
			<div className='animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary'></div>
		</div>
	);
};
