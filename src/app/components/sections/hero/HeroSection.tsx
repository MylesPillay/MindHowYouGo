// "use client";
// import React, { useEffect, useMemo, useState } from "react";
// import Image from "next/image";
// import { getSupabaseBrowser } from "@/utils/api/supabase";
// import { LoadingBlock } from "../../layout/loading/LoadingBlock";

// type HeroData = {
// 	company_name: string | null;
// 	intro_message: string | null;
// 	cta_message: string | null;
// 	cta_button_text: string | null;
// };

// function fetchWithTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
// 	return new Promise<T>((resolve, reject) => {
// 		const timer = setTimeout(() => {
// 			reject(new Error("Request timed out"));
// 		}, ms);
// 		promise
// 			.then((res) => {
// 				clearTimeout(timer);
// 				resolve(res);
// 			})
// 			.catch((err) => {
// 				clearTimeout(timer);
// 				reject(err);
// 			});
// 	});
// }

// const HeroSection = () => {
// 	const [animateGlow, _setAnimateGlow] = useState(true);
// 	const [initialHero, setInitialHero] = useState<HeroData | null>(null);
// 	const [loading, setLoading] = useState(true);
// 	const [fadeIn, setFadeIn] = useState(false);

// 	React.useEffect(() => {
// 		if (!loading) {
// 			// Trigger fade-in after loading is complete
// 			const timeout = setTimeout(() => setFadeIn(true), 50);
// 			return () => clearTimeout(timeout);
// 		}
// 	}, [loading]);

// 	useEffect(() => {
// 		let didCancel = false;

// 		const fetchHero = async (retry = false) => {
// 			let didRetry = false;
// 			try {
// 				const supabase = getSupabaseBrowser();
// 				const result = await fetchWithTimeout(
// 					Promise.resolve(
// 						supabase.from("content_hero_section").select("*")
// 					),
// 					7000
// 				);
// 				const { data, error } = result as { data: any; error: any };
// 				if (didCancel) return;
// 				if (error) {
// 					throw error;
// 				}
// 				setInitialHero((data?.[0] as HeroData) ?? null);
// 			} catch (err) {
// 				console.error("Hero fetch error:", err);
// 				if (!retry) {
// 					didRetry = true;
// 					setTimeout(() => fetchHero(true), 1000);
// 				}
// 				setInitialHero(null);
// 			} finally {
// 				if (!didRetry) setLoading(false);
// 			}
// 		};

// 		const timeout = setTimeout(() => {
// 			fetchHero();
// 		}, 300);

// 		return () => {
// 			didCancel = true;
// 			clearTimeout(timeout);
// 		};
// 	}, []);

// 	const companyTitle = useMemo(
// 		() =>
// 			initialHero?.company_name
// 				? initialHero.company_name.split(" ")
// 				: [],
// 		[initialHero?.company_name]
// 	);

// 	if (loading) {
// 		return <LoadingBlock />;
// 	}

