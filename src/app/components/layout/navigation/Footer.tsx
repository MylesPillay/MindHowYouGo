import Link from "next/link";

const Footer = () => {
	const footerLinks = [
		{ name: "Privacy", href: "/privacy" },
		{ name: "Contact", href: "/contact" },
		{ name: "Back to top", href: "/" }
	];

	return (
		<footer className='relative overflow-hidden flex py-4 bg-primary-secondary/80 justify-between items-center align-middle w-full px-6 md:px-20'>
			<nav className='flex flex-row space-x-6 md:space-x-20 justify-center w-full'>
				{footerLinks.map((link, index) => (
					<div key={link.name} className='flex items-center'>
						<Link
							href={link.href}
							className='cursor-pointer text-white hover:text-yellow-400 hover:text-opacity-90 transition-colors duration-300 text-md font-medium'>
							{link.name}
						</Link>
						{index < footerLinks.length - 1 && (
							<span className='ml-20 text-sm text-white/70 mt-1'>
								|
							</span>
						)}
					</div>
				))}
			</nav>
		</footer>
	);
};

export default Footer;
