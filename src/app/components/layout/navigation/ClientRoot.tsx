"use client";
import { useState, useEffect, useMemo } from "react";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { getSupabaseBrowser } from "@/utils/api/supabase";
import {
	attachScrollColor,
	finalColorStr,
	initialColorStr
} from "@/utils/helpers/appearance/scrollColorBG";
// import { NAV_ITEMS } from "./DesktopMenu";
// import MobileMenu from "./MobileNav";

export default function ClientRoot({
	children
}: {
	children: React.ReactNode;
}) {
	// const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

	const supabase = useMemo(() => {
		if (typeof window === "undefined") return null;
		return getSupabaseBrowser();
	}, []);

	if (!supabase)
		return <main className='relative w-screen flex-1'>{children}</main>;

	return (
		<div
			style={{
				backgroundColor: bgColor,
				transition: "background-color 0 ease-in-out"
			}}
			className='flex relative flex-col h-full w-full text-white overflow-x-hidden sticky-top-0!'>
			<SessionContextProvider supabaseClient={supabase}>
				<main className='h-full w-screen relative'>{children}</main>
			</SessionContextProvider>
		</div>
	);
}
