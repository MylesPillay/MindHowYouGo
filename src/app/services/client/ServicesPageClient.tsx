// "use client";
// import React, { useEffect, useMemo, useRef, useState } from "react";
// import ServicesContactForm from "../../components/sections/contact/Services/ServicesContactForm";
// import ServicesNav, {
// 	type PaneTab
// } from "../../components/layout/navigation/ServicesNav";
// import { ClinicalExperience } from "@/app/components/sections/experience/Home/ClinicalExperience";
// import BottomCTASection from "../components/BottomCTASection/BottomCTASection";
// import { CBTExplained } from "@/app/components/sections/cbt-explained/Home/CBTExplained";
// import { WhyChooseMe } from "@/app/components/sections/why-me/WhyChooseMe";

// const PANES = [
// 	{
// 		id: "services",
// 		title: "CBT Treatment",
// 		render: () => (
// 			<>
// 				<WhyChooseMe abridged={true} />
// 				<CBTExplained abridged={true} />
// 				<BottomCTASection />
// 			</>
// 		)
// 	},
// 	{
// 		id: "experience",
// 		title: "Clinical Experience",
// 		render: () => (
// 			<>
// 				<ClinicalExperience />
// 				<BottomCTASection />
// 			</>
// 		)
// 	},
// 	{
// 		id: "contact",
// 		title: "Contact",
// 		render: () => <ServicesContactForm />
// 	}
// ] as const;

// export default function ServicesPage(): JSX.Element {
// 	const containerRef = useRef<HTMLDivElement | null>(null);
// 	const paneRefs = useRef<Record<string, HTMLDivElement | null>>({});
// 	const [activeId, setActiveId] = useState<string>(PANES[0].id);

// 	const prefersReducedMotion = useMemo(
// 		() =>
// 			typeof window !== "undefined" &&
// 			window.matchMedia("(prefers-reduced-motion: reduce)").matches,
// 		[]
// 	);

// 	const scrollToPane = (id: string) => {
// 		const container = containerRef.current;
// 		const pane = paneRefs.current[id];
// 		if (!container || !pane) return;

// 		const left = pane.offsetLeft - container.offsetLeft;

// 		container.scrollTo({
// 			left,
// 			behavior: prefersReducedMotion ? "auto" : "smooth"
// 		});

// 		setActiveId(id);
// 		pane.focus({ preventScroll: true });
// 	};

// 	useEffect(() => {
// 		const scroller = containerRef.current;
// 		if (!scroller) return;

// 		const observer = new IntersectionObserver(
// 			(entries) => {
// 				const best = entries
// 					.filter((e) => e.isIntersecting)
// 					.sort(
// 						(a, b) =>
// 							(b.intersectionRatio || 0) -
// 							(a.intersectionRatio || 0)
// 					)[0];
// 				if (best?.target) {
// 					const id = (best.target as HTMLElement).dataset.paneId!;
// 					if (id && id !== activeId) setActiveId(id);
// 				}
// 			},
// 			{ root: scroller, threshold: [0.3, 0.5, 0.7] }
// 		);

// 		Object.values(paneRefs.current).forEach(
// 			(pane) => pane && observer.observe(pane)
// 		);
// 		return () => observer.disconnect();
// 	}, [activeId]);

// 	const onKeyDownTabs = (e: React.KeyboardEvent) => {
// 		const index = PANES.findIndex((p) => p.id === activeId);
// 		if (index === -1) return;
// 		if (e.key === "ArrowRight") {
// 			e.preventDefault();
// 			scrollToPane(PANES[(index + 1) % PANES.length].id);
// 		} else if (e.key === "ArrowLeft") {
// 			e.preventDefault();
// 			scrollToPane(PANES[(index - 1 + PANES.length) % PANES.length].id);
// 		} else if (e.key === "Home") {
// 			e.preventDefault();
// 			scrollToPane(PANES[0].id);
// 		} else if (e.key === "End") {
// 			e.preventDefault();
// 			scrollToPane(PANES[PANES.length - 1].id);
// 		}
// 	};

// 	return (
// 		<main className='w-full pb-28'>
// 			<ServicesNav
// 				panes={
// 					PANES.map(({ id, title }) => ({
// 						id,
// 						title
// 					})) as readonly PaneTab[]
// 				}
// 				activeId={activeId}
// 				onSelect={scrollToPane}
// 				onKeyDownTabs={onKeyDownTabs}
// 			/>
// 			{/* Horizontal scroller with snap */}
// 			<div
// 				style={{ scrollbarWidth: "none" }}
// 				ref={containerRef}
// 				className='
//           relative
//           flex w-full overflow-x-auto
//           snap-x snap-mandatory
//           scroll-smooth
//         '
// 				aria-label='Horizontally scrollable services sections'>
// 				{PANES.map((p) => (
// 					<div
// 						key={p.id}
// 						id={`pane-${p.id}`}
// 						data-pane-id={p.id}
// 						ref={(el: any) => (paneRefs.current[p.id] = el)}
// 						className='

