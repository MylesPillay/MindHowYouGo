import { NavItem } from "@/utils/types/types";
import Link from "next/link";
import * as React from "react";

type Props = {
	items: NavItem[];
	className?: string;
};

export default function Logo({ items, className = "" }: Props) {
	return (
		<div
			className={[
				"overflow-hidden flex bg-gradient-to-r from-primary to-primary/5",
				"justify-start items-center flex-row w-auto z-50 h-auto py-4 pr-8",
				className
			].join(" ")}>
			<Link
				href='/'
				className='font-medium text-white-foreground hover:text-white text-center w-auto ml-6 pb-2'
				style={{ letterSpacing: -1, fontSize: "2rem" }}
				aria-label='Go to homepage'>
				<span className='text-white'>Mind</span>
				<span
					className='mx-1 text-white text-opacity-70'
					style={{ letterSpacing: -1.5, fontSize: "1.5rem" }}>
					How You
				</span>
				<span
					className='mr-4'
					style={{ letterSpacing: -1.5, fontSize: "2rem" }}>
					Go
				</span>
			</Link>

			{/* Desktop Menu */}
			<nav
				aria-label='Primary'
				className='flex flex-grow justify-start flex-row'>
				{items.map((item) => (
					<Link
						key={item.href}
						href={item.href}
						className='md:text-lg text-md font-medium transition-colors'>
						<div className='p-4 hover:text-opacity-60 text-white font-semibold'>
							{item.label}
						</div>
					</Link>
				))}
			</nav>
		</div>
	);
}
