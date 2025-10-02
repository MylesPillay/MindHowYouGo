import React from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import AnimatedSectionTitle from "../../layout/headers/AnimatedTitle";

const testimonials = [
	{
		name: "",
		text: "Kiran was really friendly, helpful and had definitely changed my perspective. There are two areas that have significantly been helpful, and they are how to respond during panic attacks, and the shift away from reliance in others. I feel I can better manage during a Panic attack. I would rate Kiran 9/10 (wouldn't give anyone 10 as that would be describing them as perfect)."
	},
	{
		name: "",
		text: "Kiran was an incredible help to me, helping me to realise the issues and the problems I have suffered with, whilst also providing tools and methods to use in my day to day life. I threw myself into the therapy headfirst and took on board everything that we spoke about. In every session I had a ‘lightbulb moment’, where I would understand something about myself and be able to recognise how to help overcome it. It’s been a life changing 10 weeks and I can’t hold Kiran in any higher regard. He has helped me no end, and I believe that although it hasn’t always been easy, my life has improved ten fold. I look forward to living my life using these tools that were provided and know that I am still on a journey, but my path seems to be much easier to navigate now. I would like to thank Kiran and talking therapies for all the help I have received so far and I couldn’t recommend CBT more."
	},
	{
		name: "",
		text: "I have been able to deal with issues that I have bottled up over the years. It’s hard to explain in words but I just feel so much lighter and I’m enjoying life again. I have returned to work in a much better mental state, able to deal with any issues now. I still have moments of anxiety but I don't let these build into a mountain of fear that paralyses me. I know how to take time out to recharge and refocus."
	},
	{
		name: "",
		text: "The therapy I received from Kiran has helped me enormously. I have gained more understanding & learnt practical ways to control my emotions with CBT. I am now feeling much more confident in coping with my anxiety. I can’t thank Kiran enough for his support and help over the last few months."
	},
	{
		name: "",
		text: "Kiran was a patient and caring therapist. He was open and approachable at all times, while still maintaining focus in each session. He remembered things I said as far back as our first session and made connections even months later. I feel very lucky to have had him as my therapist, because CBT techniques which I previously only read about online now make more sense and I now believe I can implement them on my own."
	},
	{
		name: "",
		text: "Kiran was one of the only Therapist who actually helped me through with what I was going through. I never thought I would improve this well with my mental health, I honestly regard him highly because of it, his technique and ability to speak to me about my issues was very helpful. Thank you!!"
	}
];

const PatientTestimonials = ({ id }: { id: string }): JSX.Element => {
	return (
		<div className='flex flex-col items-center w-full pt-20 px-4 md:px-16'>
			<AnimatedSectionTitle title='What People Say' className='pl-20' />

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
									<p className='text-primary-secondary text-lg text-center md:text-left pt-4 mb-4 line-clamp-4 p-6'>
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
									<p className='text-primary-secondary text-lg text-center md:text-left mb-4 p-6'>
										{testimonial.text}
									</p>
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
