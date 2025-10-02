import * as React from "react";
import "../../../../../src/app/global.css";
interface VariantStyles {
	[key: string]: string;
}

interface SizeStyles {
	[key: string]: string;
}
function buttonClassNames(variant?: string, size?: string, className?: string) {
	const baseStyles =
		"items-center justify-center whitespace-nowrap text-nowrap focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 text-center";

	const variantStyles: VariantStyles = {
		default:
			"px-6 py-2 rounded-lg h-full !bg-primary-foreground !bg-opacity-85 hover:!bg-opacity-100 border-primary !border-opacity-55 border-2 text-lg font-normal text-white disabled:bg-primary-foreground disabled:bg-opacity-25 disabled:text-zinc-600",
		destructive:
			"bg-destructive text-destructive-foreground hover:bg-destructive/90",
		outline:
			"border border-input bg-background hover:bg-accent hover:text-accent-foreground",
		secondary: "items-center  hover:bg-secondary/80",
		ghost: "hover:bg-none hover:none  hover:text-primary-accent",
		link: "text-primary underline-offset-4 hover:underline",
		chevron:
			"bg-transparent hover:bg-transparent text-primary-foreground rounded-full text-[4rem] p-2 m-6 items-center justify-center text-no-highlight"
	};

	const sizeStyles: SizeStyles = {
		default: "h-10 px-4 py-2",
		sm: "h-9 rounded-md px-3",
		lg: "h-11 rounded-md px-8",
		icon: "h-10 w-10"
	};

	return `${baseStyles} ${
		variantStyles[variant as string] || variantStyles.default
	} ${sizeStyles[size as string] || sizeStyles.default}
 ${className ?? ""}`;
}
export interface ButtonProps {
	className?: string;
	variant?:
		| "default"
		| "destructive"
		| "outline"
		| "secondary"
		| "ghost"
		| "link"
		| "chevron";
	type?: "button" | "submit" | "reset";
	size?: string;
	children?: React.ReactNode;
	disabled?: boolean;
	onClick?: () => void;
}

const Button = ({
	className,
	variant,
	size,
	type = "button",
	disabled,
	children,

	onClick
}: ButtonProps) => {
	return (
		<button
			className={buttonClassNames(variant, size, className)}
			onClick={onClick}
			disabled={disabled}
			type={type}>
			{children}
		</button>
	);
};

Button.displayName = "Button";

export { Button };
