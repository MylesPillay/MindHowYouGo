"use client";

import React from "react";
import dynamic from "next/dynamic";
import MobileWhyChooseMe from "@/app/components/sections/why-me/MobileWhyChooseMe";
import MobileCBTExplained from "@/app/components/sections/cbt-explained/Home/MobileCBTExplained";
import BottomCTASection from "../components/BottomCTASection/BottomCTASection";
import MobileClinicalExperience from "@/app/components/sections/experience/Home/MobileClinicalExperience";

// If your testimonial mobile component exists and you want it on this screen too,
// just uncomment the next line and the section below.
// import MobilePatientTestimonials from "@/app/components/home/MobilePatientTestimonials";

const MobileHomeSingleScroll = (): JSX.Element => {
	return (
		<main
			className={[
				"w-[120%] -ml-12 min-h-[100dvh] bg-background",
				"flex flex-col items-center",
				"pt-16 pb-16"
			].join(" ")}
			aria-label='Mind How You Go — Mobile Home'>
			{/* SERVICES / CBT TREATMENT */}
			<section
				id='services'
				className='w-full max-w-md pt-6 justify-center mx-auto'>
				<MobileWhyChooseMe abridged={true} />
				<div className='mt-6'>
					<MobileCBTExplained abridged={true} />
				</div>
				<div className='mt-8'>
					<BottomCTASection />
				</div>
			</section>

			{/* DIVIDER */}
			<hr className='my-10 w-full max-w-md border-t border-primary/20' />

			{/* CLINICAL EXPERIENCE */}
			<section id='experience' className='w-full max-w-md mx-auto'>
				<MobileClinicalExperience />
				<div className='mt-8'>
					<BottomCTASection />
				</div>
			</section>

			{/* OPTIONAL: TESTIMONIALS (uncomment imports + block if desired) */}
			{/*
      <hr className="my-10 w-full max-w-md border-t border-primary/20" />
      <section id="testimonials" className="w-full max-w-md mx-auto">
        <MobilePatientTestimonials id="testimonies" />
      </section>
      */}
		</main>
	);
};

// Keep client-only behavior consistent with your other mobile files
export default dynamic(() => Promise.resolve(MobileHomeSingleScroll), {
	ssr: false
});
