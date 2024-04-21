"use client";
import { RecoilRoot } from "recoil";
import Header from "./components/header/page";
import Footer from "./components/footer/page";

import "./globals.css";

// export const metadata: Metadata = {
// 	title: "Create Next App",
// 	description: "Generated by create next app",
// };

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja" data-theme="retro">
			<body>
				<RecoilRoot>
					<Header />
					{children}
					<Footer />
				</RecoilRoot>
			</body>
		</html>
	);
}
