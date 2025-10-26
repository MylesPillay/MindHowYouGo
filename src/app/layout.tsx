import "./global.css";
import type { Metadata } from "next";
import walkingData from "../../public/assets/animations/walking.json";
import DesktopNav, {
	NAV_ITEMS
} from "./components/layout/navigation/DesktopMenu";
import Footer from "./components/layout/navigation/Footer";
import ClientRoot from "./components/layout/navigation/ClientRoot";
import { MobileMenu } from "./components/layout/navigation/MobileNav";

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
		icon: "/assets/icons/cbt.png",
		apple: "/assets/icons/cbt.png"
	}
};

export default function RootLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			{/* single body lives here */}
			<body className='flex min-h-screen w-full flex-col text-white overflow-x-hidden'>
				{/* Desktop nav (client component) */}

				{/* ClientRoot provides background scroll effect, mobile menu, and contexts */}
				<ClientRoot>
					<DesktopNav
						items={NAV_ITEMS}
						walkingData={walkingData}
						badgeImageSrc='/assets/images/BABCP-logo.webp'
					/>
					<MobileMenu items={NAV_ITEMS} />
					<div className='border-t-2 border-primary-foreground mt-[1px] w-[120%]' />
					{/* Main page content */}
					<main className='relative w-screen flex-1'>{children}</main>
					{/* Footer inside body, after content */}
					<Footer />
				</ClientRoot>
			</body>
		</html>
	);
}
