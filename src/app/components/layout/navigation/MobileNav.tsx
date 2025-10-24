"use client";
import * as React from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavItem } from "@/utils/types/types";
import Logo from "./ClickableLogo";

type Props = {
	items: NavItem[];
};

export function MobileMenu({ items }: Props) {
	const [isOpen, setIsOpen] = React.useState<boolean>(false);
	return (
		<div className='sm:hidden fixed justify-between flex flex-row z-50 border-b-[1.5px] border-primary bg-primary-foreground bg-opacity-60 w-full'>
			<div className='overflow-hidden flex bg-gradient-to-r from-primary to-primary/5	justify-start items-center flex-row z-50 h-auto py-2 w-full'>
				<Link
					href='/'
					className='font-medium text-white-foreground hover:text-white text-center w-auto mx-auto pb-2 pl-12'
					style={{ letterSpacing: -1, fontSize: "2rem" }}
					aria-label='Go to homepage'>
					<span className='text-white'>Mind</span>
					<span
						className='mx-1 text-white text-opacity-70'
						style={{ letterSpacing: -1.5, fontSize: "1.8rem" }}>
						How You
					</span>
					<span
						className='mr-4'
						style={{ letterSpacing: -1.5, fontSize: "2rem" }}>
						Go
					</span>
				</Link>
			</div>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className='flex flex-col self-center mr-4 items-center p-2 mb-1 rounded-md text-white hover:text-opacity-60 transition-colors'
				aria-expanded={isOpen}
				aria-controls='mobile-nav-panel'
				aria-label='Open menu'>
				{isOpen ? (
					<FaTimes className='z-50' size={30} />
				) : (
					<FaBars size={30} />
				)}
			</button>

			{isOpen && (
				<div
					id='mobile-nav-panel'
					className='md:hidden fixed top-16 right-0 p-2 h-auto w-full z-40 border-l border-b bg-gradient-to-r from-primary/65 to-yellow-100/65 backdrop-blur-sm'>
					<nav
						className='flex flex-col items-end p-2 pl-0 h-auto w-full pr-5'
						aria-label='Mobile'>
						{items.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className='text-xl text-left font-semibold my-2 hover:text-primary/75 text-primary-secondary transition-colors'
								onClick={() => setIsOpen(false)}>
								{item.label}
							</Link>
						))}
					</nav>
				</div>
			)}
		</div>
	);
}
