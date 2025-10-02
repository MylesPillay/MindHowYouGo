"use client";

import React from "react";
import TextBox from "../../../layout/containers/TextBox";
import ServicesTitleClear from "@/app/components/layout/headers/Services/ServicesTitleClear";
import Link from "next/link";

type Props = {
	/** DOM id of your Contact section to scroll to */
	contactSectionId?: string;
};

const ServicesSection = ({ contactSectionId = "contact" }: Props) => {
	const scrollToContact = () => {
		document.getElementById(contactSectionId)?.scrollIntoView({
			behavior: "smooth",
			block: "start"
		});
	};

	return (
		<section
			aria-labelledby='services-title'
			className='flex flex-col w-full h-auto pb-1 justify-evenly items-center max-w-screen'>
			<ServicesTitleClear title='My Services' />
			<div className='flex flex-col w-full gap-y-8'>
				<p className='text-center w-[65%] text-primary-secondary text-2xl font-light self-center'>
					<span className='font-semibold'>
						Initial 20 min no-obligation introduction call
					</span>{" "}
					– <span className='font-semibold text-primary'>Free</span> —
					This is a chance to say hello by phone or on video call and
					have your questions answered to make sure CBT with me is
					right for you.
				</p>

				<p className='text-center w-[65%] text-primary-secondary text-2xl font-light self-center'>
					<span className='font-semibold'>
						1:1 CBT sessions (online)
					</span>{" "}
					—{" "}
					<span className='font-semibold italic text-primary-foreground'>
						pricing to be determined
					</span>
					. 60-minute online video call sessions at a regular time to
					suit your schedule (depending on availability). You can
					block-book a set number of sessions or book ad-hoc — it’s up
					to you.
				</p>

				<p className='text-center w-[65%] text-primary-secondary text-2xl font-light self-center'>
					<span className='font-semibold'>Walk and Talk therapy</span>{" "}
					– There is a growing body of evidence around the therapeutic
					effectiveness of “walk and talk” therapy.
					<span className='italic'>
						{" "}
						Prince-Llewellyn, H. and McCarthy, P., 2024.{" "}
						<span className='font-semibold text-primary'>
							Walking and talking for well-being:
						</span>{" "}
						Exploring the effectiveness of walk and talk therapy.
					</span>{" "}
					<span className='font-semibold underline'>
						Counselling and Psychotherapy Research
					</span>
					.
				</p>

				<TextBox className='justify-center w-full text-center mx-auto mt-8'>
					<p className='text-center w-full text-primary-secondary text-2xl font-light self-center'>
						If you’re unsure about which service might be right for
						you, that’s okay — just start with a conversation.{" "}
						<button
							type='button'
							onClick={scrollToContact}
							className='text-primary font-semibold underline underline-offset-2 hover:opacity-90 focus:outline-none focus:ring rounded'
							aria-label='Scroll to the Contact section'>
							Reach out
						</button>{" "}
						and we can find the best fit together.
					</p>
				</TextBox>

				<p className='text-center w-[65%] text-primary-secondary text-2xl font-light self-center'>
					For some people, the idea of sitting down for a traditional
					therapy session is just not your “cup of tea”. A lot of our
					lives are now online based, so walk and talk therapy is a
					great option that gets us out in the fresh air and can
					enhance the therapeutic process.
				</p>

				<p className='text-center w-[65%] text-primary-secondary text-2xl font-light self-center'>
					We would have a{" "}
					<span className='font-semibold text-primary'>
						set-up session
					</span>{" "}
					to assess and formulate a plan, and then further treatment
					sessions can be “walk and talk”. With so many lovely green
					spaces in Bristol, there are many walking routes we can
					utilise.
				</p>
			</div>

			{/* CTA + Back to top */}
			<div className='flex flex-col items-center justify-center px-4 mt-16'>
				<TextBox
					className='text-center mx-auto'
					heading='Not sure where to start? Begin with a free 20-minute introduction call and we’ll work out the best path forward together.'
				/>
				<Link href={"/contact"} className='mt-4'>
					<button className='px-6 py-3 text-xl font-medium text-white rounded-full bg-gradient-to-r from-primary/60 to-primary-secondary transition-all duration-500 ease-in-out shadow-md hover:shadow-lg hover:brightness-110 hover:scale-105 hover:to-primary-foreground hover:from-primary'>
						Get In Touch
					</button>
				</Link>
			</div>

			<div className='mt-6 text-center'>
				<Link
					href='#'
					className='text-md text-primary underline-offset-4 hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded'>
					Back to top
				</Link>
			</div>
		</section>
	);
};

export { ServicesSection };
