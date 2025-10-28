"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import SectionTitleClear from "@/app/components/layout/headers/SectionTitleClear";
import { LoadingBlock } from "@/app/components/layout/loading/LoadingBlock";
import dynamic from "next/dynamic";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

interface ContentDataType {
	section_title: string;
	top_box_text_slice_1: string;
	top_box_text_slice_2: string;
	therapy_text_slice_1: string;
	therapy_text_highlight_1: string;
	therapy_text_slice_2: string;
	therapy_text_highlight_2: string;
	therapy_text_slice_3: string;
	therapy_text_highlight_3: string;
	therapy_text_slice_4: string;
	therapy_text_highlight_4: string;
	therapy_text_slice_5: string;
	therapy_text_highlight_5: string;
	therapy_text_slice_6: string;
	therapy_text_highlight_6: string;
	therapy_text_slice_7: string;
	therapy_text_highlight_7: string;
	therapy_text_slice_8: string;
	therapy_text_slice_9: string;
	therapy_text_slice_10: string;
	walk_and_talk_text_slice_1: string;
	walk_and_talk_text_slice_2: string;
	walk_and_talk_text_slice_3: string;
	walk_and_talk_link_text: string;
}

interface MobileCBTExplainedProps {
	abridged?: boolean;
}

const MobileCBTExplained = ({ abridged = false }: MobileCBTExplainedProps) => {
	const [content, setContent] = useState<ContentDataType | null>(null);
	const [loading, setLoading] = useState(true);
	const supabase = useSupabaseClient();

	// one-time trigger + stagger flags
	const startedRef = useRef(false);
	const timeoutsRef = useRef<number[]>([]);
	const titleRef = useRef<HTMLDivElement | null>(null);

	const [l1, setL1] = useState(false); // top line 1
	const [l2, setL2] = useState(false); // top line 2
	const [p1, setP1] = useState(false); // therapy para 1 (always shown in non-abridged top block previously)
	const [p2, setP2] = useState(false);
	const [p3, setP3] = useState(false);
	const [p4, setP4] = useState(false);

	const [wtTitle, setWtTitle] = useState(false);
	const [wt1, setWt1] = useState(false);
	const [wt2, setWt2] = useState(false);
	const [wt3, setWt3] = useState(false);

	const [imgVisible, setImgVisible] = useState(false);

	useEffect(() => {
		let didCancel = false;
		(async () => {
			try {
				const { data, error } = await supabase
					.from("content_cbt_text_blocks")
					.select("*")
					.limit(1);

				if (didCancel) return;
				if (error) {
					console.error("CBT Explained fetch error:", error);
				}
				setContent((data?.[0] as ContentDataType) ?? null);
			} finally {
				if (!didCancel) setLoading(false);
			}
		})();
		return () => {
			didCancel = true;
		};
	}, []);

	// Build the strings once
	const view = useMemo(() => {
		if (!content) return null;
		return {
			title: content.section_title,
			top1: content.top_box_text_slice_1,
			top2: content.top_box_text_slice_2,
			t1: (
				<>
					{content.therapy_text_slice_1}{" "}
					<span className='font-medium text-primary'>
						{content.therapy_text_highlight_1}
					</span>
				</>
			),
			t2: (
				<>
					{content.therapy_text_slice_2}{" "}
					<span className='font-semibold text-primary-foreground'>
						{content.therapy_text_highlight_2}
					</span>{" "}
					{content.therapy_text_slice_3}{" "}
					<span className='font-medium text-primary'>
						{content.therapy_text_highlight_3}
					</span>
					.
				</>
			),
			t3: (
				<>
					{content.therapy_text_slice_4}{" "}
					<span className='text-primary-foreground font-medium'>
						{content.therapy_text_highlight_4}
					</span>{" "}
					{content.therapy_text_slice_5}
				</>
			),
			t4: (
				<>
					{content.therapy_text_slice_6}{" "}
					<span className='font-medium text-primary-foreground'>
						{content.therapy_text_highlight_5}
					</span>{" "}
					{content.therapy_text_slice_7}{" "}
					<span className='font-medium text-primary'>
						{content.therapy_text_highlight_6}
					</span>{" "}
					{content.therapy_text_slice_8}{" "}
					<span className='italic font-semibold'>
						{content.therapy_text_slice_9}
					</span>{" "}
					{content.therapy_text_slice_10}
				</>
			),
			w1: content.walk_and_talk_text_slice_1,
			w2: content.walk_and_talk_text_slice_2,
			w3: (
				<>
					{content.walk_and_talk_text_slice_3}{" "}
					<a
						href='https://www.bacp.co.uk/bacp-journals/healthcare-counselling-and-psychotherapy-journal/2024/articles-october/walking-and-talking/'
						className='text-primary hover:text-primary-foreground font-medium underline underline-offset-4'>
						{content.walk_and_talk_link_text}
					</a>
					.
				</>
			)
		};
	}, [content]);

	// Trigger animations when title hits the central band (one-time)
	useEffect(() => {
		if (!content || startedRef.current) return;
		const prefersReduced =
			typeof window !== "undefined" &&
			window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		const el = titleRef.current;
		if (!el) return;

		const kickOff = () => {
			if (startedRef.current) return;
			startedRef.current = true;

			if (prefersReduced) {
				setL1(true);
				setL2(true);
				setP1(true);
				setP2(true);
				setP3(true);
				setP4(true);
				setWtTitle(true);
				setWt1(true);
				setWt2(true);
				setWt3(true);
				setImgVisible(true);
				return;
			}

			// Staggered sequence
			setL1(true);
			timeoutsRef.current.push(window.setTimeout(() => setL2(true), 120));
			timeoutsRef.current.push(window.setTimeout(() => setP1(true), 130));
			timeoutsRef.current.push(window.setTimeout(() => setP2(true), 140));
			timeoutsRef.current.push(window.setTimeout(() => setP3(true), 150));
			timeoutsRef.current.push(window.setTimeout(() => setP4(true), 160));
			timeoutsRef.current.push(
				window.setTimeout(() => setWtTitle(true), 170)
			);
			timeoutsRef.current.push(
				window.setTimeout(() => setWt1(true), 180)
			);
			timeoutsRef.current.push(
				window.setTimeout(() => setWt2(true), 190)
			);
			timeoutsRef.current.push(
				window.setTimeout(() => setImgVisible(true), 200)
			);
			timeoutsRef.current.push(
				window.setTimeout(() => setWt3(true), 210)
			);
		};

		const io = new IntersectionObserver(
			(entries) => {
				for (const e of entries) {
					if (e.isIntersecting) {
						kickOff();
						io.disconnect();
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

		io.observe(el);
		return () => {
			io.disconnect();
			timeoutsRef.current.forEach((t) => clearTimeout(t));
			timeoutsRef.current = [];
		};
	}, [content]);

	if (loading || !content || !view) return <LoadingBlock />;

	return (
		<section
			className='relative w-full bg-background px-5 pt-14 pb-10 flex flex-col items-center'
			style={{
				paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 1rem)"
			}}
			aria-labelledby='cbt-title'>
			{/* Title (observer target) */}
			<div className='w-[110%] max-w-md -ml-20 mb-10' ref={titleRef}>
				<SectionTitleClear
					id='cbt-title'
					title={view.title}
					mobileScreen
				/>
			</div>

			{/* Top two lines (text-only) */}
			<div className='w-full max-w-sm text-left space-y-2'>
				<p
					className={[
						"text-2xl text-primary-foreground text-pretty",
						"transform transition-all duration-700 ease-out will-change-transform",
						l1
							? "opacity-100 translate-x-0"
							: "opacity-0 -translate-x-3"
					].join(" ")}>
					{view.top1}
				</p>
				<p
					className={[
						"text-xl text-primary text-pretty",
						"transform transition-all duration-700 ease-out will-change-transform",
						l2
							? "opacity-100 translate-x-0"
							: "opacity-0 -translate-x-3"
					].join(" ")}>
					{view.top2}
				</p>
			</div>

			{/* Therapy with me (render fewer if abridged) */}
			<div className='w-full max-w-sm text-left mt-6 space-y-4'>
				{/* p1 appears even if abridged previously lived in a box; here it’s text */}
				{!abridged && (
					<p
						className={[
							"text-primary-secondary text-lg leading-relaxed",
							"transform transition-all duration-700 ease-out will-change-transform",
							p1
								? "opacity-100 translate-y-0"
								: "opacity-0 translate-y-3"
						].join(" ")}>
						{view.t1}
					</p>
				)}

				<p
					className={[
						"text-primary-secondary text-lg leading-relaxed",
						"transform transition-all duration-700 ease-out will-change-transform",
						p2
							? "opacity-100 translate-y-0"
							: "opacity-0 translate-y-3"
					].join(" ")}>
					{view.t2}
				</p>

				<p
					className={[
						"text-primary-secondary text-lg leading-relaxed",
						"transform transition-all duration-700 ease-out will-change-transform",
						p3
							? "opacity-100 translate-y-0"
							: "opacity-0 translate-y-3"
					].join(" ")}>
					{view.t3}
				</p>

				<p
					className={[
						"text-primary-secondary text-lg leading-relaxed",
						"transform transition-all duration-700 ease-out will-change-transform",
						p4
							? "opacity-100 translate-y-0"
							: "opacity-0 translate-y-3"
					].join(" ")}>
					{view.t4}
				</p>
			</div>

			{/* Walk & Talk */}
			<div className='w-full max-w-sm text-left mt-10 space-y-4'>
				<h3
					className={[
						"text-2xl font-medium text-primary tracking-tight",
						"transform transition-all duration-700 ease-out will-change-transform",
						wtTitle
							? "opacity-100 translate-y-0"
							: "opacity-0 translate-y-2"
					].join(" ")}>
					Walk &amp; Talk
				</h3>

				<p
					className={[
						"text-primary-secondary text-lg leading-relaxed",
						"transform transition-all duration-700 ease-out will-change-transform",
						wt1
							? "opacity-100 translate-y-0"
							: "opacity-0 translate-y-2"
					].join(" ")}>
					{view.w1}
				</p>

				<p
					className={[
						"text-primary-secondary text-lg leading-relaxed",
						"transform transition-all duration-700 ease-out will-change-transform",
						wt2
							? "opacity-100 translate-y-0"
							: "opacity-0 translate-y-2"
					].join(" ")}>
					{view.w2}
				</p>

				{/* Optional image (kept, but no container UI) */}
				{!abridged && (
					<div
						className={[
							"w-full flex justify-center my-4",
							"transform transition-all duration-700 ease-out will-change-transform",
							imgVisible
								? "opacity-100 translate-x-0"
								: "opacity-0 translate-x-4"
						].join(" ")}>
						<div className='relative w-72 h-80 overflow-hidden rounded-2xl shadow-sm'>
							<Image
								src='https://ngtfjhkkqhatjugocvhh.supabase.co/storage/v1/object/public/images/cabotTower.png'
								alt='Cabot Tower'
								fill
								sizes='288px'
								className='object-cover'
								priority
								decoding='async'
							/>
						</div>
					</div>
				)}

				{!abridged && (
					<p
						className={[
							"text-primary-secondary text-lg leading-relaxed",
							"transform transition-all duration-700 ease-out will-change-transform",
							wt3
								? "opacity-100 translate-y-0"
								: "opacity-0 translate-y-2"
						].join(" ")}>
						{view.w3}
					</p>
				)}
			</div>
		</section>
	);
};

// Export AFTER definition to avoid hydration quirks
export default dynamic(() => Promise.resolve(MobileCBTExplained), {
	ssr: false
});
export { MobileCBTExplained };
