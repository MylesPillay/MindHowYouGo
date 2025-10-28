"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";
import { LoadingBlock } from "@/app/components/layout/loading/LoadingBlock";
import SectionTitleClear from "@/app/components/layout/headers/SectionTitleClear";
import dynamic from "next/dynamic";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

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

const MobileClinicalExperience = (): JSX.Element => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [rows, setRows] = useState<ClinicalExperienceRow[]>([]);
	const [textBlocks, setTextBlocks] =
		useState<ClinicalExperienceTextBlock | null>(null);
	const [loading, setLoading] = useState(true);
	const supabase = useSupabaseClient();

	// basic reduced-motion check
	const prefersReduced =
		typeof window !== "undefined" &&
		window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	useEffect(() => {
		let didCancel = false;
		(async () => {
			try {
				const { data: clinicData, error: clinicErr } = await supabase
					.from("content_clinic")
					.select("*")
					.order("id", { ascending: true });

				if (clinicErr) {
					console.error("content_clinic fetch error:", clinicErr);
				}

				const { data: tbData, error: tbErr } = await supabase
					.from("home_text_blocks_clinic")
					.select("*")
					.limit(1);

				if (tbErr) {
					console.error(
						"home_text_blocks_clinic fetch error:",
						tbErr
					);
				}

				if (!didCancel) {
					setRows((clinicData as ClinicalExperienceRow[]) || []);
					setTextBlocks(
						(tbData?.[0] as ClinicalExperienceTextBlock) ?? null
					);
					setLoading(false);
				}
			} catch (e) {
				console.error("ClinicalExperience fetch exception:", e);
				if (!didCancel) setLoading(false);
			}
		})();

		return () => {
			didCancel = true;
		};
	}, []);

	if (loading || !rows.length || !textBlocks) {
		return <LoadingBlock />;
	}

	const active = rows[currentIndex];

	return (
		<div className='flex flex-col w-[90%] text-slate-800  justify-center mx-auto'>
			<div className='w-[140%] -ml-10'>
				<SectionTitleClear
					title={textBlocks.section_title}
					className=''
					mobileScreen
				/>
			</div>
			<div className='w-full my-8 mt-10' />
			<p
				className={[
					"w-full max-w-sm mx-auto text-center text-primary-secondary text-lg leading-relaxed",
					"transition-all duration-700",
					prefersReduced
						? "opacity-100 translate-y-0"
						: "opacity-100 translate-y-0"
				].join(" ")}>
				{textBlocks.text_slice_1}{" "}
				<span className='text-primary-foreground font-medium '>
					{textBlocks.text_highlight_1}
				</span>{" "}
				{textBlocks.text_slice_2}{" "}
				<span className='text-primary '>
					{textBlocks.text_highlight_2}
				</span>{" "}
				{textBlocks.text_slice_3}{" "}
				<span className='text-primary '>
					{textBlocks.text_highlight_3}
				</span>
			</p>
			<h3
				className={[
					"text-center text-4xl font-light text-primary-foreground max-w-[100%] mt-16 mb-2 underline",
					"transition-all duration-300",
					prefersReduced ? "" : "opacity-100"
				].join(" ")}>
				{active?.category}
			</h3>
			<div className='flex md:flex-col flex-row w-full h-auto justify-around mt-8'>
				<div
					aria-label='Clinical categories'
					className='flex flex-col md:flex-row justify-start items-center space-y-6 w-[15%] md:w-full'>
					{rows.map((svc, index) => {
						const active = index === currentIndex;
						return (
							<button
								key={svc.category}
								type='button'
								role='tab'
								aria-selected={active}
								aria-controls={`panel-${index}`}
								tabIndex={active ? 0 : -1}
								onClick={() => setCurrentIndex(index)}
								className='cursor-pointer '
								aria-label={`Select ${svc.category}`}>
								<Image
									src={svc.icon}
									alt={`${svc.category} icon`}
									width={active ? 60 : 50}
									height={active ? 60 : 50}
									sizes='(max-width: 640px) 60px, 60px'
									className={`transition-all duration-300 ${
										active
											? "opacity-100 scale-110"
											: "opacity-50 scale-90 hover:opacity-75"
									}`}
								/>
							</button>
						);
					})}
				</div>

				<div className='flex flex-col items-start md:items-center md:justify-center justify-between -ml-4 w-[65%] md:w-[80%] md:mx-auto mr-4 mt-1'>
					<div className='flex min-h-[25vh] rounded-xl h-full w-full border-primary-foreground border-solid border-[1px] p-[2px]'>
						<ul
							key={active?.category}
							className='w-full h-auto space-y-3 p-4 bg-white border-primary border rounded-lg
             transition-all duration-300 ease-out opacity-100 translate-y-0'
							style={{
								viewTransitionName: `ce-${active?.category}`
							}}>
							{(active?.list_items || []).map((item, i) => (
								<li
									key={`${active?.category}-${i}`}
									className='flex flex-row justify-start items-center align-middle gap-3 text-md text-primary-secondary'>
									<FaCheckCircle
										size={23}
										className='text-primary shrink-0'
										aria-hidden='true'
									/>
									{item}
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default dynamic(() => Promise.resolve(MobileClinicalExperience), {
	ssr: false
});
export { MobileClinicalExperience };
