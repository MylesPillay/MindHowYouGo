import type { Metadata } from "next";

export const metadata: Metadata = {
	metadataBase: new URL("https://www.mindhowyougo.co.uk"),
	title: {
		default: "Mind How You Go",
		template: "%s | Mind How You Go"
	},
	description:
		"Collaborative, hands-on CBT with a BABCP-accredited therapist in Bristol. Free introductory call and regular progress reviews.",
	openGraph: {
		siteName: "Mind How You Go",
		type: "website",
		locale: "en_GB"
	},
	robots: {
		index: true,
		follow: true,
		noarchive: true,
		noimageindex: false,
		nocache: true,
		nosnippet: false,
		googleBot: {
			index: true,
			follow: true,
			"max-image-preview": "large",
			"max-snippet": -1,
			"max-video-preview": -1
		}
	},
	keywords: [
		"CBT",
		"Therapy",
		"Bristol",
		"BABCP accredited",
		"Mental Health"
	],
	icons: {
		icon: "/favicon.ico",
		apple: "/apple-touch-icon.png"
	}
};

export default function RootLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className='flex relative flex-col h-full w-full text-white overflow-x-hidden'>
				<ClientRoot>{children}</ClientRoot>
			</body>
		</html>
	);
}

import ClientRoot from "./components/layout/navigation/ClientRoot";
