"use client";
import * as React from "react";
import Lottie from "lottie-react";
import Image from "next/image";
import Logo from "./ClickableLogo";
import { NavItem } from "@/utils/types/types";
import {
	attachWalkerAnimation,
	EASE,
	WALK_DURATION,
	WALKER_END_EXTRA,
	WALKER_START_OFFSET
} from "../../../../utils/helpers/appearance/walkerAnimation";

export const NAV_ITEMS: NavItem[] = [
	{ href: "/", label: "Home" },
	{ href: "/services", label: "Services" },
	{ href: "/contact", label: "Contact" }
	// { href: "/personal_bio", label: "Blog" }
];

type Props = {
	items: NavItem[];
	walkingData: object;
	badgeImageSrc: string;
	className?: string;
};

export default function DesktopNav({
	items,
	walkingData,
	badgeImageSrc,
	className = ""
}: Props) {
	const walkerRef = React.useRef<HTMLDivElement | null>(null);
	const trackRef = React.useRef<HTMLDivElement | null>(null);

	React.useEffect(() => {
		return attachWalkerAnimation({
			walkerEl: walkerRef.current!,
			trackEl: trackRef.current!,
			duration: WALK_DURATION,
			startOffset: WALKER_START_OFFSET,
			endExtra: WALKER_END_EXTRA,
			easing: EASE.linear,
			pauseWhenHidden: true,
			respectReducedMotion: true
		});
	}, []);

	return (
		<nav
			className={[
				"hidden relative items-center w-[120%] justify-between space-x-6 !sm:sticky-top-10 sm:flex",
				"pr-[20vw] flex-row h-[80px]",
				className
			].join(" ")}
			role='navigation'
			aria-label='Primary'>
			<div
				ref={trackRef}
				className='relative overflow-hidden flex bg-gradient-to-r from-primary to-yellow-100 justify-between items-center flex-row w-[120%] pr-8'>
				<div
					ref={walkerRef}
					className='absolute bottom-[5px] left-0 -ml-28 w-[90px] h-[80px] overflow-hidden pointer-events-none z-0'
					style={{ transform: "translateX(-120px)" }}
					aria-hidden>
					<Lottie animationData={walkingData} loop autoplay />
				</div>
				<Logo items={items} className='z-50' />
				<Image
					className='flex justify-end place-self-end bg-white/20 p-1 rounded-md mb-1'
					src={badgeImageSrc}
					alt='BABCP accreditation badge'
					width={70}
					height={50}
				/>
			</div>
		</nav>
	);
}
