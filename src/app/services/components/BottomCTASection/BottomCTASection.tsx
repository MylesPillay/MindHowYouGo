import TextBox from "@/app/components/layout/containers/TextBox";
import Link from "next/link";

const BottomCTASection = () => {
	return (
		<>
			<div className='flex flex-col items-center justify-center px-4 mt-16'>
				<TextBox
					className='text-center mx-auto'
					heading='Not sure where to start? Begin with a free 20-minute introduction call and we’ll work out the best path forward together.'
				/>
				<Link href={"/contact"} className='mt-4'>
					<button className='px-6 py-3 text-xl font-medium text-white rounded-full bg-gradient-to-r from-primary/60 to-primary-secondary transition-all duration-500 ease-in-out shadow-md hover:shadow-lg hover:brightness-110 hover:scale-105 hover:to-primary-foreground hover:from-primary'>
						Get In Touch
					</button>
				</Link>
			</div>

			<div className='mt-6 text-center'>
				<Link
					href='#'
					className='text-md text-primary underline-offset-4 hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded'>
					Back to top
				</Link>
			</div>
		</>
	);
};

export default BottomCTASection;
