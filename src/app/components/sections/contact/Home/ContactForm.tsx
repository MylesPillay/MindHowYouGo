"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "../../../layout/buttons/Button";
import { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "../../../../../../database.types";
import AnimatedSectionTitle from "../../../layout/headers/AnimatedTitle";

interface IFormInput {
	contact_name: string;
	contact_email: string;
	contact_phone: string;
	contact_message: string;
}

type Contact = Database["public"]["Tables"]["contacts"]["Row"];

const ContactForm = ({ id }: { id: string }): JSX.Element => {
	// ✅ Browser Supabase client (anon/public)
	const supabase = useMemo(
		() =>
			createClient(
				process.env.NEXT_PUBLIC_SUPABASE_URL!,
				process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
			),
		[]
	);

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

	// ----- Data helpers -----
	const insertContact = async (
		formData: IFormInput
	): Promise<Contact | null> => {
		const { data, error, status } = await supabase
			.from("contacts")
			.insert([
				{
					contact_name: formData.contact_name,
					contact_email: formData.contact_email,
					contact_phone: formData.contact_phone,
					contact_message: formData.contact_message
				}
			])
			.select()
			.single();

		if (error) {
			console.error(
				"Error inserting contact:",
				error.message,
				"Status:",
				status
			);
			throw error;
		}
		return data ?? null;
	};

	const createCalendarEvent = async (payload: Contact) => {
		try {
			const edgeUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/createCalendarEntry`;
			const response = await fetch(edgeUrl, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					// anon key is correct for calling your public Edge Function
					Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
				},
				body: JSON.stringify({
					type: "INSERT",
					table: "contacts",
					record: payload
				})
			});

			if (!response.ok)
				throw new Error(`Edge function failed: ${response.status}`);
			const data = await response.json();
			console.log("Calendar event created:", data);
		} catch (err) {
			console.error("Error creating calendar event:", err);
		}
	};

	// ----- Submit handler -----
	const onSubmit: SubmitHandler<IFormInput> = async (formData) => {
		setSubmissionStatus(null);
		setStatusMsg("");
		try {
			const inserted = await insertContact(formData);

			if (inserted) {
				setSubmissionStatus("success");
				setStatusMsg(
					"Thanks! I’ve received your message and will get back to you soon."
				);
				reset();
			} else {
				setSubmissionStatus("no_data");
				setStatusMsg(
					"Submitted, but no data was returned. I’ll double-check on my side."
				);
			}
		} catch (err) {
			setSubmissionStatus("error");
			setStatusMsg(
				"Something went wrong sending your message. Please try again."
			);
		}
	};

	// ----- Realtime: react to inserts (optional) -----
	useEffect(() => {
		const channel = supabase
			.channel("contacts-inserts")
			.on(
				"postgres_changes",
				{ event: "INSERT", schema: "public", table: "contacts" },
				(payload) => {
					// payload.new is the new row
					createCalendarEvent(payload.new as Contact);
				}
			)
			.subscribe();

		return () => {
			supabase.removeChannel(channel);
		};
	}, [supabase]);

	// ----- IDs for a11y -----
	const nameId = "contact_name";
	const phoneId = "contact_phone";
	const emailId = "contact_email";
	const msgId = "contact_message";
	const statusId = "form-status";

	return (
		<div className='flex flex-col items-center w-full py-20 px-4 md:px-16'>
			<AnimatedSectionTitle title='Get In Touch' />
			<p
				id={statusId}
				role='status'
				aria-live='polite'
				className={`mt-4 text-center text-base ${
					submissionStatus === "success"
						? "text-green-700"
						: submissionStatus === "error"
						? "text-red-700"
						: "text-primary-secondary"
				}`}>
				{statusMsg}
			</p>

			<form
				className='flex flex-col justify-center w-[70%] my-20'
				onSubmit={handleSubmit(onSubmit)}
				aria-describedby={statusId}>
				{/* Name + Phone */}
				<div
					className='flex flex-col md:flex-row w-full md:space-x-4 mb-6'
					id={id}>
					{/* Name */}
					<div className='flex flex-col w-full md:w-1/2'>
						<label
							htmlFor={nameId}
							className='text-2xl font-normal text-primary-foreground my-4'>
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
								errors.contact_name
									? `${nameId}-error`
									: undefined
							}
							className='p-3 bg-white border-2 border-opacity-55 border-primary rounded-lg text-primary-secondary placeholder-muted-foreground text-lg'
							placeholder='Enter your name'
							autoComplete='name'
							inputMode='text'
						/>
						{errors.contact_name && (
							<span
								id={`${nameId}-error`}
								className='text-red-600 text-sm mt-2 ml-1'>
								{errors.contact_name.message}
							</span>
						)}
					</div>

					{/* Phone */}
					<div className='flex flex-col w-full md:w-1/2 mt-6 md:mt-0'>
						<label
							htmlFor={phoneId}
							className='text-2xl font-normal text-primary-foreground my-4'>
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
							className='p-3 bg-white border-2 border-opacity-55 border-primary rounded-lg text-primary-secondary placeholder-muted-foreground text-lg'
							placeholder='Enter your phone number'
							autoComplete='tel'
							inputMode='tel'
						/>
						{errors.contact_phone && (
							<span
								id={`${phoneId}-error`}
								className='text-red-600 text-sm mt-2 ml-1'>
								{errors.contact_phone.message}
							</span>
						)}
					</div>
				</div>

				{/* Email */}
				<div className='flex flex-col w-full mb-6'>
					<label
						htmlFor={emailId}
						className='text-2xl font-normal text-primary-foreground my-4'>
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
						className='p-3 bg-white border-2 border-opacity-55 border-primary rounded-lg text-primary-secondary placeholder-muted-foreground text-lg'
						placeholder='Enter your email address'
						autoComplete='email'
						inputMode='email'
					/>
					{errors.contact_email && (
						<span
							id={`${emailId}-error`}
							className='text-red-600 text-sm mt-2 ml-1'>
							{errors.contact_email.message}
						</span>
					)}
				</div>

				{/* Message */}
				<div className='flex flex-col w-full mb-2'>
					<label
						htmlFor={msgId}
						className='text-2xl font-normal text-primary-foreground my-4'>
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
						className='p-3 bg-white border-2 border-opacity-55 border-primary rounded-lg text-primary-secondary placeholder-muted-foreground min-h-[150px] text-lg'
						placeholder='Please describe your reason for contacting us'
					/>
					{errors.contact_message && (
						<span
							id={`${msgId}-error`}
							className='text-red-600 text-sm mt-2 ml-1'>
							{errors.contact_message.message}
						</span>
					)}
				</div>

				{/* Submit */}
				<div className='flex w-full h-full justify-end my-6 items-center text-lg'>
					<Button
						variant='default'
						type='submit'
						disabled={!isValid || isSubmitting}
						aria-disabled={!isValid || isSubmitting}>
						{isSubmitting ? "Sending…" : "Book an Intro Call"}
					</Button>
				</div>

				{/* Success pill */}
				{submissionStatus === "success" && (
					<button
						type='button'
						onClick={() => {
							setSubmissionStatus(null);
							setStatusMsg("");
						}}
						className='self-end text-white text-center text-lg p-4 border-primary-foreground/50 bg-primary rounded-full border-4 w-auto'
						aria-label='Dismiss success message'>
						Form submitted successfully!
					</button>
				)}
			</form>
		</div>
	);
};

export default ContactForm;
