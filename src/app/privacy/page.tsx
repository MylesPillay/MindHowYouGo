// src/app/privacy/page.tsx
"use client";

import { LoadingBlock } from "../components/layout/loading/LoadingBlock";
import { getSupabaseServer } from "@/utils/api/supabase";
import React, { useEffect, useState } from "react";
import {
	PrivacyContent,
	PrivacyNotice
} from "../components/sections/privacy/PrivacyContent";

export default function PrivacyPage() {
	const [content, setContent] = useState<PrivacyContent | null>(null);
	const [loading, setLoading] = useState(true);
	const [fadeIn, setFadeIn] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			const supabase = getSupabaseServer();
			const { data, error } = await supabase
				.from("content_privacy_notice")
				.select("*");
			if (error) console.error("Privacy notice fetch error:", error);
			setContent((data?.[0]?.privacy_notice as PrivacyContent) ?? null);
			setLoading(false);
		};
		fetchData();
	}, []);

	useEffect(() => {
		if (!loading) {
			const t = setTimeout(() => setFadeIn(true), 50);
			return () => clearTimeout(t);
		}
	}, [loading]);

	if (loading || !content) return <LoadingBlock />;

	return (
		<div
			className={[
				"flex flex-col overflow-x-hidden w-screen",
				fadeIn
					? "opacity-100 translate-y-0"
					: "opacity-0 translate-y-2",
				"transition-all duration-500 ease-out"
			].join(" ")}>
			<PrivacyNotice content={content} />
		</div>
	);
}
