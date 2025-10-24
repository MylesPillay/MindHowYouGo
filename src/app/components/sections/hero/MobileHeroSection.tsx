"use client";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { getSupabaseBrowser } from "@/utils/api/supabase";
import { LoadingBlock } from "../../layout/loading/LoadingBlock";

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
	const [fadeIn, setFadeIn] = useState(false);

	// Respect reduced motion
	useEffect(() => {
		if (typeof window !== "undefined") {
			const m = window.matchMedia("(prefers-reduced-motion: reduce)");
			if (m.matches) setAnimateGlow(false);
		}
	}, []);

	useEffect(() => {
		if (!loading) {
			const t = setTimeout(() => setFadeIn(true), 50);
			return () => clearTimeout(t);
		}
	}, [loading]);

	useEffect(() => {
		let didCancel = false;

		const fetchHero = async (retry = false) => {
			let didRetry = false;
			try {
				const supabase = getSupabaseBrowser();
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

	const companyTitle = useMemo(
		() =>
			initialHero?.company_name
				? initialHero.company_name.split(" ")
				: [],
		[initialHero?.company_name]
	);

	if (loading) return <LoadingBlock />;

	return (
		<section
			className={[
				"relative flex min-h-[100dvh] w-full flex-col items-center justify-evenly py-20",
				"px-5",
				"bg-background",
				"transition-opacity duration-700",
				fadeIn ? "opacity-100" : "opacity-0"
			].join(" ")}
			aria-labelledby='hero-title'
			aria-describedby='hero-subtitle'>
			<div
				className='relative w-full flex justify-center mt-6'
				aria-hidden='true'>
				<div className='relative'>
					<div className='mx-auto h-[400px] w-80 rounded-t-[28rem] rounded-b-none border-4 border-primary-secondary/60 p-1 overflow-hidden'>
						<div className='h-full w-full rounded-t-[27rem] rounded-b-none border-4 border-primary-secondary/30 overflow-hidden'>
							<div
								className={[
									"h-full w-full",
									"bg-gradient-to-r from-teal-200 to-yellow-200",
									animateGlow
										? "opacity-50 animate-pulse"
										: "opacity-100"
								].join(" ")}
							/>
						</div>
					</div>
					<div className='pointer-events-none -mt-[400px] ml-16 relative'>
						<Image
							src='/assets/images/companyLogo.png'
							alt='Company logo'
							width={420}
							height={460}
							priority
						/>
					</div>
				</div>
			</div>

			{/* Copy */}
			<div className='w-full max-w-sm text-center h-auto my-8'>
				<p
					id='hero-subtitle'
					className='text-2xl text-primary-secondary/90 text-pretty'>
					{initialHero?.intro_message || ""}
				</p>
			</div>

			{/* CTA */}
			<div className='w-full max-w-sm h-auto mt-6'>
				{initialHero?.cta_message ? (
					<p className='mb-2 text-xl font-light text-primary text-center'>
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
						"hover:brightness-110 hover:shadow-lg active:scale-[0.98]",
						"border-2 border-yellow-400"
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

export { MobileHeroSection };
