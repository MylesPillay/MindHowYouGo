export const dynamic = "force-dynamic";
export const revalidate = 0;
import Link from "next/link";

export default function NotFound() {
	return (
		<main style={{ padding: "4rem 1rem", textAlign: "center" }}>
			<div className='h-screen w-full overflow-x-hidden overflow-y-auto m-none pr-0 border-0 sm:border-l-[0.5px]'>
				<h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
					Page not found
				</h1>
				<p style={{ opacity: 0.8, marginBottom: "1rem" }}>
					The page you’re looking for doesn’t exist.
				</p>
				<Link href='/'>Return to Homepage</Link>
			</div>
		</main>
	);
}
