// "use client";
// import * as React from "react";
// import Link from "next/link";
// import { FaBars, FaTimes } from "react-icons/fa";
// import { NavItem } from "@/utils/types/types";

// type Props = {
// 	isOpen: boolean;
// 	setOpen: (open: boolean) => void;
// 	items: NavItem[];
// };

// function MobileMenu({ isOpen, setOpen, items }: Props) {
// 	return (
// 		<div className='sm:hidden fixed pt-2 justify-end items-end z-50 border-b-[1.5px] border-primary bg-primary-foreground bg-opacity-60 w-full'>
// 			<button
// 				onClick={() => setOpen(!isOpen)}
// 				className='flex flex-col self-end items-center ml-[90%] p-2 mb-1 rounded-md text-white hover:text-opacity-60 transition-colors'
// 				aria-expanded={isOpen}
// 				aria-controls='mobile-nav-panel'
// 				aria-label='Open menu'>
// 				{isOpen ? (
// 					<FaTimes className='z-50' size={30} />
// 				) : (
// 					<FaBars size={30} />
// 				)}
// 			</button>

// 			{isOpen && (
// 				<div
// 					id='mobile-nav-panel'
// 					className='md:hidden fixed top-0 right-0 p-8 h-auto w-[50%] z-40 border-l border-b bg-white bg-opacity-95 backdrop-blur-sm'>
// 					<nav
// 						className='flex flex-col items-start p-2 h-[10%]'
// 						aria-label='Mobile'>
// 						{items.map((item) => (
// 							<Link
// 								key={item.href}
// 								href={item.href}
// 								className='text-xl text-left font-semibold my-4 hover:text-gray-600 transition-colors'
// 								onClick={() => setOpen(false)}>
// 								{item.label}
// 							</Link>
// 						))}
// 					</nav>
// 				</div>
// 			)}
// 		</div>
// 	);
// }
