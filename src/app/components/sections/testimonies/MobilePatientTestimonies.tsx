"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import SectionTitleClear from "../../layout/headers/SectionTitleClear";
import { LoadingBlock } from "../../layout/loading/LoadingBlock";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

interface ContentDataTypeRow {
	testimony_name?: string;
	testimony_description?: string;
	id: number;
}
type Testimonial = { name?: string; text?: string; id: number };

// ~35% of a collapsed card peeking below for a slimmer stack
const PEEK_FRACTION = 0.35;

const MobilePatientTestimonials = ({ id }: { id: string }): JSX.Element => {
	const [content, setContent] = useState<Testimonial[]>([]);
	const [loading, setLoading] = useState(true);
	const supabase = useSupabaseClient();

	// which card is aligned/snap-focused
	const [activeIndex, setActiveIndex] = useState(0);
	// which card is expanded (defaults to active)
	const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

	const containerRef = useRef<HTMLDivElement | null>(null);
	const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

	const [containerH, setContainerH] = useState<number | null>(null);
	const GAP_PX = 24; // matches gap-6

	const prefersReduced =
		typeof window !== "undefined" &&
		window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	// Fetch data
	useEffect(() => {
		const fetchData = async () => {
			const { data, error } = await supabase
				.from("content_testimonials")
				.select("*");
			if (error) console.error("Testimonials fetch error:", error);

			const mapped: Testimonial[] = (data || [])
				.sort(
					(a: ContentDataTypeRow, b: ContentDataTypeRow) =>
						a.id - b.id
				)
				.map((item: ContentDataTypeRow) => ({
					name: item.testimony_name ?? undefined,
					text: item.testimony_description ?? undefined,
					id: item.id
				}));

			setContent(mapped);
			setLoading(false);
		};
		fetchData();
	}, []);

	// Measure collapsed height and set viewport to "one card + peek"
	useEffect(() => {
		if (!content.length) return;

		requestAnimationFrame(() => {
			const first = cardRefs.current[0];
			if (!first) return;

			// Force its copy area into a collapsed state to measure reliably
			const inner = first.querySelector(
				"[data-inner]"
			) as HTMLParagraphElement | null;
			let prevMax = "";
			if (inner) {
				prevMax = inner.style.maxHeight;
				inner.style.maxHeight = "5rem"; // ~Tailwind max-h-20
			}

			const rect = first.getBoundingClientRect();
			const baseH = Math.round(rect.height);

			if (inner) inner.style.maxHeight = prevMax;

			const peek = Math.round(baseH * PEEK_FRACTION);
			setContainerH(baseH + peek + GAP_PX);

			// initialize
			setActiveIndex(0);
			setExpandedIndex(0);
			containerRef.current?.scrollTo({ top: 0, behavior: "auto" });
		});
	}, [content.length]);

	// Track snap focus and auto-expand that card
	useEffect(() => {
		const el = containerRef.current;
		if (!el || !content.length) return;

		const onScroll = () => {
			const baseTop = el.getBoundingClientRect().top;
			let bestIdx = 0;
			let bestDist = Number.POSITIVE_INFINITY;

			cardRefs.current.forEach((card, idx) => {
				if (!card) return;
				const r = card.getBoundingClientRect();
				const dist = Math.abs(r.top - baseTop);
				if (dist < bestDist) {
					bestDist = dist;
					bestIdx = idx;
				}
			});

			if (bestIdx !== activeIndex) {
				setActiveIndex(bestIdx);
				setExpandedIndex(bestIdx);
			}
		};

		el.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll);
		onScroll();
		return () => {
			el.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
		};
	}, [content.length, activeIndex]);

	const scrollToIndex = useCallback(
		(idx: number) => {
			const el = containerRef.current;
			const target = cardRefs.current[idx];
			if (!el || !target) return;
			el.scrollTo({
				top: target.offsetTop,
				behavior: prefersReduced ? "auto" : "smooth"
			});
		},
		[prefersReduced]
	);

	const onToggle = useCallback(
		(idx: number) => {
			setExpandedIndex((cur) => (cur === idx ? null : idx));
			scrollToIndex(idx);
		},
		[scrollToIndex]
	);

	const onKey = useCallback(
		(e: React.KeyboardEvent<HTMLDivElement>, idx: number) => {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				onToggle(idx);
			}
		},
		[onToggle]
	);

	if (loading || !content.length) return <LoadingBlock />;

	return (
		<section
			id={id}
			className='flex flex-col items-center w-full pt-20 px-4'>
			<div className='w-full max-w-md -ml-20 mb-9'>
				<SectionTitleClear title='What People Say' mobileScreen />
			</div>
			<div
				ref={containerRef}
				className={[
					"relative w-[110%] pt-16 px-[7.5%] bg-zinc-100 rounded-xl h-full min-h-[420px] py-10 border-y-2 border-primary-secondary/20",
					"overflow-y-auto overscroll-contain",
					"snap-y snap-normal"
				].join(" ")}
				style={{
					height: containerH ?? undefined,
					scrollBehavior: prefersReduced ? "auto" : "smooth",
					scrollbarWidth: "none"
				}}
				aria-live='polite'>
				<div className='flex flex-col gap-6 mt-8 py-10 pb-16'>
					{content.map((t, idx) => {
						const isActive = idx === activeIndex;
						const expanded = expandedIndex === idx;

						const borderTone =
							idx % 2 === 0
								? "border-primary"
								: "border-primary-foreground";

						// Softer, longer transitions when not reduced-motion
						const emphasis = prefersReduced
							? ""
							: isActive
							? "opacity-100 scale-100 translate-y-0"
							: "opacity-65 scale-[0.98] translate-y-1";

						return (
							<div
								key={t.id}
								ref={(el) => {
									cardRefs.current[idx] = el;
								}}
								className={[
									expanded
										? "opacity-100 scale-100"
										: "opacity-40 scale-[0.95]",
									"snap-start px-1",
									"transition-all duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)]",
									emphasis
								].join(" ")}>
								{/* Outer frame */}
								<div
									role='button'
									tabIndex={0}
									aria-expanded={!!expanded}
									aria-controls={`testimonial-panel-${idx}`}
									onClick={() => onToggle(idx)}
									onKeyDown={(e) => onKey(e, idx)}
									className={[
										"flex border-2 border-opacity-55 rounded-2xl p-[2px]",
										borderTone,
										"transition-transform duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)]",
										expanded && "scale-[1.01]",
										// smaller collapsed footprint for tighter stack
										"min-h-[5.75rem]"
									].join(" ")}>
									{/* Mid frame */}
									<div
										className={[
											"flex border-2 rounded-xl p-[1px] w-full",
											"transition-all duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)]",
											borderTone
										].join(" ")}>
										{/* Inner card */}
										<div
											id={`testimonial-panel-${idx}`}
											className={[
												"relative flex w-full bg-white rounded-lg border-2 p-5",
												"transition-all duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)]",
												expanded
													? "bg-opacity-95 shadow-md"
													: "bg-opacity-85",
												borderTone
											].join(" ")}>
											{/* Left quote */}
											<FaQuoteLeft
												className={[
													"mb-1 shrink-0 transition-colors duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)]",
													expanded
														? "text-primary"
														: "text-primary-foreground"
												].join(" ")}
												size={18}
												aria-hidden='true'
											/>

											{/* Copy */}
											<div className='flex flex-col w-full px-4'>
												<p
													data-inner
													className={[
														"text-primary-secondary leading-relaxed text-left",
														"text-base sm:text-lg",
														"transition-[max-height] duration-200 ease-[cubic-bezier(0.22,0.61,0.36,1)]",
														expanded
															? "max-h-[22rem]"
															: "max-h-20 overflow-hidden"
													].join(" ")}>
													{t.text}
												</p>

												{/* gradient fade when collapsed */}
												{!expanded && (
													<div className='pointer-events-none absolute inset-x-3 bottom-3 h-8 bg-gradient-to-b from-transparent to-white' />
												)}

												<p
													className={[
														"mt-3 text-primary text-base sm:text-lg font-medium text-left",
														"transition-opacity duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)]",
														expanded
															? "opacity-100"
															: "opacity-0"
													].join(" ")}>
													{t.name}
												</p>
											</div>

											{/* Right quote */}
											<FaQuoteRight
												className={[
													"self-end mb-1 shrink-0 transition-colors duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)]",
													expanded
														? "text-primary"
														: "text-primary-foreground"
												].join(" ")}
												size={18}
												aria-hidden='true'
											/>
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default MobilePatientTestimonials;
