"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import TextBox from "../../layout/containers/TextBox";
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

const AboutMe = ({ id }: { id: string }) => {
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
				.from("content_about_me")
				.select("*");

			if (error) {
				console.error("Why Choose Me data fetch error:", error);
			}
			setContent((data?.[0] as ContentDataType) ?? null);
			setLoading(false);
		};
		fetchData();
	}, []);

	if (!content) {
		return <LoadingBlock />;
	}
	const aboutMeContent = {
		title: content.section_title,
		intro: content.section_header,
		body: content.section_main_text,
		closing: (
			<p>
				{content.section_bottom_text_1}{" "}
				<a
					aria-label="text hyperlink navigating to 'Services' Page."
					className='text-semibold text-primary'
					href='/services'>
					{content.section_click_text}
				</a>{" "}
				{content.section_bottom_text_2}
			</p>
		)
	};

	return (
		<>
			<div
				id={id}
				className='flex flex-col w-full h-auto pb-20 justify-evenly align-middle items-center mx-auto'>
				<SectionTitleClear title={aboutMeContent.title} />
				<div className='flex flex-row w-[100%] h-auto justify-evenly align-middle items-center pt-20'>
					<div className='flex flex-col w-auto'>
						<h1 className='flex w-full justify-center   text-primary-foreground lg:text-6xl mb-8 font-light'>
							{aboutMeContent.intro}
						</h1>
						<TextBox
							text={aboutMeContent.body}
							variant='light'
							textSize='text-2xl'
						/>
					</div>
					<div className='w-80 h-80 rounded-full overflow-hidden relative flex items-center align-self-start justify-center mt-16 -ml-16'>
						<Image
							src='/assets/images/Kiran.jpg'
							alt='Photo of me: Kiran Sharma'
							fill
							sizes='400px'
							className='object-fill scale-125 rounded-full'
						/>
					</div>
				</div>
				<h3 className='flex text-center w-[55%] mt-20 p-2 text-slate-600  text-2xl font-light self-center'>
					{aboutMeContent.closing}
				</h3>
			</div>
		</>
	);
};

export { AboutMe };
