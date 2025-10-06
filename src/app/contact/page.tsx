import type { Metadata } from "next";
import ServicesContactForm from "../components/sections/contact/Services/ServicesContactForm";

export const metadata: Metadata = {
	title: "Contact Us",
	description:
		"Get in touch to book a free introductory call or ask any questions. Reach out via phone, email, or our contact form – we're here to help you take the next step.",
	openGraph: {
		url: "https://www.mindhowyougo.co.uk/contact",
		type: "website",
		title: "Contact Mind How You Go – CBT Therapy in Bristol",
		description:
			"Reach out to schedule a free intro call or ask questions about our CBT services. We're here to help you get started with therapy."
		// images: [{ url: "/og-contact.jpg", width: 1200, height: 630, alt: "Contact Mind How You Go" }],
	},
	alternates: {
		canonical: "https://www.mindhowyougo.co.uk/contact"
	}
};

export default function Contact() {
	return (
		<div className='h-screen w-full overflow-x-hidden overflow-y-auto m-none pr-0 border-0 sm:border-l-[0.5px]'>
			<div className='sticky top-0 flex flex-grow flex-row justify-start items-baseline w-full my-0 sm:pl-8 sm:pr-8 pt-10 pb-4 bg-opacity-100 border-b sm:border-0 z-50'>
				<div className='flex flex-row flex-1 justify-between w-auto'>
					<ServicesContactForm />
				</div>
			</div>
		</div>
	);
}
