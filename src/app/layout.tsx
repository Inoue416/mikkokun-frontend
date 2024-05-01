"use client";
import { RecoilRoot } from "recoil";
import Header from "./components/Header/page";
import Footer from "./components/Footer/page";
import "./globals.css";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja" data-theme="retro">
			<head>
				<title>*** Mikkokun ***</title>
			</head>
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
