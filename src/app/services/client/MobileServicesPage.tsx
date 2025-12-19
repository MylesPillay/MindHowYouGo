"use client";

import React from "react";
import MobileWhyChooseMe from "@/app/components/sections/why-me/MobileWhyChooseMe";
import MobileCBTExplained from "@/app/components/sections/cbt-explained/Home/MobileCBTExplained";
import BottomCTASection from "../components/BottomCTASection/BottomCTASection";
import MobileClinicalExperience from "@/app/components/sections/experience/Home/MobileClinicalExperience";

// If your testimonial mobile component exists and you want it on this screen too,
// just uncomment the next line and the section below.
// import MobilePatientTestimonials from "@/app/components/home/MobilePatientTestimonials";

const MobileServicesSingleScroll = (): JSX.Element => {
	return (
		<main
			className={[
				"w-full min-h-[100dvh] bg-background",
				"flex flex-col items-center",
				"pt-16 pb-16"
			].join(" ")}
			aria-label='Mind How You Go — Mobile Home'>
			{/* SERVICES / CBT TREATMENT */}
			<section
				id='services'
				className='w-full pt-6 justify-center mx-auto'>
				<MobileWhyChooseMe abridged />
				<div className='flex'>
					<MobileCBTExplained abridged />
				</div>

				{/* DIVIDER */}
				<hr className='my-10 w-full max-w-md border-t border-primary/20' />

				<MobileClinicalExperience />
				<div className='mt-8'>
					<BottomCTASection />
				</div>
			</section>
		</main>
	);
};

export default MobileServicesSingleScroll;
export { MobileServicesSingleScroll };
