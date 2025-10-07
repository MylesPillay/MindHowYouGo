import Image from "next/image";

interface TextBoxProps {
	variant?:
		| "light"
		| "light-long"
		| "dark"
		| "border"
		| "border-long"
		| "active"
		| "border-active";
	text?: string;
	textSize?: string;
	heading?: string;
	headingSize?: string;
	className?: string;
	children?: React.ReactNode;
	icon?: string;
}

const TextBox = ({
	variant = "light",
	text,
	textSize = "text-lg",
	heading = "",
	headingSize = "text-xl",
	children,
	className,
	icon
}: TextBoxProps) => {
	const isLightVariant =
		variant.includes("light") ||
		(variant.includes("border") && variant !== "border-active");

	const isBorderVariant = variant.includes("border");

	const containerWidth = variant.includes("long")
		? "md:max-w-[85vw] max-w-[95%]"
		: "md:max-w-[45vw] max-w-[95%]";

	return (
		<div
			key={`container_textBox-${heading}`}
			className={`
				flex flex-col border-2 rounded-xl p-[2px] my-6
				${isLightVariant ? "border-primary-foreground" : "border-primary"}
				${containerWidth} ${className}
			`}>
			<div
				className={`
					rounded-xl p-[1px] w-full border-opacity-55
					${isLightVariant ? "border-primary-foreground" : "border-primary"}
				`}>
				<div
					className={`
						flex flex-col ${icon || heading ? "p-4" : "px-6 py-3"}
						${isBorderVariant && variant !== "border-active" ? "" : "bg-white"}
						rounded-lg border-2 border-opacity-55
						${isLightVariant ? "border-primary-foreground" : "border-primary"}
						${variant === "dark" ? "bg-zinc-100" : ""}
					`}>
					{(icon || heading) && (
						<div className='flex flex-row items-center justify-between w-full mb-2'>
							{icon && (
								<Image
									src={`/assets/icons/${icon}.png`}
									alt={icon}
									width={40}
									height={40}
									className={`mr-4 transition-all duration-300 ${
										variant.includes("active")
											? "opacity-100 scale-110"
											: "opacity-60"
									}`}
								/>
							)}
							{heading && (
								<h3
									className={`font-light text-primary-secondary ${headingSize}`}>
									{heading}
								</h3>
							)}
						</div>
					)}
					{/* Render either children or text if passed */}
					{children ||
						(text && (
							<p
								className={`font-light ${textSize} text-primary-secondary p-6`}>
								{text}
							</p>
						))}
				</div>
			</div>
		</div>
	);
};

export default TextBox;
