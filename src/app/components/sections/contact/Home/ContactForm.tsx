"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "../../../layout/buttons/Button";
import { useState } from "react";
import AnimatedSectionTitle from "../../../layout/headers/AnimatedTitle";
import { useInsertContact, IFormInput } from "./hooks/useInsertContact";

const ContactForm = ({ id }: { id: string }): JSX.Element => {
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
		} catch (err) {
			setSubmissionStatus("error");
			setStatusMsg(
				"Something went wrong sending your message. Please try again."
			);
		}
	};

	const nameId = "contact_name";
	const phoneId = "contact_phone";
	const emailId = "contact_email";
	const msgId = "contact_message";
	const statusId = "form-status";

	return (
		<div className='flex flex-col items-center w-full pt-8 px-4 md:px-16'>
			<AnimatedSectionTitle
				title='Get In Touch'
				className='pl-6'
				mobileScreen
			/>

			<form
				className='flex flex-col justify-center w-[85%] mt-10'
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
							className='text-xl font-normal text-primary-foreground my-4'>
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
							className='p-3 bg-white border-2 border-opacity-55 border-primary rounded-lg text-primary-secondary placeholder-muted-foreground text-md'
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
							className='text-xl font-normal text-primary-foreground my-4'>
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
							className='p-3 bg-white border-2 border-opacity-55 border-primary rounded-lg text-primary-secondary placeholder-muted-foreground text-md'
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
						className='text-xl font-normal text-primary-foreground my-4'>
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
						className='p-3 bg-white border-2 border-opacity-55 border-primary rounded-lg text-primary-secondary placeholder-muted-foreground text-md'
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
						className='text-xl font-normal text-primary-foreground my-4'>
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
						className='p-3 bg-white border-2 border-opacity-55 border-primary rounded-lg text-primary-secondary placeholder-muted-foreground min-h-[150px] text-md'
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
				<div className='flex w-full h-full justify-end my-6 items-center text-md'>
					<Button
						variant='default'
						type='submit'
						disabled={!isValid || isSubmitting}
						aria-disabled={!isValid || isSubmitting}>
						{isSubmitting ? "Sending…" : "Book an Intro Call"}
					</Button>
				</div>

				<p
					id={statusId}
					role='status'
					aria-live='polite'
					className={`my-4 text-center text-base ${
						submissionStatus === "success"
							? "text-green-700"
							: submissionStatus === "error"
							? "text-red-700"
							: "text-primary-secondary"
					}`}>
					{statusMsg}
				</p>

				{/* Success pill */}
				{submissionStatus === "success" && (
					<button
						type='button'
						onClick={() => {
							setSubmissionStatus(null);
							setStatusMsg("");
						}}
						className='self-end text-white text-center text-lg p-4  mt-6 border-primary-foreground/50 bg-primary rounded-full border-4 w-auto'
						aria-label='Dismiss success message'>
						Form submitted successfully!
					</button>
				)}
			</form>
		</div>
	);
};

export default ContactForm;
