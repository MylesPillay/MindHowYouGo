// src/app/page.tsx
import { HeroSection } from "./components/sections/hero/HeroSection";
import ContactForm from "./components/sections/contact/Home/ContactForm";
import PatientTestimonials from "./components/sections/testimonies/PatientTestimonies";
import { AboutMe } from "./components/sections/about-me/AboutMe";
import { CBTExplained } from "./components/sections/cbt-explained/Home/CBTExplained";
import { WhyChooseMe } from "./components/sections/why-me/WhyChooseMe";
import { ClinicalExperience } from "./components/sections/experience/Home/ClinicalExperience";
import AnimatedSectionTitle from "./components/layout/headers/AnimatedTitle";
import SectionTitleClear from "./components/layout/headers/SectionTitleClear";

import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "CBT Therapy in Bristol | BABCP-Accredited | Free Intro Call",
	description:
		"Collaborative, hands-on CBT with a BABCP-accredited therapist. Free introductory call. Video or walk-and-talk sessions in Bristol's green spaces. Progress reviewed regularly.",
	keywords: [
		"CBT Bristol",
		"cognitive behavioural therapy",
		"BABCP accredited",
		"anxiety therapy",
		"depression therapy",
		"walk and talk therapy Bristol",
		"online therapy UK"
	],
	openGraph: {
		url: "https://www.mindhowyougo.co.uk/",
		type: "website",
		title: "CBT Therapy in Bristol | BABCP-Accredited | Free Intro Call",
		description:
			"Evidence-based CBT with monitored progress. Options for online video sessions or walk-and-talk therapy across Bristol. Confidential, ethical care (BABCP code)."
		// images: [{ url: "/og-home.jpg", width: 1200, height: 630, alt: "Mind How You Go - CBT in Bristol" }],
	},
	alternates: {
		canonical: "https://www.mindhowyougo.co.uk/"
	}
};

export default async function Home() {
	return (
		<div className='flex flex-col justify-between w-[100%] overflow-x-hidden'>
			<HeroSection />
			<AboutMe id='about-me' />
			<div className='my-2 md:my-8' />
			<SectionTitleClear title={`What can I expect from therapy?`} />
			<CBTExplained />
			<div className='my-2 md:my-8' />
			<WhyChooseMe />
			<div className='my-2 md:my-8' />
			<AnimatedSectionTitle title={`Services offered`} />
			<ClinicalExperience />
			<div className='my-2 md:my-8' />
			<PatientTestimonials id='testimonies' />
			<ContactForm id='contact' />
			{/* <RecentBlogPosts id='blog' /> */}
			<div className='my-20' />
		</div>
	);
}
