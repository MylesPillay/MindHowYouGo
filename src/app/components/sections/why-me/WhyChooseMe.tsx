"use client";

import React, { useEffect, useState } from "react";
import TextBox from "../../layout/containers/TextBox";
import Image from "next/image";
import SectionTitleClear from "../../layout/headers/SectionTitleClear";
import { getSupabaseBrowser } from "@/utils/api/supabase";
import { LoadingBlock } from "../../layout/loading/LoadingBlock";

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
	const [_fadeIn, setFadeIn] = useState(false);

	React.useEffect(() => {
		if (!loading) {
			const timeout = setTimeout(() => setFadeIn(true), 50);
			return () => clearTimeout(timeout);
		}
	}, [loading]);

	useEffect(() => {
		const fetchData = async () => {
			const supabase = getSupabaseBrowser();
			const { data, error } = await supabase
				.from("content_why_me")
				.select("*");

			if (error) {
				console.error("Why Me data fetch error:", error);
			}
			setContent((data?.[0] as ContentDataType) ?? null);
			setLoading(false);
		};
		fetchData();
	}, []);

	if (!content) {
		return <LoadingBlock />;
	}

	const whyChooseMeContent = {
		title: content.section_title,
		cbt: {
			heading: "CBT",
			body: content.text_block_1
		},
		accreditation: {
			withLogo: true,
			logo: {
				src: "/assets/images/BABCP-logo.webp",
				alt: "BABCP accreditation logo",
				width: 220,
				height: 90
			},
			body: content.text_block_2
		},
		legalClarity: {
			body: (
				<>
					{content.legal_text_slice_1}
					<a
						href='https://babcp.com/Standards'
						target='_blank'
						rel='noopener noreferrer'
						className='text-primary underline font-semibold hover:opacity-90'
						aria-label='Open BABCP code of ethics in a new tab'>
						{content.legal_text_slice_2}
					</a>
					{" " + content.legal_text_slice_3}
				</>
			)
		},
		finalCallout: {
			body: (
				<>
					<p>
						{content.cta_text_slice_1}{" "}
						<span
							onClick={() => {
								document
									.getElementById("testimonies")
									?.scrollIntoView({
										behavior: "smooth",
										block: "start"
									});
							}}
							className='text-primary font-semibold underline underline-offset-2 hover:opacity-90'>
							{content.cta_text_slice_2}
						</span>{" "}
						{content.cta_text_slice_3}
					</p>
				</>
			)
		}
	};

	return (
		<>
			{abridged ? null : (
				<SectionTitleClear title={whyChooseMeContent.title} />
			)}
			<div
				className={`flex flex-col w-full h-auto justify-evenly items-center mx-auto gap-y-10 ${
					abridged ? "pt-20 mt-2" : "pt-20 pb-16"
				}`}>
				<h3 className='text-center w-full text-primary-secondary text-xl font-light self-center max-w-[60vw] mt-10'>
					{whyChooseMeContent.cbt.body}
				</h3>
				{abridged ? null : (
					<>
						<TextBox
							variant='light-long'
							className='justify-center w-[65%] text-center mx-auto mt-16 '>
							<h3 className='text-primary-secondary text-xl font-light max-w-[70vw] p-6 mx-auto'>
								{whyChooseMeContent.legalClarity.body}
							</h3>
						</TextBox>

						<h3 className='text-primary-secondary text-xl my-10 font-light justify-center text-center mx-auto md:max-w-[60%]'>
							{whyChooseMeContent.accreditation.body}
						</h3>
						<div className='flex flex-col md:flex-row-reverse w-[80%] justify-around items-center gap-8 px-4'>
							{whyChooseMeContent.accreditation.withLogo && (
								<div className='w-full md:w-[20%] rounded-2xl text-primary font-semibold text-3xl justify-around items-center self-center'>
									<Image
										className='m-auto h-[140px] w-[180px]'
										src={
											whyChooseMeContent.accreditation
												.logo.src
										}
										alt={
											whyChooseMeContent.accreditation
												.logo.alt
										}
										width={
											whyChooseMeContent.accreditation
												.logo.width
										}
										height={
											whyChooseMeContent.accreditation
												.logo.height
										}
										priority={false}
									/>
								</div>
							)}
							<h3 className='flex text-center w-[75%] ml-20 p-2 text-primary-secondary text-xl font-light self-center'>
								{whyChooseMeContent.finalCallout.body}
							</h3>
						</div>
					</>
				)}
			</div>
		</>
	);
};

export { WhyChooseMe };
