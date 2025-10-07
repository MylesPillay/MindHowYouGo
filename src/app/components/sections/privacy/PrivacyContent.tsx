import React from "react";

export type Block =
	| { type: "heading"; level: 1 | 2 | 3; id?: string; text: string }
	| { type: "subheading"; style?: "muted" | "default"; text: string }
	| { type: "paragraph"; text: string }
	| { type: "list"; ordered?: boolean; items: string[] };

export type PrivacyContent = {
	title?: string;
	effectiveDate?: string;
	blocks: Block[];
};

type Props = { content: PrivacyContent; className?: string };

const H = ({
	level,
	id,
	children
}: {
	level: 1 | 2 | 3;
	id?: string;
	children: React.ReactNode;
}) => {
	const Tag = (["h1", "h2", "h3"] as const)[level - 1];
	const cls =
		level === 1
			? "text-3xl md:text-4xl font-semibold text-primary text-left"
			: level === 2
			? "text-1xl md:text-2xl font-light text-primary-secondary mt-12  text-left"
			: "text-xl md:text-1xl font-light text-primary-secondary mt-8  text-left";

	return (
		<Tag id={id} className={`${cls} scroll-mt-24`}>
			{children}
		</Tag>
	);
};

const Subheading = ({
	style = "default",
	children
}: {
	style?: "muted" | "default";
	children: React.ReactNode;
}) => (
	<p
		className={`mt-3 text-left  ${
			style === "muted"
				? "font-medium text-muted-foreground"
				: "font-normal text-primary-secondary"
		}`}>
		{children}
	</p>
);

const P = ({ children }: { children: React.ReactNode }) => (
	<p className='mt-6 text-primary-secondary text-sm font-light text-left '>
		{children}
	</p>
);

const ListBlock = ({
	ordered,
	items
}: {
	ordered?: boolean;
	items: string[];
}) => {
	const Wrapper = (ordered ? "ol" : "ul") as "ol" | "ul";
	const base = ordered ? "list-decimal" : "list-disc";
	return (
		<Wrapper
			className={`mt-6 ${base} text-primary-secondary text-md font-light space-y-2 pl-6`}>
			{items.map((it, i) => (
				<li key={i}>{it}</li>
			))}
		</Wrapper>
	);
};

export const PrivacyNotice: React.FC<Props> = ({ content, className }) => {
	const { title, effectiveDate, blocks } = content;
	const effectiveStr =
		effectiveDate && new Date(effectiveDate).toString() !== "Invalid Date"
			? new Date(effectiveDate).toLocaleDateString("en-GB", {
					day: "numeric",
					month: "long",
					year: "numeric"
			  })
			: effectiveDate;

	return (
		<section
			className={[
				"flex flex-col w-[75%] justify-start",
				"pt-20 pb-16",
				"px-4 sm:px-6 lg:px-8", // responsive page padding
				className ?? ""
			].join(" ")}>
			{/* Main content container */}
			{title ? <H level={1}>{title}</H> : null}
			{effectiveStr ? (
				<Subheading style='muted'>
					Effective date: {effectiveStr}
				</Subheading>
			) : null}
			{/* Accent rule */}
			<div className='w-full border-t border-primary-foreground/60 mt-6' />
			{blocks.map((block, i) => {
				switch (block.type) {
					case "heading":
						return (
							<H key={`h-${i}`} level={block.level} id={block.id}>
								{block.text}
							</H>
						);
					case "subheading":
						return (
							<Subheading key={`sh-${i}`} style={block.style}>
								{block.text}
							</Subheading>
						);
					case "paragraph":
						return <P key={`p-${i}`}>{block.text}</P>;
					case "list":
						return (
							<ListBlock
								key={`l-${i}`}
								ordered={block.ordered}
								items={block.items}
							/>
						);
					default:
						return null;
				}
			})}
		</section>
	);
};
