"use client";
import React, {
	useEffect,
	useMemo,
	useRef,
	useState,
	useCallback
} from "react";
import Image from "next/image";
import { LoadingBlock } from "../../layout/loading/LoadingBlock";
import dynamic from "next/dynamic";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

type HeroData = {
	company_name: string | null;
	intro_message: string | null;
	cta_message: string | null;
	cta_button_text: string | null;
};

function fetchWithTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
	return new Promise<T>((resolve, reject) => {
		const timer = setTimeout(
			() => reject(new Error("Request timed out")),
			ms
		);
		promise
			.then((res) => {
				clearTimeout(timer);
				resolve(res);
			})
			.catch((err) => {
				clearTimeout(timer);
				reject(err);
			});
	});
}

const MobileHeroSection: React.FC = () => {
	const [animateGlow, setAnimateGlow] = useState(true);
	const [initialHero, setInitialHero] = useState<HeroData | null>(null);
	const [loading, setLoading] = useState(true);
	const supabase = useSupabaseClient();

	// staged animation flags (one-time)
	const [frameVisible, setFrameVisible] = useState(false);
	const [logoVisible, setLogoVisible] = useState(false);
	const [subtitleVisible, setSubtitleVisible] = useState(false);
	const [ctaTextVisible, setCtaTextVisible] = useState(false);
	const [ctaBtnVisible, setCtaBtnVisible] = useState(false);

	// StrictMode safety
	const startedRef = useRef(false);
	const timeoutsRef = useRef<number[]>([]);

	// Refs
	const triggerWrapRef = useRef<HTMLDivElement | null>(null);

	// Respect reduced motion
	useEffect(() => {
		if (typeof window !== "undefined") {
			const m = window.matchMedia("(prefers-reduced-motion: reduce)");
			if (m.matches) setAnimateGlow(false);
		}
	}, []);

	// Fetch hero data
	useEffect(() => {
		let didCancel = false;

		const fetchHero = async (retry = false) => {
			let didRetry = false;
			try {
				const result = await fetchWithTimeout(
					Promise.resolve(
						supabase.from("content_hero_section").select("*")
					),
					7000
				);
				const { data, error } = result as { data: any; error: any };
				if (didCancel) return;
				if (error) throw error;
				setInitialHero((data?.[0] as HeroData) ?? null);
			} catch (err) {
				console.error("Hero fetch error:", err);
				if (!retry) {
					didRetry = true;
					setTimeout(() => fetchHero(true), 1000);
				}
				setInitialHero(null);
			} finally {
				if (!didRetry) setLoading(false);
			}
		};

		const t = setTimeout(fetchHero, 200);
		return () => {
			didCancel = true;
			clearTimeout(t);
		};
	}, []);

	// Split company name if you decide to use it later
	const companyTitle = useMemo(
		() =>
			initialHero?.company_name
				? initialHero.company_name.split(" ")
				: [],
		[initialHero?.company_name]
	);

	// Trigger animations when the decorative/brand block hits the central band
	useEffect(() => {
		if (!initialHero || startedRef.current) return;

		const prefersReduced =
			typeof window !== "undefined" &&
			window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		const el = triggerWrapRef.current;
		if (!el) return;

		const kickOff = () => {
			if (startedRef.current) return;
			startedRef.current = true;

			if (prefersReduced) {
				setFrameVisible(true);
				setLogoVisible(true);
				setSubtitleVisible(true);
				setCtaTextVisible(true);
				setCtaBtnVisible(true);
				return;
			}

			// Staggered sequence (tweak timings to taste)
			setFrameVisible(true);
			timeoutsRef.current.push(
				window.setTimeout(() => setLogoVisible(true), 120)
			);
			timeoutsRef.current.push(
				window.setTimeout(() => setSubtitleVisible(true), 240)
			);
			timeoutsRef.current.push(
				window.setTimeout(() => setCtaTextVisible(true), 240)
			);
			timeoutsRef.current.push(
				window.setTimeout(() => setCtaBtnVisible(true), 240)
			);
		};

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting && !startedRef.current) {
						kickOff();
						observer.disconnect();
						break;
					}
				}
			},
			{
				root: null,
				rootMargin: "-50% 0px -50% 0px", // central band
				threshold: 0
			}
		);

		observer.observe(el);

		return () => {
			observer.disconnect();
			// clear pending timeouts only on unmount
			timeoutsRef.current.forEach((t) => clearTimeout(t));
			timeoutsRef.current = [];
		};
	}, [initialHero]);

	if (loading) return <LoadingBlock />;

	return (
		<section
			className='relative flex min-h-[100dvh] w-full flex-col items-center justify-evenly py-20 px-5 bg-background'
			aria-labelledby='hero-title'
			aria-describedby='hero-subtitle'>
			{/* Decorative frame + logo (observer target wrapper) */}
			<div
				className='relative w-full flex justify-center mt-6'
				aria-hidden='true'
				ref={triggerWrapRef}>
				<div className='relative'>
					{/* Framed gradient */}
					<div
						className={[
							"mx-auto h-[400px] w-80 rounded-t-[28rem] rounded-b-none border-4 border-primary-secondary/60 p-1 overflow-hidden",
							"transform transition-all duration-700 ease-out will-change-transform",
							frameVisible
								? "opacity-100 translate-y-0 scale-100"
								: "opacity-0 translate-y-4 scale-[0.98]"
						].join(" ")}>
						<div className='h-full w-full rounded-t-[27rem] rounded-b-none border-4 border-primary-secondary/30 overflow-hidden'>
							<div
								className={[
									"h-full w-full bg-gradient-to-r from-teal-200 to-yellow-200",
									animateGlow
										? "opacity-50 animate-pulse"
										: "opacity-100"
								].join(" ")}
							/>
						</div>
					</div>

					{/* Brand mark */}
					<div
						className={[
							"pointer-events-none -mt-[400px] ml-16 relative",
							"transform transition-all duration-700 ease-out will-change-transform",
							logoVisible
								? "opacity-100 translate-y-0 scale-100"
								: "opacity-0 translate-y-3 scale-[0.98]"
						].join(" ")}>
						<Image
							src='https://ngtfjhkkqhatjugocvhh.supabase.co/storage/v1/object/public/images/companyLogoOptimized.png'
							alt='Company logo'
							width={420}
							height={460}
							priority
						/>
					</div>
				</div>
			</div>

			{/* Copy / subtitle */}
			<div className='w-full max-w-sm text-center h-auto my-8'>
				<p
					id='hero-subtitle'
					className={[
						"text-2xl text-primary-secondary/90 text-pretty",
						"transform transition-all duration-700 ease-out will-change-transform",
						subtitleVisible
							? "opacity-100 translate-y-0"
							: "opacity-0 translate-y-3"
					].join(" ")}>
					{initialHero?.intro_message || ""}
				</p>
			</div>

			{/* CTA */}
			<div className='w-full max-w-sm h-auto mt-6'>
				{initialHero?.cta_message ? (
					<p
						className={[
							"mb-2 text-xl font-light text-primary text-center",
							"transform transition-all duration-700 ease-out will-change-transform",
							ctaTextVisible
								? "opacity-100 translate-y-0"
								: "opacity-0 translate-y-2"
						].join(" ")}>
						{initialHero.cta_message}
					</p>
				) : null}

				<button
					type='button'
					onClick={() => {
						document.getElementById("about-me")?.scrollIntoView({
							behavior: "smooth",
							block: "start"
						});
					}}
					className={[
						"w-full rounded-full px-6 py-4 my-4 text-base font-medium",
						"text-white shadow-md transition-all duration-300",
						"bg-gradient-to-r from-primary/70 to-primary-secondary",
						"border-2 border-yellow-400",
						// reveal + interactive motion
						"transform will-change-transform",
						ctaBtnVisible
							? "opacity-100 translate-y-0 scale-100"
							: "opacity-0 translate-y-2 scale-[0.98]",
						"hover:brightness-110 hover:shadow-lg active:scale-[0.98]"
					].join(" ")}
					aria-label='Scroll to About Me section'>
					{initialHero?.cta_button_text || "Take Action"}
				</button>

				{/* Small helper link for keyboard users */}
				<div className='sr-only' aria-live='polite'>
					Activating the button scrolls to the About Me section.
				</div>
			</div>
		</section>
	);
};

// Export with SSR disabled (mirrors your baseline to avoid hydration quirks)
export default dynamic(() => Promise.resolve(MobileHeroSection), {
	ssr: false
});
export { MobileHeroSection };
