"use client";

import React, { useRef, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { getSupabaseBrowser } from "@/utils/api/supabase";
import { LoadingBlock } from "@/app/components/layout/loading/LoadingBlock";

export interface ClinicalExperienceRow {
	category: string;
	list_items: string[];
	icon: string;
}
export interface ClinicalExperienceTextBlock {
	section_title: string;
	text_slice_1: string;
	text_highlight_1: string;
	text_slice_2: string;
	text_highlight_2: string;
	text_slice_3: string;
	text_highlight_3: string;
}

function slugify(str: string) {
	return str
		?.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/(^-|-$)/g, "");
}

const ClinicalExperience = () => {
	const [activeIndex, setActiveIndex] = useState(0);
	const [textBlocks, setTextBlocks] = useState<ClinicalExperienceTextBlock>(
		{} as ClinicalExperienceTextBlock
	);
	const [content, setContent] = useState<ClinicalExperienceRow[]>([]);
	const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);

	React.useEffect(() => {
		const fetchContent = async () => {
			const supabase = getSupabaseBrowser();
			const { data: content, error } = await supabase
				.from("content_clinic")
				.select("*");

			if (error) {
				console.error("content fetch error:", error);
			}
			setContent((content as ClinicalExperienceRow[]) || []);

			const { data: textBlocks, error: textBlocksError } = await supabase
				.from("home_text_blocks_clinic")
				.select("*");

			if (textBlocksError) {
				console.error(
					"home_text_blocks_clinic fetch error:",
					textBlocksError
				);
			}
			setTextBlocks(textBlocks?.[0] as ClinicalExperienceTextBlock);
		};
		fetchContent();
	}, []);

	if (!content || content.length === 0) {
		return <LoadingBlock />;
	}

	const activeCategory = content[activeIndex] ?? content[0];
	const tablistId = "clinical-experience-tabs";
	const panelId = `panel-${slugify(activeCategory?.category)}`;

	const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
		const max = content.length - 1;
		if (e.key === "ArrowRight" || e.key === "ArrowDown") {
			e.preventDefault();
			const next = activeIndex === max ? 0 : activeIndex + 1;
			setActiveIndex(next);
			tabsRef.current[next]?.focus();
		} else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
			e.preventDefault();
			const prev = activeIndex === 0 ? max : activeIndex - 1;
			setActiveIndex(prev);
			tabsRef.current[prev]?.focus();
		} else if (e.key === "Home") {
			e.preventDefault();
			setActiveIndex(0);
			tabsRef.current[0]?.focus();
		} else if (e.key === "End") {
			e.preventDefault();
			setActiveIndex(max);
			tabsRef.current[max]?.focus();
		}
	};

	const panelItems = activeCategory?.list_items;

	return (
		<section aria-labelledby='clinical-experience-title'>
			<div className='flex flex-col items-center gap-y-12 pt-20 pb-10'>
				<h2 id='clinical-experience-title' className='sr-only'>
					{textBlocks?.section_title}
				</h2>

				<p className='w-[65%] text-center text-primary-secondary text-2xl font-light leading-relaxed py-10'>
					{textBlocks.text_slice_1}{" "}
					<span className='text-primary-foreground font-medium'>
						{textBlocks.text_highlight_1}
					</span>{" "}
					{textBlocks.text_slice_2}{" "}
					<span className='text-primary'>
						{textBlocks.text_highlight_2}
					</span>{" "}
					{textBlocks.text_slice_3}{" "}
					<span className='text-primary'>
						{textBlocks.text_highlight_3}
					</span>
				</p>

				<div className='flex flex-col xl:flex-row w-[90%] max-w-[1100px] border-2 border-primary rounded-xl overflow-hidden shadow-sm my-10'>
					{/* Left: Tablist */}
					<div
						className='flex flex-col w-full xl:w-[40%] border-r-2 border-primary'
						role='tablist'
						aria-label='Clinical experience content'
						id={tablistId}
						onKeyDown={handleKeyDown}>
						{content?.map((cat, i) => {
							const isActive = i === activeIndex;
							const tabId = `tab-${slugify(cat?.category)}`;

							return (
								<button
									key={cat.category}
									ref={(el) =>
										(tabsRef.current[i] = el as any)
									}
									id={tabId}
									role='tab'
									aria-selected={isActive}
									aria-controls={`panel-${slugify(
										cat.category
									)}`}
									tabIndex={isActive ? 0 : -1}
									onClick={() => setActiveIndex(i)}
									className={`flex items-center gap-4 px-6 py-4 border-b border-primary text-left transition-all duration-200 focus:outline-none focus:ring ${
										isActive
											? "bg-zinc-100"
											: "bg-white hover:bg-zinc-50"
									}`}>
									<Image
										src={`/assets/icons/${cat.icon}.png`}
										alt={`${cat.category} icon`}
										width={48}
										height={48}
										className={`transition-all ${
											isActive
												? "opacity-100 scale-110"
												: "opacity-60"
										}`}
									/>
									<span className='text-primary text-xl font-medium'>
										{cat?.category}
									</span>
								</button>
							);
						})}
					</div>

					{/* Right: Tab panel */}
					<div className='w-full bg-white'>
						<h3 className='text-4xl font-light -ml-[1px] text-white border-b py-4 border-b-primary p-5 pl-8 bg-primary-foreground bg-opacity-65'>
							{activeCategory.category}
						</h3>

						<AnimatePresence mode='wait'>
							<motion.ul
								key={activeCategory?.category}
								id={panelId}
								role='tabpanel'
								aria-labelledby={`tab-${slugify(
									activeCategory?.category
								)}`}
								tabIndex={0}
								initial={{ opacity: 1, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -10 }}
								transition={{ duration: 0.3 }}
								className='columns-1 sm:columns-2 break-inside-avoid gap-4 space-y-4 p-8 pt-5'>
								{panelItems.map((item, idx) => (
									<li
										key={`${activeCategory?.category}-${idx}`}
										className='break-inside-avoid flex items-start gap-4 text-primary-secondary text-2xl font-light'>
										<FaCheckCircle
											className='text-primary mt-1 shrink-0'
											aria-hidden='true'
										/>
										<span>{item}</span>
									</li>
								))}
							</motion.ul>
						</AnimatePresence>
					</div>
				</div>
			</div>
		</section>
	);
};

export { ClinicalExperience };
