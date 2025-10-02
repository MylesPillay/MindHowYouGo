import Image from "next/image";

interface TableColumnCellProps {
	heading?: string;
	headingSize?: string;
	className?: string;
	children?: React.ReactNode;
	icon?: string;
	active?: boolean;
	index: number;
	rowCount: number;
}

const TableColumnCell = ({
	heading = "",
	headingSize = "text-xl",
	children,
	className,
	icon,
	active,
	index,
	rowCount
}: TableColumnCellProps) => {
	return (
		<div
			key={`container_tableColumnCell-${heading}`}
			className={`flex flex-wrap my-0 w-full max-w-[335px] justify-start bg-none border-opacity-55 p-[2px] h-auto flex-shrink ${
				active ? "border-primary-foreground" : "border-primary"
			} ${
				index === 0
					? "rounded-tl-md"
					: index === index - 1
					? "rounded-bl-md"
					: "rounded-none"
			}
${index === 0 ? "border-t-2 rounded-tl-md" : "border-t-0"}
${index === rowCount - 1 ? "border-b-2 rounded-bl-md" : "border-b-0"}
border-l-2 border-r-2
${active ? "border-primary-foreground" : "border-primary"}`}>
			<div
				className={`bg-none flex flex-shrink border-2 p-[1px] h-auto w-full border-opacity-55 ${
					active ? "border-primary-foreground" : "border-primary"
				} ${
					index === 0
						? "rounded-tl-md"
						: index === rowCount - 1
						? "rounded-bl-md"
						: "rounded-none"
				} `}>
				<div
					className={`flex flex-col justify-between w-full flex-wrap border-2 rounded-lg p-3
					 bg-opacity-85  ${!active ? "bg-none" : "bg-zinc-100"}`}>
					<div
						className={`flex flex-row items-center justify-between w-full ${className}`}>
						{icon ? (
							<Image
								src={`/assets/icons/${icon}.png`}
								alt={icon}
								width={40}
								height={40}
								className={`
          ${active ? "mr-5" : "mr-4"}
         transition-all duration-300 ${
				active ? "opacity-100 scale-110" : "opacity-60"
			}`}
							/>
						) : null}
						{heading ? (
							<h4
								className={`font-medium text-primary ${
									headingSize
										? `${headingSize} text-nowrap`
										: "text-xl mb-2"
								}`}>
								{heading}
							</h4>
						) : null}

						{children}
					</div>
				</div>
			</div>
		</div>
	);
};

export default TableColumnCell;
