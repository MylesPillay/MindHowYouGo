"use client";

import React, { useMemo, useRef, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
	{
		title: "Mood & Emotional Health",
		icon: "act",
		items: [
			"Depression",
			"Bereavement, grief and loss",
			"Suicidal feelings",
			"Anger",
			"Stress and burnout",
			"Sleep issues",
			"Chronic insomnia"
		]
	},
	{
		title: "Anxiety Disorders",
		icon: "cbt",
		items: [
			"Generalised anxiety",
			"Panic attacks",
			"Social anxiety",
			"Performance anxiety",
			"OCD - obsessive compulsive disorder",
			"Health anxiety",
			"Agoraphobia",
			"Specific phobias",
			"Emetophobia",
			"Blood/needle phobia"
		]
	},
	{
		title: "Eating & Body Image",
		icon: "corporate",
		items: [
			"Bulimia nervosa (BMI > 17)",
			"Binge eating disorder",
			"Orthorexia",
			"Body dysmorphic disorder",
			"Muscle dysmorphia ('bigorexia')"
		]
	},
	{
		title: "Trauma & Abuse",
		icon: "group",
		items: [
			"PTSD / Complex PTSD",
			"Sexual abuse (childhood/adult)",
			"Domestic violence",
			"Refugees fleeing conflict",
			"Survivors of people trafficking"
		]
	},
	{
		title: "Habits & Behaviours",
		icon: "ptsd",
		items: [
			"Trichotillomania (hair pulling)",
			"Excoriation (skin picking)",
			"Self-harm (non-medical)",
			"Gambling",
			"Pornography use",
			"Alcohol use",
			"Smoking",
			"Recreational drugs (non-IV)"
		]
	},
	{
		title: "Relationships & Identity",
		icon: "wellbeing",
		items: [
			"Relationship conflict",
			"Infidelity",
			"Breakdown / Divorce",
			"Friendship issues",
			"Low self-esteem",
			"Confidence issues",
			"Perfectionism",
			"Assertiveness training",
			"Feeling lost or without direction",
			"Life changes (e.g. job loss, parenthood)"
		]
	}
];

function slugify(str: string) {
	return str
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/(^-|-$)/g, "");
}

const ClinicalExperience = () => {
	const [activeIndex, setActiveIndex] = useState(0);
	const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);

	const activeCategory = categories[activeIndex] ?? categories[0];
	const tablistId = "clinical-experience-tabs";
	const panelId = `panel-${slugify(activeCategory.title)}`;

	const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
		const max = categories.length - 1;
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

	const panelItems = useMemo(() => activeCategory.items, [activeCategory]);

	return (
		<section aria-labelledby='clinical-experience-title'>
			<div className='flex flex-col items-center gap-y-12 pt-20 pb-10'>
				<h2 id='clinical-experience-title' className='sr-only'>
					Clinical Experience
				</h2>

				<p className='w-[65%] text-center text-primary-secondary text-2xl font-light leading-relaxed'>
					I have worked with clients experiencing a wide range of
					psychological challenges.{" "}
					<span className='text-primary-foreground font-medium'>
						You don’t need to fit a label
					</span>{" "}
					to benefit from therapy — I aim to understand your unique
					experience with{" "}
					<span className='text-primary'>clinical insight</span> and{" "}
					<span className='text-primary'>cultural sensitivity</span>.
				</p>

				<div className='flex flex-col xl:flex-row w-[90%] max-w-[1100px] border-2 border-primary rounded-xl overflow-hidden shadow-sm'>
					{/* Left: Tablist */}
					<div
						className='flex flex-col w-full xl:w-[40%] border-r-2 border-primary'
						role='tablist'
						aria-label='Clinical experience categories'
						id={tablistId}
						onKeyDown={handleKeyDown}>
						{categories.map((cat, i) => {
							const isActive = i === activeIndex;
							const tabId = `tab-${slugify(cat.title)}`;
							const labelledBy = tabId;

							return (
								<button
									key={cat.title}
									ref={(el) =>
										(tabsRef.current[i] = el as any)
									}
									id={tabId}
									role='tab'
									aria-selected={isActive}
									aria-controls={`panel-${slugify(
										cat.title
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
										alt={`${cat.title} icon`}
										width={36}
										height={36}
										sizes='36px'
										className={`transition-all ${
											isActive
												? "opacity-100 scale-110"
												: "opacity-60"
										}`}
									/>
									<span className='text-primary text-lg font-medium'>
										{cat.title}
									</span>
								</button>
							);
						})}
					</div>

					{/* Right: Tab panel */}
					<div className='w-full bg-white'>
						<h3 className='text-3xl font-light -ml-[1px] text-white border-b py-4 border-b-primary p-5 pl-8 bg-primary-foreground bg-opacity-65'>
							{activeCategory.title}
						</h3>

						<AnimatePresence mode='wait'>
							<motion.ul
								key={activeCategory.title}
								id={panelId}
								role='tabpanel'
								aria-labelledby={`tab-${slugify(
									activeCategory.title
								)}`}
								tabIndex={0}
								initial={{ opacity: 1, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -10 }}
								transition={{ duration: 0.3 }}
								className='columns-1 sm:columns-2 break-inside-avoid gap-4 space-y-4 p-8 pt-5'>
								{panelItems.map((item, idx) => (
									<li
										key={`${activeCategory.title}-${idx}`}
										className='break-inside-avoid flex items-start gap-4 text-primary-secondary text-xl font-light'>
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
