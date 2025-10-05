// import Image from "next/image";
// import { createClient } from "@supabase/supabase-js";
// import { useEffect, useState } from "react";
// import AnimatedSectionTitle from "../../layout/headers/AnimatedTitle";

// interface BlogCardProps {
// 	icon: string;
// 	title: string;
// 	description: string;
// }

// interface RecentBlogPostsProps {
// 	id: string;
// }

// const recentBlogPosts = [
// 	{
// 		icon: "/assets/icons/cbt.png",
// 		title: "Blog Example ",
// 		description:
// 			"Praesent eget risus sollicitudin, ullamcorper nunc eu, auctor ligula. Tempus elementum."
// 	},
// 	{
// 		icon: "/assets/icons/wellbeing.png",
// 		title: "Blog Example ",
// 		description:
// 			"Praesent eget risus sollicitudin, ullamcorper nunc eu, auctor ligula. Tempus elementum."
// 	},
// 	{
// 		icon: "/assets/icons/act.png",
// 		title: "Blog Example ",
// 		description:
// 			"Praesent eget risus sollicitudin, ullamcorper nunc eu, auctor ligula. Tempus elementum."
// 	}
// ];

// const RecentBlogPosts = ({ id = "" }: RecentBlogPostsProps): JSX.Element => {
// 	const supabase = createClient(
// 		process.env.SUPABASE_API_URL as string,
// 		process.env.SUPABASE_API_SECRET_ACCESS_TOKEN as string
// 	);

// 	const [blogPosts, setBlogPosts] = useState<BlogCardProps[] | null>(
// 		recentBlogPosts
// 	);

// 	useEffect(() => {
// 		const fetchBlogPosts = async () => {
// 			const { data, error } = await supabase
// 				.from("content_blog_posts")
// 				.select("*");
// 			if (error) {
// 				console.error("Error fetching blog data:", error);
// 			} else {
// 				setBlogPosts(
// 					data.map((item) => ({
// 						icon: item.blog_icon,
// 						title: item.blog_title,
// 						description: item.blog_description
// 					}))
// 				);
// 			}
// 		};
// 		fetchBlogPosts();
// 	}, []);

// 	return (
// 		<div className='w-full py-20'>
// 			<AnimatedSectionTitle title='Recent Blog Posts' />

// 			<div
// 				id='id'
// 				className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-12'>
// 				{blogPosts?.slice(0, 3).map((blog, index) => (
// 					<div
// 						key={index}
// 						className='border border-opacity-60 border-primary rounded-2xl bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 ease-in-out'>
// 						<div className='p-6 flex flex-col items-center text-center'>
// 							<Image
// 								className='rounded-full mb-4'
// 								src={blog.icon}
// 								alt={`${blog.title} icon`}
// 								width={80}
// 								height={80}
// 							/>
// 							<h4 className='text-xl font-semibold text-primary mb-2'>
// 								{blog.title}
// 							</h4>
// 							<p className='text-muted-foreground'>
// 								{blog.description}
// 							</p>
// 						</div>
// 					</div>
// 				))}
// 			</div>
// 		</div>
// 	);
// };

// export default RecentBlogPosts;
