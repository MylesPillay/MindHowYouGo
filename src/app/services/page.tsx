// src/app/services/page.tsx
import type { Metadata } from "next";
import ServicesPageClient from "./client/ServicesPageClient";

export const metadata: Metadata = {
	title: "Our CBT Therapy Services",
	description:
		"Explore our range of cognitive behavioural therapy services. Learn how CBT works, review our clinical experience, and find out how to start therapy with a free introductory call.",
	openGraph: {
		url: "https://www.mindhowyougo.co.uk/services",
		type: "website",
		title: "Therapy Services | Mind How You Go",
		description:
			"Learn about our CBT therapy offerings in Bristol, including how cognitive behavioural therapy is applied, our clinical experience, and what to expect from our services."
	},
	alternates: {
		canonical: "https://www.mindhowyougo.co.uk/services"
	}
};

export default function ServicesPage() {
	return <ServicesPageClient />;
}
