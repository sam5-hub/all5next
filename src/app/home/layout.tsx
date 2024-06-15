import Navbar from "@/components/global/navbar";
import Footer from "@/components/home/footer";
import React, { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<div className="p-24 flex flex-col gap-4">
			<Navbar />
			{children}
			<Footer />
		</div>
	);
}