// 	return (
// 		<>
// 			<section
// 				className={`flex flex-col align-middle items-center justify-around w-full h-auto overflow-visible pb-10 transition-opacity duration-1000 ${
// 					fadeIn ? "opacity-100" : "opacity-0"
// 				}`}>
// 				<div
// 					className='flex flex-col md:flex-row w-full h-auto'
// 					aria-labelledby='hero-title'
// 					aria-describedby='hero-subtitle'>
// 					{/* Decorative frame/glow — hidden from AT */}
// 					<div
// 						className='flex justify-end md:w-[40vw] w-[60vw] h-auto px-10 xl:mt-[8vw] lg:mt-[6vw]'
// 						aria-hidden='true'>
// 						<div className='relative w-auto h-auto flex flex-grow overflow-hidden border-4 border-primary-secondary object-cover border-opacity-60 rounded-t-full rounded-b-0 max-h-[450px] max-w-[360px] xl:min-h-[450px] xl:min-w-[360px] lg:min-h-[360px] lg:min-w-[260px] p-1'>
// 							<div className='overflow-hidden border-4 w-auto h-auto flex flex-grow border-primary-secondary border-opacity-30 rounded-t-full rounded-b-0 max-h-[435px] max-w-[345px] xl:min-h-[435px] xl:min-w-[345px] lg:min-h-[345px] lg:min-w-[255px]'>
// 								<div
// 									className={`relative max-h-[446px] w-auto h-auto flex flex-grow max-w-[335px] bg-gradient-to-r from-teal-200 to-yellow-200 transition-opacity duration-10000 ease-in-out ${
// 										animateGlow
// 											? "opacity-40 animate-pulse-slow"
// 											: "opacity-100"
// 									}`}></div>
// 							</div>
// 						</div>
// 						<div className='absolute justify-start pointer-events-none -mr-24 -mt-5'>
// 							<Image
// 								src='/assets/images/companyLogo.png'
// 								alt='Company logo'
// 								width={450}
// 								height={570}
// 							/>
// 						</div>
// 					</div>

// 					<div className='flex flex-col w-auto mx-auto justify-around py-48'>
// 						<h1
// 							id='hero-title'
// 							className='h-18 justify-center w-full pr-44 p-2
// 						text-center text-primary
// 						xl:text-6xl lg:text-6xl md:text-3xl text-2xl'>
// 							<span className='mr-2 font-light'>
// 								{companyTitle[0] ?? ""}
// 							</span>
// 							<span className='mr-2 font-light text-primary-secondary text-opacity-80'>
// 								{(companyTitle[1] ?? "").toLowerCase()}
// 							</span>
// 							<span className='mr-2.5 font-light text-primary-secondary text-opacity-80'>
// 								{(companyTitle[2] ?? "").toLowerCase()}
// 							</span>
// 							<span className='font-medium text-primary-foreground'>
// 								{companyTitle[3] ?? ""}
// 							</span>
// 						</h1>

// 						<h2
// 							id='hero-subtitle'
// 							className='relative text-primary-secondary font-light text-center w-full pr-40
// 								xl:text-3xl lg:text-2xl md:text-xl text-2xl'>
// 							{initialHero?.intro_message || ""}
// 						</h2>
// 					</div>
// 				</div>
// 				{/* CTA Row */}
// 				<div className='mt-20 flex flex-col md:flex-row gap-4 h-full items-center text-left'>
// 					<h3 className='inline-block p-2 text-3xl font-light text-center text-primary'>
// 						{initialHero?.cta_message || ""}
// 					</h3>

// 					<button
// 						type='button'
// 						onClick={() => {
// 							document
// 								.getElementById("about-me")
// 								?.scrollIntoView({
// 									behavior: "smooth",
// 									block: "start"
// 								});
// 						}}
// 						className='px-8 py-4 ml-1 text-xl font-medium text-white rounded-full bg-gradient-to-r from-primary/60 to-primary-secondary transition-all duration-500 ease-in-out shadow-md hover:shadow-lg hover:brightness-110 hover:scale-105 hover:to-primary-foreground hover:from-primary border-2 border-opacity-100 border-yellow-400'
// 						aria-label='Scroll to About Me section'>
// 						{initialHero?.cta_button_text || "Take Action"}
// 					</button>
// 				</div>
// 			</section>
// 		</>
// 	);
// };

// export { HeroSection };

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

