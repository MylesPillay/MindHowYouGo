"use client";
import React, {
	useEffect,
	useMemo,
	useRef,
	useState,
	useCallback
} from "react";
import Image from "next/image";
import SectionTitleClear from "../../layout/headers/SectionTitleClear";
import { LoadingBlock } from "../../layout/loading/LoadingBlock";
import { getSupabaseBrowser } from "@/utils/api/supabase";

interface ContentDataType {
	section_title: string;
	section_header: string;
	section_main_text: string;
	section_bottom_text_1: string;
	section_click_text: string;
	section_bottom_text_2: string;
}

const MobileAboutMe = ({ id }: { id: string }) => {
	const [content, setContent] = useState<ContentDataType | null>(null);
	const [loading, setLoading] = useState(true);

	// one-time flags
	const [hasAnimated, setHasAnimated] = useState(false);
	const [imageVisible, setImageVisible] = useState(false);
	const [mainTextVisible, setMainTextVisible] = useState(false);

	// per-word flags
	const [hiVisible, setHiVisible] = useState(false);
	const [imVisible, setImVisible] = useState(false);
	const [nameVisible, setNameVisible] = useState(false);

	const sectionRef = useRef<HTMLElement | null>(null);
	const titleWrapRef = useRef<HTMLDivElement | null>(null);
	const textRef = useRef<HTMLDivElement | null>(null);
	const mainTextRef = useRef<HTMLDivElement | null>(null);
	const imageRef = useRef<HTMLDivElement | null>(null);

	// prevent double-start in StrictMode
	const startedRef = useRef(false);
	const timeoutsRef = useRef<number[]>([]);

	// refs (debug)
	const sectionRefCb = useCallback((node: HTMLElement | null) => {
		sectionRef.current = node;
	}, []);
	const titleWrapRefCb = useCallback((node: HTMLDivElement | null) => {
		titleWrapRef.current = node;
	}, []);
	const textRefCb = useCallback((node: HTMLDivElement | null) => {
		textRef.current = node;
	}, []);
	const mainTextRefCb = useCallback((node: HTMLDivElement | null) => {
		mainTextRef.current = node;
	}, []);
	const imageRefCb = useCallback((node: HTMLDivElement | null) => {
		imageRef.current = node;
	}, []);

	// fetch content
	useEffect(() => {
		let didCancel = false;
		(async () => {
			try {
				const supabase = getSupabaseBrowser();
				const { data, error } = await supabase
					.from("content_about_me")
					.select(
						"section_title,section_header,section_main_text,section_bottom_text_1,section_click_text,section_bottom_text_2"
					)
					.limit(1);
				if (didCancel) return;
				if (error) console.error("[AboutMe] Supabase error:", error);
				setContent((data?.[0] as ContentDataType) ?? null);
			} finally {
				if (!didCancel) setLoading(false);
			}
		})();
		return () => {
			didCancel = true;
		};
	}, []);

	// parse header into "Hi", "I'm", "Kiran"
	const { hiText, imText, nameText } = useMemo(() => {
		const header = content?.section_header?.trim() ?? "";
		const parts = header.split(/\s+/);
		if (parts.length >= 2) {
			const name = parts.pop() || "";
			const remaining = parts.join(" ");
			const hiMatch = remaining.match(/^\s*Hi,?/i);
			const imMatch = remaining.match(/I'm/i);
			let hi = hiMatch ? hiMatch[0].replace(/\s+$/, "") : remaining;
			let im = "";
			if (imMatch) {
				hi = remaining.slice(0, imMatch.index).trim() || "Hi";
				im = "I'm";
			} else if (/^Hi,?$/i.test(hi)) {
				im = "I'm";
			}
			if (!hi) hi = "Hi";
			if (!im) im = "I'm";
			return { hiText: hi.replace(/,$/, ""), imText: im, nameText: name };
		}
		return { hiText: "Hi", imText: "I'm", nameText: header || "Kiran" };
	}, [content?.section_header]);

	// Trigger when title enters central band. IMPORTANT: do NOT depend on hasAnimated.
	useEffect(() => {
		if (!content) return;
		if (startedRef.current) return;

		const prefersReduced =
			typeof window !== "undefined" &&
			window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		const el = titleWrapRef.current;
		if (!el) return;

		const kickOff = () => {
			if (startedRef.current) return;
			startedRef.current = true;

			if (prefersReduced) {
				setHiVisible(true);
				setImVisible(true);
				setNameVisible(true);
				setImageVisible(true);
				setMainTextVisible(true);
				setHasAnimated(true);
				return;
			}
			setHiVisible(true);
			timeoutsRef.current.push(
				window.setTimeout(() => setImageVisible(true), 200)
			);
			timeoutsRef.current.push(
				window.setTimeout(() => setImVisible(true), 280)
			);
			timeoutsRef.current.push(
				window.setTimeout(() => setNameVisible(true), 300)
			);
			timeoutsRef.current.push(
				window.setTimeout(() => setMainTextVisible(true), 450)
			);
			setHasAnimated(true);
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

		// Cleanup ONLY on unmount
		return () => {
			observer.disconnect();
			timeoutsRef.current.forEach((t) => clearTimeout(t));
			timeoutsRef.current = [];
		};
	}, [content]); // <-- no hasAnimated here

	if (loading || !content) return <LoadingBlock />;

	const closing = (
		<p className='text-pretty break-words'>
			{content.section_bottom_text_1}{" "}
			<a
				aria-label='Navigate to Services page'
				className='font-medium text-primary underline underline-offset-4'
				href='/services'>
				{content.section_click_text}
			</a>
			{content.section_bottom_text_2}
		</p>
	);

	return (
		<section
			ref={sectionRefCb}
			id={id}
			aria-labelledby='about-title-line-1 about-title-line-2'
			className='relative w-full bg-background px-5 pt-14 pb-10 flex flex-col items-center'
			style={{
				paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 1rem)"
			}}>
			{/* Title wrapper (observer target) */}
			<div className='w-full max-w-md -ml-20 mb-10' ref={titleWrapRefCb}>
				<SectionTitleClear title={content.section_title} mobileScreen />
			</div>
			{/* Image: slides in from right to final -mr-[80%] position */}
			<div
				className='mt-8 w-full max-w-md flex justify-center'
				ref={imageRefCb}>
				<div
					className={[
						"relative h-96 w-96 rounded-l-full rounded-r-0 overflow-hidden shadow-sm",
						"-mr-[80%]",
						"transform transition-all duration-700 ease-out will-change-transform opacity-0",
						imageVisible
							? "opacity-100 translate-x-0"
							: "translate-x-24"
					].join(" ")}>
					<Image
						src='/assets/images/Kiran.jpg'
						alt='Photo of me: Kiran Sharma'
						fill
						sizes='(max-width: 640px) 60vw, 384px'
						className='object-cover'
						priority
						decoding='async'
					/>
				</div>
			</div>

			{/* Two-line header with per-word stagger; text-5xl */}
			<div
				ref={textRefCb}
				className='mt-8 w-[80%] mr-52 from-zinc-200 bg-gradient-to-r to-white/5 py-2 relative bottom-32'>
				{/* Line 1: Hi + I'm */}
				<h2 className='text-5xl leading-tight font-light ml-20 text-primary-foreground text-pretty text-left'>
					<span
						className={[
							"inline-block transform transition-all duration-700 ease-out will-change-transform",
							hiVisible
								? "opacity-100 translate-x-0"
								: "opacity-0 -translate-x-6"
						].join(" ")}>
						{hiText}
					</span>
					<span className='inline-block w-2' aria-hidden='true' />
					<span
						className={[
							"inline-block transform transition-all duration-700 ease-out will-change-transform",
							imVisible
								? "opacity-100 translate-x-0"
								: "opacity-0 -translate-x-6"
						].join(" ")}>
						{imText}
					</span>
				</h2>

				{/* Line 2: Kiran */}
				<div ref={mainTextRefCb}>
					<h2 className='text-6xl leading-tight font-light ml-20 text-primary text-pretty text-left'>
						<span
							className={[
								"inline-block transform transition-all duration-700 ease-out will-change-transform",
								nameVisible
									? "opacity-100 translate-x-16"
									: "opacity-0 -translate-x-6"
							].join(" ")}>
							{nameText}
						</span>
					</h2>
				</div>
			</div>

			{/* Body */}
			<p className='font-normal text-lg text-primary-secondary p-6'>
				<span
					className={[
						"inline-block transform transition-all duration-700 ease-out will-change-transform",
						mainTextVisible
							? "opacity-100 -translate-y-20"
							: "opacity-80 translate-y-20"
					].join(" ")}>
					{content.section_main_text}
				</span>
			</p>

			{/* Closing */}
			<div className='mt-8 w/full max-w-md text-center text-slate-600 text-lg font-light'>
				{closing}
			</div>
		</section>
	);
};

import dynamic from "next/dynamic";
// Export AFTER definition to avoid hydration quirks
export default dynamic(() => Promise.resolve(MobileAboutMe), { ssr: false });
export { MobileAboutMe };
