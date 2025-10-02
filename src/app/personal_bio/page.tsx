"use client";
import { useState } from "react";
import MobileBurgerMenu from "../components/layout/navigation/MobileBurgerMenuOld";
import "../global.css";

export default function Contact() {
	const [projectsMenuOpen, setProjectsMenuOpen] = useState(false);

	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<div className='h-screen w-full overflow-x-hidden overflow-y-auto m-none  pr-0  border-0 sm:border-l-[0.5px]  '>
			<div className='sticky top-0 flex flex-grow flex-row justify-start items-baseline align-bottom w-full my-0 sm:pl-8 sm:pr-8 pt-10 pb-4  bg-opacity-100 border-b sm:border-0 z-50'>
				<div className='flex flex-row flex-1 justify-between w-auto'>
					<h1 className='text-2xl font-medium text-left w-[10vw]  ml-4   sm:ml-0 justify-start h-auto '>
						About Me
					</h1>
					<MobileBurgerMenu
						setProjectsMenuOpen={setProjectsMenuOpen}
						mobileMenuOpen={mobileMenuOpen}
						setMobileMenuOpen={setMobileMenuOpen}
					/>
				</div>
			</div>
		</div>
	);
}