const HeroSection = () => {
	const [animateGlow] = useState(true);
	const [initialHero, setInitialHero] = useState<HeroData | null>(null);
	const [loading, setLoading] = useState(true);
	const [fadeIn, setFadeIn] = useState(false);

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

		const t = setTimeout(fetchHero, 300);
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
			className={`hidden sm:block w-full transition-opacity duration-1000 ${
				fadeIn ? "opacity-100" : "opacity-0"
			}`}>
			<div className='container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-20'>
				{/* Content grid */}
				<div
					className='md:grid md:grid-cols-2 md:gap-10 md:items-center'
					aria-labelledby='hero-title'
					aria-describedby='hero-subtitle'>
					{/* Left: Decorative frame / image */}
					<div className='flex justify-center md:justify-end'>
						<div
							className='relative w-full max-w-[320px] sm:max-w-[360px] md:max-w-[380px] lg:max-w-[420px] xl:max-w-[440px] aspect-[3/4] max-h-[460px] sm:max-h-[400px] md:max-h-[420px] lg:max-h-[450px] xl:max-h-[460px]'
							aria-hidden='true'>
							{/* Outer frame */}
							<div className='absolute inset-0 border-4 border-primary-secondary/60 rounded-t-full rounded-b-none p-1 overflow-hidden'>
								{/* Inner frame */}
								<div className='h-full w-full border-4 border-primary-secondary/30 rounded-t-full rounded-b-none overflow-hidden'>
									{/* Glow panel */}
									<div
										className={`h-full w-full bg-gradient-to-r from-teal-200 to-yellow-200 transition-opacity duration-[10000ms] ease-in-out ${
											animateGlow
												? "opacity-40 animate-pulse-slow"
												: "opacity-100"
										}`}
									/>
								</div>
							</div>

							{/* Logo overlay (scales to fill the parent and stays centered) */}
							<div className='absolute inset-0 pointer-events-none grid place-items-center'>
								<div className='relative w-[115%] h-[120%]'>
									<Image
										src='/assets/images/companyLogo.png'
										alt='Company logo'
										fill
										className='object-contain object-center md:translate-x-[8%] md:translate-y-[-0.5%]  lg:translate-x-[8%] lg:translate-y-[-0.5%] translate-x-[8%] translate-y-[-0.5%]'
										priority
										sizes='(min-width: 1280px) 460px, (min-width: 1024px) 420px, (min-width: 768px) 380px, 90vw'
									/>
								</div>
							</div>
						</div>
					</div>

					{/* Right: Text block */}
					<div className='flex flex-col items-center md:items-start text-center md:text-left'>
						<div className='w-full space-y-4 sm:space-y-6 md:space-y-8 py-10 sm:py-12 md:py-16 lg:py-20'>
							<h1
								id='hero-title'
								className='text-primary text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl leading-tight'>
								<span className='mr-2 font-light'>
									{companyTitle[0] ?? ""}
								</span>
								<span className='mr-2 font-light text-primary-secondary/80'>
									{(companyTitle[1] ?? "").toLowerCase()}
								</span>
								<span className='mr-2.5 font-light text-primary-secondary/80'>
									{(companyTitle[2] ?? "").toLowerCase()}
								</span>
								<span className='font-medium text-primary-foreground'>
									{companyTitle[3] ?? ""}
								</span>
							</h1>

							<h2
								id='hero-subtitle'
								className='text-primary-secondary font-light text-xl sm:text-2xl md:text-[1.375rem] lg:text-2xl xl:text-3xl max-w-[55ch] mx-auto md:mx-0'>
								{initialHero?.intro_message || ""}
							</h2>
						</div>
					</div>
				</div>

				{/* CTA Row */}
				<div className='mt-10 sm:mt-12 md:mt-16 flex flex-wrap gap-4 items-center justify-center md:justify-center my-16'>
					<h3 className='text-2xl sm:text-3xl font-light text-primary text-center'>
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
						className='
              px-6 sm:px-8 py-3 sm:py-4
              text-lg sm:text-xl font-medium text-white rounded-full
              bg-gradient-to-r from-primary/60 to-primary-secondary
              transition-all duration-500 ease-in-out
              shadow-md hover:shadow-lg hover:brightness-110 hover:scale-105
              hover:to-primary-foreground hover:from-primary
              border-2 border-yellow-400
            '
						aria-label='Scroll to About Me section'>
						{initialHero?.cta_button_text || "Take Action"}
					</button>
				</div>
			</div>
		</section>
	);
};

export { HeroSection };
