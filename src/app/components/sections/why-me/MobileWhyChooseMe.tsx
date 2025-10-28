"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import SectionTitleClear from "../../layout/headers/SectionTitleClear";
import { LoadingBlock } from "../../layout/loading/LoadingBlock";
import dynamic from "next/dynamic";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

interface ContentDataType {
	section_title: string;
	text_block_1: string;
	text_block_2: string;
	legal_text_slice_1: string;
	legal_text_slice_2: string;
	legal_text_slice_3: string;
	cta_text_slice_1: string;
	cta_text_slice_2: string;
	cta_text_slice_3: string;
}

interface WhyChooseMeProps {
	abridged?: boolean;
}

const WhyChooseMe = ({ abridged = false }: WhyChooseMeProps) => {
	const [content, setContent] = useState<ContentDataType | null>(null);
	const [loading, setLoading] = useState(true);
	const supabase = useSupabaseClient();

	const startedRef = useRef(false);
	const timeoutsRef = useRef<number[]>([]);
	const titleRef = useRef<HTMLDivElement | null>(null);

	const [showIntro, setShowIntro] = useState(false);
	const [showLegal, setShowLegal] = useState(false);
	const [showAccBody, setShowAccBody] = useState(false);
	const [showLogo, setShowLogo] = useState(false);
	const [showCallout, setShowCallout] = useState(false);

	useEffect(() => {
		let didCancel = false;
		(async () => {
			try {
				const { data, error } = await supabase
					.from("content_why_me")
					.select("*")
					.limit(1);
				if (didCancel) return;
				if (error) {
					console.error("Why Me data fetch error:", error);
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

	const view = useMemo(() => {
		if (!content) return null;
		return {
			title: content.section_title,
			intro: content.text_block_1,
			accreditationBody: content.text_block_2,
			legal: (
				<>
					{content.legal_text_slice_1}{" "}
					<a
						href='https://babcp.com/Standards'
						target='_blank'
						rel='noopener noreferrer'
						className='text-primary underline font-semibold hover:opacity-90'
						aria-label='Open BABCP code of ethics in a new tab'>
						{content.legal_text_slice_2}
					</a>{" "}
					{content.legal_text_slice_3}
				</>
			),
			callout: (
				<>
					{content.cta_text_slice_1}{" "}
					<button
						type='button'
						onClick={() =>
							document
								.getElementById("testimonies")
								?.scrollIntoView({
									behavior: "smooth",
									block: "start"
								})
						}
						className='text-primary font-semibold underline underline-offset-2 hover:opacity-90'>
						{content.cta_text_slice_2}
					</button>{" "}
					{content.cta_text_slice_3}
				</>
			)
		};
	}, [content]);

	// trigger when the title enters the central viewport band (once)
	useEffect(() => {
		if (!content || startedRef.current) return;

		const prefersReduced =
			typeof window !== "undefined" &&
			window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		const el = titleRef.current;
		if (!el && !abridged) return; // if not abridged we expect a title

		const kickOff = () => {
			if (startedRef.current) return;
			startedRef.current = true;

			if (prefersReduced) {
				setShowIntro(true);
				if (!abridged) {
					setShowLegal(true);
					setShowAccBody(true);
					setShowLogo(true);
					setShowCallout(true);
				}
				return;
			}

			// Staggered sequence (tweak timings to taste)
			setShowIntro(true);
			if (!abridged) {
				timeoutsRef.current.push(
					window.setTimeout(() => setShowLegal(true), 140)
				);
				timeoutsRef.current.push(
					window.setTimeout(() => setShowAccBody(true), 150)
				);
				timeoutsRef.current.push(
					window.setTimeout(() => setShowLogo(true), 160)
				);
				timeoutsRef.current.push(
					window.setTimeout(() => setShowCallout(true), 170)
				);
			}
		};

		// If abridged (no title at top here), kick off immediately when mounted
		if (abridged) {
			kickOff();
			return;
		}

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

		io.observe(el!);

		return () => {
			io.disconnect();
			timeoutsRef.current.forEach((t) => clearTimeout(t));
			timeoutsRef.current = [];
		};
	}, [content, abridged]);

	if (loading || !content || !view) return <LoadingBlock />;

	return (
		<section
			className='relative w-full bg-background px-5 pt-14 pb-10 flex flex-col items-center'
			style={{
				paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 1rem)"
			}}
			aria-labelledby={abridged ? undefined : "why-title"}>
			{!abridged && (
				<div className='w-full max-w-md -ml-20 mb-10' ref={titleRef}>
					<SectionTitleClear
						id='why-title'
						title={view.title}
						mobileScreen
					/>
				</div>
			)}

			{/* Intro (CBT) */}
			<div className='w-full max-w-sm text-left'>
				<p
					className={[
						"text-primary-secondary text-lg leading-relaxed",
						"transform transition-all duration-700 ease-out will-change-transform",
						showIntro
							? "opacity-100 translate-y-0"
							: "opacity-0 translate-y-3"
					].join(" ")}>
					{view.intro}
				</p>
			</div>

			{/* Legal clarity */}
			{!abridged && (
				<div className='w-full max-w-sm text-left mt-6'>
					<p
						className={[
							"text-primary-secondary text-lg leading-relaxed",
							"transform transition-all duration-700 ease-out will-change-transform",
							showLegal
								? "opacity-100 translate-y-0"
								: "opacity-0 translate-y-3"
						].join(" ")}>
						{view.legal}
					</p>
				</div>
			)}

			{/* Accreditation text + logo */}
			{!abridged && (
				<div className='w-full max-w-sm text-left mt-8'>
					<p
						className={[
							"text-primary-secondary text-lg leading-relaxed",
							"transform transition-all duration-700 ease-out will-change-transform",
							showAccBody
								? "opacity-100 translate-y-0"
								: "opacity-0 translate-y-3"
						].join(" ")}>
						{view.accreditationBody}
					</p>

					<div
						className={[
							"w-full flex justify-center mt-6",
							"transform transition-all duration-700 ease-out will-change-transform",
							showLogo
								? "opacity-100 translate-y-0 scale-100"
								: "opacity-0 translate-y-2 scale-[0.98]"
						].join(" ")}>
						<Image
							src='https://ngtfjhkkqhatjugocvhh.supabase.co/storage/v1/object/public/images/BABCP-logo.webp'
							alt='BABCP accreditation logo'
							width={150}
							height={90}
							className='h-[90px] w-[130px]'
							priority={false}
						/>
					</div>
				</div>
			)}

			{/* Final callout (link scroll to testimonies) */}
			{!abridged && (
				<div className='w-full max-w-sm text-left mt-8'>
					<p
						className={[
							"text-primary-secondary text-lg leading-relaxed",
							"transform transition-all duration-700 ease-out will-change-transform",
							showCallout
								? "opacity-100 translate-y-0"
								: "opacity-0 translate-y-3"
						].join(" ")}>
						{view.callout}
					</p>
				</div>
			)}
		</section>
	);
};

// Export AFTER definition to avoid hydration quirks (consistent with your baseline)
export default dynamic(() => Promise.resolve(WhyChooseMe), { ssr: false });
export { WhyChooseMe };
