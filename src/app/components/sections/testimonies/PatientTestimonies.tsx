"use client";
import React, { useEffect, useState } from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import AnimatedSectionTitle from "../../layout/headers/AnimatedTitle";
import { LoadingBlock } from "../../layout/loading/LoadingBlock";
import { supabaseBrowser } from "@/utils/api/supabase";

interface ContentDataTypeRow {
	testimony_name?: string;
	testimony_description?: string;
	id: number;
}
interface ContentDataType extends Array<ContentDataTypeRow> {}

const PatientTestimonials = ({ id }: { id: string }): JSX.Element => {
	const [content, setContent] = useState<ContentDataType>([]);
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
			const supabase = supabaseBrowser;
			const { data, error } = await supabase
				.from("content_testimonials")
				.select("*");

			if (error) {
				console.error("Why Me data fetch error:", error);
			}
			setContent(
				data
					? data.map((item) => ({
							testimony_name: item.testimony_name ?? undefined,
							testimony_description:
								item.testimony_description ?? undefined,
							id: item.id
					  }))
					: []
			);
			setLoading(false);
		};
		fetchData();
	}, []);

	if (!content) {
		return <LoadingBlock />;
	}

	const testimonials = [...content]
		.sort((a, b) => a.id - b.id)
		.map((testimonial) => ({
			name: testimonial.testimony_name,
			text: testimonial.testimony_description
		}));

	return (
		<div className='flex flex-col items-center w-full pt-20 px-4 md:px-16'>
			<AnimatedSectionTitle title='What People Say' className='pl-28' />

			<div
				id={id}
				className='relative grid grid-cols-1 md:grid-cols-2 gap-16 w-full max-w-7xl mt-20 py-10'>
				{testimonials.map((testimonial, idx) => (
					<div key={idx} className='group relative w-full h-full'>
						{/* Collapsed Card (default visible) */}
						<div
							className={`relative z-0 opacity-100 group-hover:opacity-0 transition-opacity duration-300
								flex border-2 border-opacity-55 rounded-2xl p-[2px] w-full
								${idx % 2 === 0 ? "border-primary" : "border-primary-foreground"}`}>
							<div
								className={`flex border-2 rounded-xl p-[1px] w-full
									${idx % 2 === 0 ? "border-primary" : "border-primary-foreground"}`}>
								<div className='relative flex border-2 rounded-lg p-6 py-2 bg-opacity-85 bg-white h-full w-full'>
									<FaQuoteLeft
										className='text-primary-foreground mb-2 shrink-0'
										size={20}
									/>
									<p className='text-primary-secondary text-xl text-center md:text-left pt-4 mb-4 line-clamp-4 p-6'>
										{testimonial.text}
									</p>
									<FaQuoteRight
										className='text-primary-foreground place-self-end mb-2 shrink-0'
										size={20}
									/>
									<div className='pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-b from-transparent to-white transition-opacity duration-300 opacity-100 group-hover:opacity-0' />
								</div>
							</div>
						</div>

						{/* Expanded Card (hover visible) */}
						<div
							className={`absolute top-0 left-0 w-full z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300
								flex border-2 border-opacity-55 rounded-2xl p-[2px] bg-white
								${idx % 2 === 0 ? "border-primary" : "border-primary-foreground"}`}>
							<div
								className={`flex border-2 rounded-xl p-[1px] w-full
									${idx % 2 === 0 ? "border-primary" : "border-primary-foreground"}`}>
								<div className='relative flex border-2 rounded-lg p-6 py-2 bg-white bg-opacity-95 w-full z-20 shadow-xl'>
									<FaQuoteLeft
										className='text-primary mb-2 shrink-0'
										size={20}
									/>
									<div className='flex flex-col w-full text-left p-6 pb-2'>
										<p className='text-primary-secondary text-xl text-center md:text-left mb-4'>
											{testimonial.text}
										</p>
										<p className='text-primary text-xl text-left md:text-left pt-0 font-medium'>
											{testimonial.name}
										</p>
									</div>
									<FaQuoteRight
										className='text-primary place-self-end mb-2 shrink-0'
										size={20}
									/>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default PatientTestimonials;
