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
				<Link href={"/contact"} className='mt-20'>
					<button className='px-8 py-4 ml-1 text-xl font-medium text-white rounded-full bg-gradient-to-r from-primary/60 to-primary-secondary transition-all duration-500 ease-in-out shadow-md hover:shadow-lg hover:brightness-110 hover:scale-105 hover:to-primary-foreground hover:from-primary border-2 border-opacity-100 border-yellow-400'>
						Get In Touch
					</button>
				</Link>
			</div>
		</>
	);
};

export default BottomCTASection;
