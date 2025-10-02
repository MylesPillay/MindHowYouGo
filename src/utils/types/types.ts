export type NavItem = { href: string; label: string };

// INTRO HERO SECTION BLOCK

export interface IntroBlockProps {
	leftChild: {
		startText?: string;
		nameAnimated?: string;
		secondText?: string;
		professionAnimated?: string;
		thirdText?: string;
	};
	rightChild: {
		loading: boolean;
		image?: string | Blob | MediaSource;
		header?: string;
		text?: string;
	};
}

// PATIENT TESTIMONIALS BLOCK

export interface TestimonialBlockProps {
	isExpandedTestimonials: boolean;
	setIsExpandedTestimonials: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface  TestimonialData {
	testimony_name: string;
	testimony_description: string;
	testimony_heading: string;
	linked_therapy: string;
	date: string;
}

export interface Testimonial {
	patientName: string;
	description: string;
	therapy: string;
	icon: string;
	date: string;
};


export interface TestimonialCardProps {
	patientName?: string;
	description?: string;
	service?: string;
	icon: string;
	date?: string;
	isExpanded?: boolean;
	isHovered?: boolean;
}

