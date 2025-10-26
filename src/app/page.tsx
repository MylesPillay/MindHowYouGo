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
import { MobileHeroSection } from "./components/sections/hero/MobileHeroSection";
import { MobileAboutMe } from "./components/sections/about-me/MobileAboutMe";
import { MobileCBTExplained } from "./components/sections/cbt-explained/Home/MobileCBTExplained";
import MobileWhyChooseMe from "./components/sections/why-me/MobileWhyChooseMe";
import MobileClinicalExperience from "./components/sections/experience/Home/MobileClinicalExperience";
import MobilePatientTestimonials from "./components/sections/testimonies/MobilePatientTestimonies";
import MobileContactForm from "./components/sections/contact/Home/ContactForm";

export const metadata: Metadata = {
	title: "Mind How You Go | CBT Therapy with Dr Kiran Sharma.",
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
	},
	alternates: {
		canonical: "https://www.mindhowyougo.co.uk/"
	}
};

export default async function Home() {
	return (
		<div className='flex flex-col justify-between w-[100%] overflow-x-hidden'>
			<div className='sm:flex hidden'>
				<HeroSection />
			</div>
			<div className='sm:hidden flex'>
				<MobileHeroSection />
			</div>
			<div className='sm:flex hidden'>
				<AboutMe id='about-me' />
			</div>
			<div className='sm:hidden flex'>
				<MobileAboutMe id='about-me' />
			</div>
			{/* <div className='my-2 md:my-8' /> */}
			<div className='sm:flex flex-col hidden'>
				<SectionTitleClear title={`What can I expect from therapy?`} />
				<CBTExplained />
			</div>
			<div className='sm:hidden flex'>
				<MobileCBTExplained />
			</div>
			{/* <div className='my-2 md:my-8' /> */}
			<div className='sm:flex flex-col hidden'>
				<WhyChooseMe />
			</div>
			<div className='sm:hidden flex'>
				<MobileWhyChooseMe />
			</div>

			{/* <div className='my-2 md:my-8' /> */}
			<div className='sm:flex flex-col hidden'>
				<AnimatedSectionTitle title={`Services offered`} />
				<ClinicalExperience />
			</div>
			<div className='sm:hidden flex'>
				<MobileClinicalExperience />
			</div>
			{/* <div className='my-2 md:my-8' /> */}
			<div className='sm:flex flex-col hidden'>
				<PatientTestimonials id='testimonies' />
			</div>
			<div className='sm:hidden flex'>
				<MobilePatientTestimonials id='testimonies' />
			</div>
			<div className='sm:flex hidden'>
				<ContactForm id='contact' />
			</div>
			<div className='sm:hidden flex'>
				<MobileContactForm id='contact' />
			</div>
			{/* <RecentBlogPosts id='blog' /> */}
			<div className='my-20' />
		</div>
	);
}
