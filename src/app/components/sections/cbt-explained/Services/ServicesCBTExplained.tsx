import React from "react";
import TextBox from "../../../layout/containers/TextBox";
import ServicesTitleClear from "@/app/components/layout/headers/Services/ServicesTitleClear";
import Link from "next/link";

const ServicesCBTExplained = () => {
	return (
		<>
			<ServicesTitleClear title='CBT Explained' />
			<div className='flex flex-col w-full h-auto pb-1 justify-evenly items-center mx-auto'>
				<div className='flex flex-col w-full gap-y-8'>
					<h3 className='text-center w-[65%] text-primary-secondary text-2xl font-light self-center'>
						<span className='font-semibold '>
							Cognitive behavioural therapy (CBT)
						</span>{" "}
						is a type of talking therapy which helps manage
						emotional problems by recognising and then adjusting the
						way we{" "}
						<span className='font-semibold text-primary'>
							think
						</span>
						,{" "}
						<span className='font-semibold text-primary'>feel</span>{" "}
						and{" "}
						<span className='font-semibold text-primary'>
							behave
						</span>
						.
					</h3>

					<h3 className='text-center w-[65%] text-primary-secondary text-2xl font-light self-center'>
						CBT is most commonly used to treat{" "}
						<span className='font-semibold text-primary'>
							anxiety
						</span>{" "}
						and{" "}
						<span className='font-semibold text-primary'>
							depression
						</span>{" "}
						but can be useful for many other mental and physical
						health problems too.
					</h3>

					<h3 className='text-center w-[65%] text-primary-secondary text-2xl font-light self-center'>
						CBT is{" "}
						<span className='font-semibold '>collaborative</span>{" "}
						and{" "}
						<span className='font-semibold italic text-primary-foreground'>
							“hands-on”
						</span>{" "}
						therapy — it’s not just about the talking. You (the
						client) are involved in the direction of therapy and the
						decision-making process is{" "}
						<span className='font-semibold text-primary'>
							shared
						</span>
						.
					</h3>

					<h3 className='text-center w-[65%] text-primary-secondary text-2xl font-light self-center'>
						CBT is{" "}
						<span className='font-semibold text-primary'>
							evidence-based
						</span>{" "}
						and follows NICE guidelines for mental health
						intervention where indicated.
					</h3>

					<TextBox className='justify-center w-full text-center mx-auto mt-8'>
						<h3 className='text-center w-full text-primary-secondary text-2xl font-light self-center'>
							<span className='text-nowrap'>
								It can be tricky living with a human mind
							</span>{" "}
							— there are no miracle cures or quick fixes. My aim
							is to{" "}
							<span className='font-semibold text-primary'>
								instil hope
							</span>{" "}
							and help you get to a place where you can{" "}
							<span className='font-semibold italic  text-primary-foreground'>
								“Mind How You Go...”
							</span>
						</h3>
					</TextBox>

					<h3 className='text-center w-[65%] text-primary-secondary text-2xl font-light self-center'>
						Typically in treatment, we first{" "}
						<span className='font-semibold text-primary'>
							assess and formulate
						</span>{" "}
						your mental health problem — exploring how it started
						and what keeps it going.
					</h3>

					<h3 className='text-center w-[65%] text-primary-secondary text-2xl font-light self-center'>
						We then explore how to make
						<span className='font-semibold text-primary-foreground'>
							{" "}
							lasting change
						</span>{" "}
						and work together, side by side, to tackle it one step
						at a time. Progress is monitored and reviewed regularly,
						so you have a,{" "}
						<span className='font-semibold text-primary'>
							clear sense
						</span>{" "}
						of whether therapy is working.{" "}
					</h3>
				</div>
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
		</>
	);
};

export { ServicesCBTExplained };