//               snap-start
//               shrink-0
//               w-full
//               min-h-[calc(100vh-9rem)]
//               overflow-y-auto
//               pb-10
//             '
// 						role='group'
// 						aria-labelledby={`tab-${p.id}`}
// 						tabIndex={-1}>
// 						<h2 className='sr-only'>{p.title}</h2>
// 						{p.render()}
// 					</div>
// 				))}
// 			</div>
// 		</main>
// 	);
// }
"use client";

import React from "react";
import dynamic from "next/dynamic";

// DESKTOP (existing panes)
import ServicesContactForm from "../../components/sections/contact/Services/ServicesContactForm";
import ServicesNav, {
	type PaneTab
} from "../../components/layout/navigation/ServicesNav";
import { ClinicalExperience } from "@/app/components/sections/experience/Home/ClinicalExperience";
import BottomCTASection from "../components/BottomCTASection/BottomCTASection";
import { CBTExplained } from "@/app/components/sections/cbt-explained/Home/CBTExplained";
import { WhyChooseMe } from "@/app/components/sections/why-me/WhyChooseMe";
import MobileServicesPage from "./MobileServicesPage";

const PANES = [
	{
		id: "services",
		title: "CBT Treatment",
		render: () => (
			<>
				<WhyChooseMe abridged />
				<CBTExplained abridged />
				<BottomCTASection />
			</>
		)
	},
	{
		id: "experience",
		title: "Clinical Experience",
		render: () => (
			<>
				<ClinicalExperience />
				<BottomCTASection />
			</>
		)
	},
	{
		id: "contact",
		title: "Contact",
		render: () => <ServicesContactForm />
	}
] as const;

export default function ServicesPage(): JSX.Element {
	return (
		<main className='w-full pb-28'>
			{/* MOBILE: show on <640px */}
			<div className='block sm:hidden'>
				<MobileServicesPage />
			</div>

			{/* DESKTOP/TABLET: hide on <640px */}
			<div className='hidden sm:block'>
				<DesktopPanes />
			</div>
		</main>
	);
}

/** Your existing panes UI extracted so the file stays tidy */
function DesktopPanes() {
	const containerRef = React.useRef<HTMLDivElement | null>(null);
	const paneRefs = React.useRef<Record<string, HTMLDivElement | null>>({});
	const [activeId, setActiveId] = React.useState<string>(PANES[0].id);

	const prefersReducedMotion =
		typeof window !== "undefined" &&
		window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	const scrollToPane = (id: string) => {
		const container = containerRef.current;
		const pane = paneRefs.current[id];
		if (!container || !pane) return;
		const left = pane.offsetLeft - container.offsetLeft;
		container.scrollTo({
			left,
			behavior: prefersReducedMotion ? "auto" : "smooth"
		});
		setActiveId(id);
		pane.focus({ preventScroll: true });
	};

	React.useEffect(() => {
		const scroller = containerRef.current;
		if (!scroller) return;
		const observer = new IntersectionObserver(
			(entries) => {
				const best = entries
					.filter((e) => e.isIntersecting)
					.sort(
						(a, b) =>
							(b.intersectionRatio || 0) -
							(a.intersectionRatio || 0)
					)[0];
				if (best?.target) {
					const id = (best.target as HTMLElement).dataset.paneId!;
					if (id && id !== activeId) setActiveId(id);
				}
			},
			{ root: scroller, threshold: [0.3, 0.5, 0.7] }
		);
		Object.values(paneRefs.current).forEach(
			(pane) => pane && observer.observe(pane)
		);
		return () => observer.disconnect();
	}, [activeId]);

	const onKeyDownTabs = (e: React.KeyboardEvent) => {
		const index = PANES.findIndex((p) => p.id === activeId);
		if (index === -1) return;
		if (e.key === "ArrowRight") {
			e.preventDefault();
			scrollToPane(PANES[(index + 1) % PANES.length].id);
		} else if (e.key === "ArrowLeft") {
			e.preventDefault();
			scrollToPane(PANES[(index - 1 + PANES.length) % PANES.length].id);
		} else if (e.key === "Home") {
			e.preventDefault();
			scrollToPane(PANES[0].id);
		} else if (e.key === "End") {
			e.preventDefault();
			scrollToPane(PANES[PANES.length - 1].id);
		}
	};

	return (
		<>
			<ServicesNav
				panes={
					PANES.map(({ id, title }) => ({
						id,
						title
					})) as readonly PaneTab[]
				}
				activeId={activeId}
				onSelect={scrollToPane}
				onKeyDownTabs={onKeyDownTabs}
			/>
			<div
				style={{ scrollbarWidth: "none" }}
				ref={containerRef}
				className='relative flex w-full overflow-x-auto snap-x snap-mandatory scroll-smooth'
				aria-label='Horizontally scrollable services sections'>
				{PANES.map((p) => (
					<div
						key={p.id}
						id={`pane-${p.id}`}
						data-pane-id={p.id}
						ref={(el: any) => (paneRefs.current[p.id] = el)}
						className='snap-start shrink-0 w-full min-h-[calc(100vh-9rem)] overflow-y-auto pb-10'
						role='group'
						aria-labelledby={`tab-${p.id}`}
						tabIndex={-1}>
						<h2 className='sr-only'>{p.title}</h2>
						{p.render()}
					</div>
				))}
			</div>
		</>
	);
}
