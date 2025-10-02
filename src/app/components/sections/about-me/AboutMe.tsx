import React from "react";
import Image from "next/image";
import TextBox from "../../layout/containers/TextBox";
import SectionTitleClear from "../../layout/headers/SectionTitleClear";

const AboutMe = ({ id }: { id: string }) => {
	const aboutMeContent = {
		title: "About Me",
		intro: "Hi, I'm Kiran",
		body: "For 10 years I've worked within the NHS as a CBT therapist and trainee supervisor. 'Mind How You Go' is my private practice founded with the aim to  deliver quality care outside of NHS constraints. As a BABCP-accredited CBT therapist I offer practical, down-to-earth therapy focused on lasting change.",
		closing: (
			<p>
				Click{" "}
				<a
					aria-label="text hyperlink navigating to 'Services' Page."
					className='text-semibold text-primary'
					href='/services'>
					HERE
				</a>{" "}
				for more information regarding your journey with therapy, as
				well as details on all services I currently provide.
			</p>
		)
	};

	return (
		<>
			<div
				id={id}
				className='flex flex-col w-full h-auto pb-20 justify-evenly align-middle items-center mx-auto'>
				<SectionTitleClear title={aboutMeContent.title} />
				<div className='flex flex-row w-[100%] h-auto justify-evenly align-middle items-center pt-20'>
					<div className='flex flex-col w-auto'>
						<h1 className='flex w-full justify-center   text-primary-foreground lg:text-6xl mb-8 font-light'>
							{aboutMeContent.intro}
						</h1>
						<TextBox
							text={aboutMeContent.body}
							variant='light'
							textSize='text-2xl'
						/>
					</div>
					<div className='w-80 h-80 rounded-full overflow-hidden relative flex items-center align-self-start justify-center mt-16 -ml-16'>
						<Image
							src='/assets/images/Kiran.png'
							alt='companyLogo'
							fill
							className='object-fill scale-125 rounded-full'
						/>
					</div>
				</div>
				<h3 className='flex text-center w-[55%] mt-20 p-2 text-slate-600  text-2xl font-light self-center'>
					{aboutMeContent.closing}
				</h3>
			</div>
		</>
	);
};

export { AboutMe };
