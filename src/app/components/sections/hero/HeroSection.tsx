"use client";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { supabaseBrowser } from "@/utils/api/supabase";
import { LoadingBlock } from "../../layout/loading/LoadingBlock";

type HeroData = {
	company_name: string | null;
	intro_message: string | null;
	cta_message: string | null;
	cta_button_text: string | null;
};

const HeroSection = () => {
	const [animateGlow, _setAnimateGlow] = useState(true);
	const [initialHero, setInitialHero] = useState<HeroData | null>(null);
	const [loading, setLoading] = useState(true);
	const [fadeIn, setFadeIn] = useState(false);

	React.useEffect(() => {
		if (!loading) {
			// Trigger fade-in after loading is complete
			const timeout = setTimeout(() => setFadeIn(true), 50);
			return () => clearTimeout(timeout);
		}
	}, [loading]);
	useEffect(() => {
		const fetchHero = async () => {
			const supabase = supabaseBrowser;
			const { data, error } = await supabase
				.from("content_hero_section")
				.select("*");

			if (error) {
				console.error("Hero fetch error:", error);
			}
			setInitialHero((data?.[0] as HeroData) ?? null);
			setLoading(false);
		};
		const timeout = setTimeout(() => {
			fetchHero();
		}, 300);

		return () => clearTimeout(timeout);
	}, []);

	const companyTitle = useMemo(
		() =>
			initialHero?.company_name
				? initialHero.company_name.split(" ")
				: [],
		[initialHero?.company_name]
	);

	if (loading) {
		return <LoadingBlock />;
	}

	return (
		<>
			<section
				className={`flex flex-col align-middle items-center justify-around w-full h-auto overflow-visible pb-10 transition-opacity duration-1000 ${
					fadeIn ? "opacity-100" : "opacity-0"
				}`}>
				<div
					className='flex flex-col lg:flex-row w-full h-auto'
					aria-labelledby='hero-title'
					aria-describedby='hero-subtitle'>
					{/* Decorative frame/glow — hidden from AT */}
					<div
						className='flex justify-end w-[40vw] h-auto px-10 xl:mt-[8vw] lg:mt-[6vw]'
						aria-hidden='true'>
						<div className='relative w-auto h-auto flex flex-grow overflow-hidden border-4 border-primary-secondary object-cover border-opacity-60 rounded-t-full rounded-b-0 max-h-[550px] max-w-[460px] xl:min-h-[550px] xl:min-w-[460px] lg:min-h-[460px] lg:min-w-[360px] p-1'>
							<div className='overflow-hidden border-4 w-auto h-auto flex flex-grow border-primary-secondary border-opacity-30 rounded-t-full rounded-b-0 max-h-[535px] max-w-[445px] xl:min-h-[535px] xl:min-w-[445px] lg:min-h-[445px] lg:min-w-[355px]'>
								<div
									className={`relative max-h-[546px] w-auto h-auto flex flex-grow max-w-[435px] bg-gradient-to-r from-teal-200 to-yellow-200 transition-opacity duration-10000 ease-in-out ${
										animateGlow
											? "opacity-40 animate-pulse-slow"
											: "opacity-100"
									}`}></div>
							</div>
						</div>
						<div className='absolute justify-start pointer-events-none -mr-24 -mt-5'>
							<Image
								src='/assets/images/companyLogo.png'
								alt='Company logo'
								width={570}
								height={690}
							/>
						</div>
					</div>

					{/* Copy & CTA */}
					<div className='flex flex-col w-auto mx-auto justify-around py-48'>
						<h1
							id='hero-title'
							className='h-18 justify-center w-full pr-44 p-2
						text-center text-primary
						xl:text-8xl lg:text-6xl md:text-4xl text-3xl'>
							<span className='mr-2 font-light'>
								{companyTitle[0] ?? ""}
							</span>
							<span className='mr-2 font-light text-primary-secondary text-opacity-80'>
								{(companyTitle[1] ?? "").toLowerCase()}
							</span>
							<span className='mr-2.5 font-light text-primary-secondary text-opacity-80'>
								{(companyTitle[2] ?? "").toLowerCase()}
							</span>
							<span className='font-medium text-primary-foreground'>
								{companyTitle[3] ?? ""}
							</span>
						</h1>

						<h2
							id='hero-subtitle'
							className='relative text-primary-secondary font-light text-center w-full pr-40
								xl:text-4xl lg:text-3xl md:text-2xl text-3xl'>
							{initialHero?.intro_message || ""}
						</h2>
					</div>
				</div>
				{/* CTA Row */}
				<div className='mt-20 flex flex-col md:flex-row gap-4 h-full items-center text-left'>
					<h3 className='inline-block p-2 text-4xl font-light text-center text-primary'>
						{initialHero?.cta_message || ""}
					</h3>

					<button
						type='button'
						onClick={() => {
							document
								.getElementById("about-me")
								?.scrollIntoView({
									behavior: "smooth",
									block: "start"
								});
						}}
						className='px-8 py-4 ml-1 text-2xl font-medium text-white rounded-full bg-gradient-to-r from-primary/60 to-primary-secondary transition-all duration-500 ease-in-out shadow-md hover:shadow-lg hover:brightness-110 hover:scale-105 hover:to-primary-foreground hover:from-primary border-2 border-opacity-100 border-yellow-400'
						aria-label='Scroll to About Me section'>
						{initialHero?.cta_button_text || "Take Action"}
					</button>
				</div>
			</section>
		</>
	);
};

export { HeroSection };
