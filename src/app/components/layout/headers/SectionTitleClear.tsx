"use client";
import React from "react";
interface SectionTitleClearProps {
	title: string;
	variant?: "light" | "dark";
	inset?: boolean;
	className?: string;
	animated?: boolean;
}

const SectionTitleClear: React.FC<SectionTitleClearProps> = ({
	title,
	variant = "light",
	inset = false
}) => {
	return (
		<div
			className={`w-[120%] h-18 flex justify-start align-middle items-center ${
				variant === "light"
					? "bg-opacity-65 bg-gradient-to-r from-primary/65 to-yellow-100/20"
					: "bg-primary-secondary bg-opacity-65"
			}`}>
			<div className='my-1 w-full h-auto flex flex-grow'>
				<h3
					style={{
						letterSpacing: 1,
						fontSize: inset ? undefined : "2.6rem"
					}}>
					<span
						className={`text-white font-light ${
							inset ? "" : "ml-[12vw]"
						}`}>
						{title}
					</span>
				</h3>
			</div>
		</div>
	);
};

export default SectionTitleClear;
