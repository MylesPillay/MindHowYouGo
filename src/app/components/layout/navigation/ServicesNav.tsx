"use client";

import React from "react";

export type PaneTab = { id: string; title: string };

type ServicesNavProps = {
	panes: readonly PaneTab[];
	activeId: string;
	onSelect: (id: string) => void;
	onKeyDownTabs: (e: React.KeyboardEvent) => void;
};

const ServicesNav: React.FC<ServicesNavProps> = ({
	panes,
	activeId,
	onSelect,
	onKeyDownTabs
}) => {
	return (
		<nav
			// className='sticky mt-[3.5px] z-40 bg-primary supports-[backdrop-filter]'
			className='sticky mt-[3.5px] border-solid border-y-2 border-primary-secondary/70 z-40 supports-[backdrop-filter]	bg-gradient-to-r from-primary to-yellow-100 bg-opacity-50'
			role='tablist'
			aria-label='Services sections'
			onKeyDown={onKeyDownTabs}>
			<div className='mx-auto flex flex-wrap items-center justify-center gap-2 md:gap-6 pt-2 pb-4'>
				{panes.map((p) => {
					const isActive = activeId === p.id;
					return (
						<button
							key={p.id}
							role='tab'
							id={`tab-${p.id}`}
							aria-controls={`pane-${p.id}`}
							aria-selected={isActive}
							tabIndex={isActive ? 0 : -1}
							onClick={() => onSelect(p.id)}
							className={[
								"group relative select-none rounded-md transition-all duration-200 ease-out",
								"focus:outline-none focus:ring-2 focus:ring-white/70",
								"px-3 md:px-4 py-1.5 md:py-2",
								// Typography
								isActive
									? "text-white font-semibold text-lg tracking-wide drop-shadow"
									: "text-white/85 font-normal text-lg tracking-wide hover:text-white"
							].join(" ")}>
							<span className='whitespace-nowrap'>{p.title}</span>

							{/* underline / indicator */}
							<span
								aria-hidden='true'
								className={[
									"pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-1",
									"h-1 rounded-full bg-white transition-all duration-200",
									isActive
										? "w-3/4 opacity-100"
										: "w-0 opacity-60 group-hover:w-1/2"
								].join(" ")}
							/>
						</button>
					);
				})}
			</div>
		</nav>
	);
};

export default ServicesNav;
