import React from "react";
import TextBox from "../../../layout/containers/TextBox";
import AnimatedSectionTitle from "@/app/components/layout/headers/AnimatedTitle";
import Image from "next/image";

const CBTExplained = () => {
	const cbtExplainedContent = {
		title: "What to	expect from therapy with me",
		topBox: {
			line1: "Initial 20 min no-obligation introduction call",
			line2: "Free of charge"
		},
		therapyWithMe: {
			1: (
				<p>
					I understand finding the right therapist can be tricky, this
					is a chance for us to say hello by phone or video call and
					to have your questions answered and provide the reassurance
					needed to take your{" "}
					<span className='font-normal text-primary'>
						next step forwards
					</span>
				</p>
			),
			2: (
				<p>
					Typically the first steps involve assessing and reviewing
					your mental health — exploring where any problems started
					and why they persist. This builds a foundation to explore
					how you can make{" "}
					<span className='font-semibold text-primary-foreground'>
						lasting changes
					</span>{" "}
					and work together, side by side,{" "}
					<span className='font-medium text-primary'>
						one step at a time
					</span>
					.
				</p>
			),
			3: (
				<p>
					Collaborative “hands-on” therapy. It's not just about
					talking. We share the decision making process to ensure
					you're involved in the{" "}
					<span className='text-primary-foreground font-medium'>
						direction
					</span>{" "}
					of your therapy throughout.
				</p>
			),
			4: (
				<p>
					Progress is monitored and reviewed regularly, so you have a,{" "}
					<span className='font-medium text-primary-foreground'>
						clear sense
					</span>{" "}
					of whether therapy is working. It can be tricky living with
					a human mind — there are no miracle cures or quick fixes. My
					aim is to{" "}
					<span className='font-medium text-primary'>
						instil hope
					</span>{" "}
					and help you{" "}
					<span className='italic font-semibold'>
						Mind How you go
					</span>{" "}
					until you can do it alone.
				</p>
			)
		},
		walkAndTalk: {
			1: "I currently offer one-to-one regular 60-minute video-call sessions, but am aware sitting down for a traditional therapy session is not everyone's cup of tea. A lot of our lives are now online based, so walk and talk therapy is a great option that gets us out in the fresh air and can enhance the therapeutic process.",
			2: "If this sounds appealing further treatment sessions can be “walk and talk” appointments -  with so many lovely green spaces in Bristol, there are many walking routes we can utilise.",
			3: (
				<p>
					Walking and talking for well-being: Exploring the
					effectiveness of walk and talk therapy.{" "}
					<a
						href='https://www.bacp.co.uk/bacp-journals/healthcare-counselling-and-psychotherapy-journal/2024/articles-october/walking-and-talking/'
						className='text-primary hover:text-primary-foreground font-medium'>
						Counselling and Psychotherapy Research
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
