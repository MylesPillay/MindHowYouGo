"use client";
import { useState, useEffect } from "react";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { getSupabaseServer } from "@/utils/api/supabase";
import {
	attachScrollColor,
	finalColorStr,
	initialColorStr
} from "@/utils/helpers/appearance/scrollColorBG";
import { NAV_ITEMS } from "./DesktopMenu";
import MobileMenu from "./MobileNav";

export default function ClientRoot({
	children
}: {
	children: React.ReactNode;
}) {
	const supabase = getSupabaseServer();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [bgColor, setBgColor] = useState(initialColorStr);
	useEffect(() => {
		return attachScrollColor({
			setBgColor,
			initial: initialColorStr,
			final: finalColorStr,
			maxT: 1,
			space: "oklch"
		});
	}, [setBgColor]);

	return (
		<div
			style={{
				backgroundColor: bgColor,
				transition: "background-color 0 ease-in-out"
			}}
			className='flex relative flex-col h-full w-full text-white overflow-x-hidden sticky-top-0!'>
			<SessionContextProvider supabaseClient={supabase}>
				{/* Nav */}
				{/* <DesktopNav
						items={NAV_ITEMS}
						walkingData={walkingData}
						badgeImageSrc='/assets/images/BABCP-logo.webp'
						className='border-yellow-400'
					/>
					<div className='border-t-2 border-primary-foreground mt-[1px] w-[120%]' />
					*/}
				<MobileMenu
					isOpen={mobileMenuOpen}
					setOpen={setMobileMenuOpen}
					items={NAV_ITEMS}
				/>
				{/* Main */}
				<main className='h-full w-screen relative'>{children}</main>
			</SessionContextProvider>
		</div>
	);
}
