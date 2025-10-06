import type { Metadata } from "next";
import ServicesPageClient from "./client/ServicesPageClient";

export const metadata: Metadata = {
	title: "Our CBT Therapy Services",
	description:
		"Explore my range of cognitive behavioural therapy services. Learn how CBT works, review my clinical experience, and find out how to start therapy with a free introductory call.",
	openGraph: {
		url: "https://www.mindhowyougo.co.uk/services",
		type: "website",
		title: "Therapy Services | Mind How You Go",
		description:
			"Learn about my CBT therapy services in Bristol, including how cognitive behavioural therapy is applied, our clinical experience, and what to expect from your treatment."
	},
	alternates: {
		canonical: "https://www.mindhowyougo.co.uk/services"
	}
};

export default function ServicesPage() {
	return <ServicesPageClient />;
}
