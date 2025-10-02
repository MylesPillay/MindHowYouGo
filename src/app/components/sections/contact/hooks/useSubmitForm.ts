// import { supabase } from "@/utils/supabase";

import { supabase } from "@/utils/api/supabase";
import { createClient } from "@supabase/supabase-js";



export const useInsertContact = () => {
	const insertContact = async (
		name: string,
		email: string,
		number: string,
		message: string
	) => {
		try {
			console.log("firing insertContact from inside useHook form file ");
			// const { data, error } = await supabase
			// 	.from("contacts")
			// 	.insert([{  contact_name: name, contact_email: email, contact_number: number, contact_message: message }]);
						const { data, error } = await supabase
  .from("contacts")
  .select("*")
  .order("created_at", { ascending: false })
  .limit(1)
  .single();

			if (error) {
				console.error("Error inserting contact:", error.message);
				throw new Error(error.message);
			}
			console.log(
				data,
				"data from insertContact inside useHook form file"
			);
			return data;
		} catch (err) {
			console.error("Insert contact error:", err);
			throw err;
		}
	};

	return { insertContact };
};
