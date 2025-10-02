"use client";

import React from "react";
import TextBox from "../../layout/containers/TextBox";
import Image from "next/image";
import SectionTitleClear from "../../layout/headers/SectionTitleClear";

const WhyChooseMe = () => {
	const whyChooseMeContent = {
		title: "Why have therapy with me?",
		cbt: {
			heading: "CBT",
			body: (
				<>
					{/* TEXT (verbatim) */}
					{
						"Cognitive behavioural therapy (CBT) is a type of talking therapy which helps manage emotional problems by recognising and then adjusting the way we think, feel and behave. Often used to treat anxiety and depression but equally useful for many other mental and physical health problems too."
					}
				</>
			)
		},
		accreditation: {
			withLogo: true,
			logo: {
				src: "/assets/images/BABCP-logo.webp",
				alt: "BABCP accreditation logo",
				width: 220,
				height: 90
			},
			body: (
				<>
					{/* TEXT (verbatim) */}
					{
						"I am accredited by the British Association for Behavioural and Cognitive Psychotherapies -  the leading governing body for CBT in the UK. With further training completed in Acceptance and Commitment Therapy and Psychological therapy for eating disorders. I receive regular clinical supervision from another registered therapist to ensure the therapy I deliver is of the highest quality."
					}
				</>
			)
		},
		legalClarity: {
			body: (
				<>
					{/* TEXT (verbatim) */}
					{
						"Be aware that the term “Therapist” currently has no legal protection in the UK — therefore anyone can use the title even if they have had no training at all! I am insured to practice therapy legally in the UK, following the "
					}
					<a
						href='https://babcp.com/Standards'
						target='_blank'
						rel='noopener noreferrer'
						className='text-primary underline font-semibold hover:opacity-90'
						aria-label='Open BABCP code of ethics in a new tab'>
						{"BABCP code of ethics"}
					</a>
					{" and maintain strict confidentiality at all times."}
				</>
			)
		},
		finalCallout: {
			body: (
				<>
					{/* TEXT (verbatim) */}
					<p>
						See my{" "}
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
							{`Testimonials`}
						</span>{" "}
						page to hear from people I've worked with — and if you'd
						like to see proof of my accreditation, I'll happily
						provide it on request.
					</p>
				</>
			)
		}
	};

	return (
		<>
			<SectionTitleClear title={whyChooseMeContent.title} />

			<div className='flex flex-col w-full h-auto pt-20 pb-16 justify-evenly items-center mx-auto gap-y-10'>
				<h3 className='text-center w-full text-primary-secondary text-2xl font-light self-center max-w-[60vw] mt-10'>
					{whyChooseMeContent.cbt.body}
				</h3>
				<TextBox
					variant='light-long'
					className='justify-center w-[65%] text-center mx-auto mt-16 '>
					<h3 className='text-primary-secondary text-2xl font-light max-w-[70vw] p-6 mx-auto'>
						{whyChooseMeContent.legalClarity.body}
					</h3>
				</TextBox>
				<h3 className='text-primary-secondary text-2xl my-10 font-light justify-center text-center mx-auto md:max-w-[60%]'>
					{whyChooseMeContent.accreditation.body}
				</h3>
				{/* ————— Accreditation & training ————— */}
				<div className='flex flex-col md:flex-row-reverse w-[80%] justify-around items-center gap-8 px-4'>
					{whyChooseMeContent.accreditation.withLogo && (
						<div className='w-full md:w-[20%] rounded-2xl text-primary font-semibold text-5xl justify-around items-center self-center'>
							<Image
								className='m-auto h-[140px] w-[180px]'
								src={whyChooseMeContent.accreditation.logo.src}
								alt={whyChooseMeContent.accreditation.logo.alt}
								width={
									whyChooseMeContent.accreditation.logo.width
								}
								height={
									whyChooseMeContent.accreditation.logo.height
								}
								priority={false}
							/>
						</div>
					)}
					<h3 className='flex text-center w-[75%] ml-20 p-2 text-primary-secondary text-2xl font-light self-center'>
						{whyChooseMeContent.finalCallout.body}
					</h3>
				</div>
			</div>
		</>
	);
};

export { WhyChooseMe };
