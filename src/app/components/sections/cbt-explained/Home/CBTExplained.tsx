"use client";
import React, { useEffect, useState } from "react";
import TextBox from "../../../layout/containers/TextBox";
import AnimatedSectionTitle from "@/app/components/layout/headers/AnimatedTitle";
import Image from "next/image";
import { getSupabaseServer } from "@/utils/api/supabase";
import { LoadingBlock } from "@/app/components/layout/loading/LoadingBlock";

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

const CBTExplained = () => {
	const [content, setContent] = useState<ContentDataType | null>(null);
	const [loading, setLoading] = useState(true);
	const [fadeIn, setFadeIn] = useState(false);

	React.useEffect(() => {
		if (!loading) {
			const timeout = setTimeout(() => setFadeIn(true), 50);
			return () => clearTimeout(timeout);
		}
	}, [loading]);

	useEffect(() => {
		const fetchData = async () => {
			const supabase = getSupabaseServer();
			const { data, error } = await supabase
				.from("content_cbt_text_blocks")
				.select("*");

			if (error) {
				console.error("Why Me data fetch error:", error);
			}

			setContent(data?.[0] as ContentDataType);

			setLoading(false);
		};
		fetchData();
	}, []);

	if (!content) {
		return <LoadingBlock />;
	}

	const cbtExplainedContent = {
		title: content.section_title,
		topBox: {
			line1: content.top_box_text_slice_1,
			line2: content.top_box_text_slice_2
		},
		therapyWithMe: {
			1: (
				<p>
					{content.therapy_text_slice_1}{" "}
					<span className='font-normal text-primary'>
						{content.therapy_text_highlight_1}
					</span>
				</p>
			),
			2: (
				<p>
					{content.therapy_text_slice_2}{" "}
					<span className='font-semibold text-primary-foreground'>
						{content.therapy_text_highlight_2}
					</span>{" "}
					{content.therapy_text_slice_3}{" "}
					<span className='font-medium text-primary'>
						{content.therapy_text_highlight_3}
					</span>
					.
				</p>
			),
			3: (
				<p>
					{content.therapy_text_slice_4}{" "}
					<span className='text-primary-foreground font-medium'>
						{content.therapy_text_highlight_4}
					</span>{" "}
					{content.therapy_text_slice_5}{" "}
				</p>
			),
			4: (
				<p>
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
				</p>
			)
		},
		walkAndTalk: {
			1: content.walk_and_talk_text_slice_1,
			2: content.walk_and_talk_text_slice_2,
			3: (
				<p>
					{content.walk_and_talk_text_slice_3}{" "}
					<a
						href='https://www.bacp.co.uk/bacp-journals/healthcare-counselling-and-psychotherapy-journal/2024/articles-october/walking-and-talking/'
						className='text-primary hover:text-primary-foreground font-medium'>
						{content.walk_and_talk_link_text}
					</a>
					.
				</p>
			)
		}
	};

	return (
		<>
			<div className='flex flex-col w-full h-auto pt-20 pb-1 justify-evenly items-center mx-auto'>
				<div className='flex flex-col w-full gap-y-8 mt-10'>
					<TextBox
						className='justify-center w-full text-center mx-auto min-w-[68vw] my-16'
						variant='dark'>
						<h3 className='flex w-full justify-center text-primary-foreground lg:text-5xl my-8 font-light'>
							{cbtExplainedContent.topBox.line1}
						</h3>
						<h3 className='text-center w-full text-primary text-3xl font-medium self-center pt-2'>
							{cbtExplainedContent.topBox.line2}
						</h3>
						<h3 className='flex text-center w-full my-10 text-primary-secondary text-2xl font-light px-16'>
							{cbtExplainedContent.therapyWithMe[1]}
						</h3>
					</TextBox>
					<div className='flex flex-row justify-between w-[60%] mx-auto space-x-8	items-baseline pt-16'>
						<h3 className='flex-1 mt-4 p-2 text-primary-secondary text-2xl w-[55%] font-light text-center'>
							{cbtExplainedContent.therapyWithMe[2]}
						</h3>
						<h3 className='w-[45%] mt-4 p-2 text-primary-secondary text-2xl font-light text-center'>
							{cbtExplainedContent.therapyWithMe[3]}
						</h3>
					</div>
					<h3 className='flex my-20 p-2 text-primary-secondary text-2xl font-light self-center w-[70%] text-center'>
						{cbtExplainedContent.therapyWithMe[4]}
					</h3>
					<div className='flex w-full justify-center align-middle items-center px-20 mb-10'>
						<TextBox className='p-2 overflow-hidden justify-center w-full text-center min-w-[73%]'>
							<AnimatedSectionTitle
								title='Walk & Talk'
								className='w-screen -ml-48 -mt-5'
							/>
							<h3 className='flex text-center my-8 p-2 text-primary-secondary text-2xl font-light self-center'>
								{cbtExplainedContent.walkAndTalk[1]}
							</h3>
							<div className='w-[108%] -ml-8 -mb-4 justify-end bg-zinc-100 border-t-[1.5px] border-zinc-700'>
								<h3 className='text-primary-secondary font-light text-2xl p-8 py-3 justify-center mx-auto max-w-[90%]'>
									{cbtExplainedContent.walkAndTalk[2]}
								</h3>
							</div>
						</TextBox>
					</div>
					<div className='flex w-full justify-center align-middle items-center px-20'>
						<Image
							src='/assets/images/cabotTower.png'
							alt='Company logo'
							width={770}
							height={990}
						/>
					</div>
					<TextBox className='justify-end w-full text-center mx-auto mb-20'>
						<h3 className='text-center w-full text-primary-secondary text-2xl font-light self-center p-4'>
							{cbtExplainedContent.walkAndTalk[3]}
						</h3>
					</TextBox>
				</div>
			</div>
		</>
	);
};

export { CBTExplained };
