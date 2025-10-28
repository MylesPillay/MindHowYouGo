"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "../../../layout/buttons/Button";
import React, { useEffect, useRef, useState } from "react";
import SectionTitleClear from "../../../layout/headers/SectionTitleClear";
import { useInsertContact, IFormInput } from "./hooks/useInsertContact";

const MobileContactForm = ({ id }: { id: string }): JSX.Element => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid, isSubmitting },
		trigger
	} = useForm<IFormInput>({ mode: "onChange" });

	const [submissionStatus, setSubmissionStatus] = useState<
		"success" | "error" | "no_data" | null
	>(null);
	const [statusMsg, setStatusMsg] = useState<string>("");

	const insertContact = useInsertContact();

	const onSubmit: SubmitHandler<IFormInput> = async (formData) => {
		setSubmissionStatus(null);
		setStatusMsg("");
		try {
			await insertContact(formData);
			setSubmissionStatus("success");
			setStatusMsg(
				"Thanks! I've received your message and will get back to you soon."
			);
			reset();
		} catch {
			setSubmissionStatus("error");
			setStatusMsg(
				"Something went wrong sending your message. Please try again."
			);
		}
	};

	// Reduced motion + gentle fade-in when the title row enters center band
	const prefersReduced =
		typeof window !== "undefined" &&
		window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	const titleWrapRef = useRef<HTMLDivElement | null>(null);
	const [fadeIn, setFadeIn] = useState(prefersReduced);

	useEffect(() => {
		if (prefersReduced) return setFadeIn(true);
		const el = titleWrapRef.current;
		if (!el) return;

		const obs = new IntersectionObserver(
			(entries) => {
				if (entries.some((e) => e.isIntersecting)) {
					setFadeIn(true);
					obs.disconnect();
				}
			},
			{ root: null, rootMargin: "-50% 0px -50% 0px", threshold: 0 }
		);

		obs.observe(el);
		return () => obs.disconnect();
	}, [prefersReduced]);

	const nameId = "contact_name";
	const phoneId = "contact_phone";
	const emailId = "contact_email";
	const msgId = "contact_message";
	const statusId = "form-status";

	return (
		<section
			id={id}
			className='w-full flex flex-col items-center pt-16 pb-10 px-4'>
			{/* Title */}
			<div ref={titleWrapRef} className='w-full max-w-md -ml-8'>
				<SectionTitleClear title='Get In Touch' />
			</div>

			{/* Status line (polite live region) */}
			<p
				id={statusId}
				role='status'
				aria-live='polite'
				className={[
					"mt-3 text-center text-sm",
					submissionStatus === "success"
						? "text-green-700"
						: submissionStatus === "error"
						? "text-red-700"
						: "text-primary-secondary/90",
					prefersReduced
						? "opacity-100"
						: fadeIn
						? "opacity-100"
						: "opacity-0",
					"transition-opacity duration-700"
				].join(" ")}>
				{statusMsg}
			</p>

			{/* Form */}
			<form
				className={[
					"mt-8 w-full max-w-sm",
					prefersReduced
						? "opacity-100 translate-y-0"
						: fadeIn
						? "opacity-100 translate-y-0"
						: "opacity-0 translate-y-2",
					"transition-all duration-700 ease-out"
				].join(" ")}
				onSubmit={handleSubmit(onSubmit)}
				aria-describedby={statusId}>
				{/* Name */}
				<div className='mb-5'>
					<label
						htmlFor={nameId}
						className='block text-base font-medium text-primary-foreground mb-2'>
						First and Last Name
					</label>
					<input
						id={nameId}
						type='text'
						{...register("contact_name", {
							required: "Name is required"
						})}
						onBlur={() => trigger("contact_name")}
						aria-invalid={!!errors.contact_name || undefined}
						aria-describedby={
							errors.contact_name ? `${nameId}-error` : undefined
						}
						className={[
							"w-full rounded-lg border-2 p-3 text-[16px]",
							"bg-white border-primary/60 text-primary-secondary placeholder-muted-foreground",
							"focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary"
						].join(" ")}
						placeholder='Enter your full name'
						autoComplete='name'
						inputMode='text'
					/>
					{errors.contact_name && (
						<span
							id={`${nameId}-error`}
							className='text-red-600 text-xs mt-1 ml-1 block'>
							{errors.contact_name.message}
						</span>
					)}
				</div>

				{/* Phone */}
				<div className='mb-5'>
					<label
						htmlFor={phoneId}
						className='block text-base font-medium text-primary-foreground mb-2'>
						Phone Number
					</label>
					<input
						id={phoneId}
						type='tel'
						{...register("contact_phone", {
							required: "Phone number is required",
							pattern: {
								value: /^[+()0-9\s-]{7,}$/,
								message: "Please enter a valid phone number"
							}
						})}
						onBlur={() => trigger("contact_phone")}
						aria-invalid={!!errors.contact_phone || undefined}
						aria-describedby={
							errors.contact_phone
								? `${phoneId}-error`
								: undefined
						}
						className={[
							"w-full rounded-lg border-2 p-3 text-[16px]",
							"bg-white border-primary/60 text-primary-secondary placeholder-muted-foreground",
							"focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary"
						].join(" ")}
						placeholder='Enter your phone number'
						autoComplete='tel'
						inputMode='tel'
					/>
					{errors.contact_phone && (
						<span
							id={`${phoneId}-error`}
							className='text-red-600 text-xs mt-1 ml-1 block'>
							{errors.contact_phone.message}
						</span>
					)}
				</div>

				{/* Email */}
				<div className='mb-5'>
					<label
						htmlFor={emailId}
						className='block text-base font-medium text-primary-foreground mb-2'>
						Email Address
					</label>
					<input
						id={emailId}
						type='email'
						{...register("contact_email", {
							required: "Email is required",
							pattern: {
								value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
								message: "Invalid email address"
							}
						})}
						onBlur={() => trigger("contact_email")}
						aria-invalid={!!errors.contact_email || undefined}
						aria-describedby={
							errors.contact_email
								? `${emailId}-error`
								: undefined
						}
						className={[
							"w-full rounded-lg border-2 p-3 text-[16px]",
							"bg-white border-primary/60 text-primary-secondary placeholder-muted-foreground",
							"focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary"
						].join(" ")}
						placeholder='Enter your email address'
						autoComplete='email'
						inputMode='email'
					/>
					{errors.contact_email && (
						<span
							id={`${emailId}-error`}
							className='text-red-600 text-xs mt-1 ml-1 block'>
							{errors.contact_email.message}
						</span>
					)}
				</div>

				{/* Message */}
				<div className='mb-2'>
					<label
						htmlFor={msgId}
						className='block text-base font-medium text-primary-foreground mb-2'>
						How can I help?
					</label>
					<textarea
						id={msgId}
						{...register("contact_message", {
							required: "Message is required"
						})}
						onBlur={() => trigger("contact_message")}
						aria-invalid={!!errors.contact_message || undefined}
						aria-describedby={
							errors.contact_message
								? `${msgId}-error`
								: undefined
						}
						className={[
							"w-full rounded-lg border-2 p-3 text-[16px] min-h-[140px]",
							"bg-white border-primary/60 text-primary-secondary placeholder-muted-foreground",
							"focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary"
						].join(" ")}
						placeholder='A brief outline of what you’d like support with'
					/>
					{errors.contact_message && (
						<span
							id={`${msgId}-error`}
							className='text-red-600 text-xs mt-1 ml-1 block'>
							{errors.contact_message.message}
						</span>
					)}
				</div>

				{/* Submit */}
				<div className='flex w-full justify-end items-center mt-6'>
					<Button
						variant='default'
						type='submit'
						disabled={!isValid || isSubmitting}
						aria-disabled={!isValid || isSubmitting}
						className={[
							"rounded-full px-6 py-3 text-base",
							"transition-all duration-300",
							!isValid || isSubmitting
								? "opacity-60"
								: "hover:brightness-110 active:scale-[0.98]"
						].join(" ")}>
						{isSubmitting ? "Sending…" : "Book an Intro Call"}
					</Button>
				</div>

				{/* Success pill (dismissible) */}
				{submissionStatus === "success" && (
					<button
						type='button'
						onClick={() => {
							setSubmissionStatus(null);
							setStatusMsg("");
						}}
						className={[
							"self-end mt-6 rounded-full border-4 border-primary-foreground/40 bg-primary text-white",
							"px-5 py-3 text-sm font-medium shadow-sm",
							"transition-all duration-300 hover:brightness-110 active:scale-[0.98]"
						].join(" ")}
						aria-label='Dismiss success message'>
						Form submitted successfully!
					</button>
				)}
			</form>
		</section>
	);
};

export default MobileContactForm;
