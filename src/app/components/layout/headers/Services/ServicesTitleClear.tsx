"use client";
import React from "react";
interface SectionTitleClearProps {
	title: string;
	variant?: "light" | "dark";
	inset?: boolean;
	className?: string;
	animated?: boolean;
}

const ServicesTitleClear: React.FC<SectionTitleClearProps> = ({
	title,
	variant = "light",
	inset = false
}) => {
	return (
		<div className={`w-full h-20 my-10 flex pb-12 `}>
			<div className='my-1 w-full h-auto flex text-center mx-auto justify-center pt-1 text-nowrap'>
				<h3
					style={{
						letterSpacing: 1,
						fontSize: inset ? undefined : "3rem"
					}}>
					<span className={`text-primary-secondary font-light`}>
						{title}
					</span>
				</h3>
			</div>
		</div>
	);
};

export default ServicesTitleClear;
