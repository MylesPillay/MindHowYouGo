import { createClient } from "@supabase/supabase-js";

export interface IFormInput {
	contact_name: string;
	contact_email: string;
	contact_phone: string;
	contact_message: string;
}

const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const insertContact = async (formData: IFormInput): Promise<void> => {
	const { error, status } = await supabase.from("contacts").insert([
		{
			contact_name: formData.contact_name,
			contact_email: formData.contact_email,
			contact_phone: formData.contact_phone,
			contact_message: formData.contact_message
		}
	]);

	if (error) {
		console.error(
			"Error inserting contact:",
			error.message,
			"Status:",
			status
		);
		throw error;
	}
};
