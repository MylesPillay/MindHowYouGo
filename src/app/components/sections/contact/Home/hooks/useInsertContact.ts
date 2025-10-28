"use client";
import { useCallback } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
export interface IFormInput {
	contact_name: string;
	contact_email: string;
	contact_phone: string;
	contact_message: string;
}

export const useInsertContact = () => {
	const supabase = useSupabaseClient();
return useCallback(
    async (formData: IFormInput): Promise<void> => {
      const { error, status } = await supabase.from("contacts").insert([
        {
          contact_name: formData.contact_name.trim(),
          contact_email: formData.contact_email.trim(),
          contact_phone: formData.contact_phone.trim(),
          contact_message: formData.contact_message.trim(),
        },
      ]);

      if (error) {
        console.error("Error inserting contact:", error.message, "Status:", status);
        throw error;
      }
    },
    [supabase]
  );
};