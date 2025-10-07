"use client";
import * as React from "react";
import Lottie from "lottie-react";
import {
	attachWalkerAnimation,
	EASE,
	WALK_DURATION,
	WALKER_END_EXTRA,
	WALKER_START_OFFSET
} from "@/utils/helpers/appearance/walkerAnimation";
import walkingData from "../../../../../public/assets/animations/walking.json";

type AnimatedSectionTitleProps = {
	title: string;
	variant?: "light" | "dark";
	inset?: boolean;
	className?: string;
	animated?: boolean;
};

const AnimatedSectionTitle: React.FC<AnimatedSectionTitleProps> = ({
	title,
	variant = "light",
	inset = false,
	animated = true,
	className = ""
}) => {
	const walkerRef = React.useRef<HTMLDivElement | null>(null);
	const trackRef = React.useRef<HTMLDivElement | null>(null);

	React.useEffect(() => {
		if (!animated) return;
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
	}, [animated]);

	return (
		<div
			ref={trackRef}
			className={`
				relative w-[120%] h-18 overflow-hidden
				${
					variant === "light"
						? "bg-opacity-65 bg-gradient-to-r from-primary/65 to-yellow-100"
						: "bg-primary-secondary bg-opacity-65"
				}
			${className}`}>
			<div
				ref={walkerRef}
				className='absolute bottom-[5px] left-0 -ml-28 w-[90px] h-[80px] pointer-events-none z-0'
				aria-hidden>
				<Lottie animationData={walkingData} loop autoplay />
			</div>

			<h3
				className={[
					"relative z-10 font-light border-y-2 py-[2px] text-left justify-start border-white"
				].join(" ")}
				style={{
					letterSpacing: 1,
					fontSize: inset ? undefined : "2.6rem"
				}}>
				<span className={`text-white ${inset ? "" : "ml-[12vw]"}`}>
					{title}
				</span>
			</h3>
		</div>
	);
};

export default AnimatedSectionTitle;
