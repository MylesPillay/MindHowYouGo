"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars, FaXing } from "react-icons/fa";

interface MobileBurgerMenuProps {
	setProjectsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
	mobileMenuOpen: boolean;
	setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const MobileBurgerMenu = ({
	setProjectsMenuOpen,
	mobileMenuOpen,
	setMobileMenuOpen
}: MobileBurgerMenuProps) => {
	const pathname = usePathname();
	return (
		<div className='md:hidden fixed top-8 right-4 z-50'>
			<button
				onClick={() => {
					setMobileMenuOpen(!mobileMenuOpen);
					setProjectsMenuOpen(false);
				}}
				className='flex flex-col items-center justify-center text-emerald-200 p-2 rounded-md'>
				{mobileMenuOpen ? (
					<FaXing className='z-50' size={30} />
				) : (
					<FaBars size={30} />
				)}
			</button>
			{mobileMenuOpen && (
				<div className='md:hidden fixed top-0 right-0  p-8 h-auto w-[50%]  bg-deepBlueBg z-40 border-emerald-200 border-l border-b'>
					<div className='flex flex-col items-start p-2 h-[10%]'>
						{[
							{
								href: "/contact",
								label: "Get in Touch"
							},
							{
								href: "/personal_bio",
								label: "Bio"
							},
							{
								href: "/",
								label: "Home"
							}
						]
							.filter((item) => item.href !== pathname)
							.map((item) => (
								<Link
									key={item.href}
									href={item.href}
									className='text-orangeflame text-xl text-left font-semibold my-4'
									onClick={() => setMobileMenuOpen(false)}>
									{item.label}
								</Link>
							))}
					</div>
				</div>
			)}
		</div>
	);
};

export default MobileBurgerMenu;
