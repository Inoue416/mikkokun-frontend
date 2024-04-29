"use client";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { userDataStateAtom } from "@/app/stores/userState";
import { responseAtom } from "@/app/stores/receivedMessageState";

const Header = () => {
	const [userState, setUserState] = useRecoilState(userDataStateAtom);
	const [_, setMessageArray] = useRecoilState(responseAtom);
	const logoutHandler = () => {
		setUserState("");
		setMessageArray([]);
	};
	return (
		<div className="navbar bg-base-300">
			<div className="navbar-start">
				<div className="dropdown">
					<div
						tabIndex={0}
						role="button"
						className="btn btn-ghost btn-circle"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h16M4 18h7"
							/>
						</svg>
					</div>
					<ul
						tabIndex={0}
						className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
					>
						<li>
							<Link href={"/"}>Home</Link>
						</li>
						<li>
							<Link href={"/"}>ToDo: About</Link>
						</li>
						{userState === "" ? (
							<></>
						) : (
							<li>
								<Link href={"/"} onClick={logoutHandler}>
									Logout
								</Link>
							</li>
						)}
					</ul>
				</div>
			</div>
			<div className="navbar-center">
				<a className="btn btn-ghost text-xl">密っこくん</a>
			</div>
			<div className="navbar-end">
				<button className="btn btn-ghost btn-circle">
					<div className="indicator">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
							/>
						</svg>
						{/* TODO: サーバーからの通知でこの部分をオンにする処理を処理を入れる */}
						{/* <span className="badge badge-xs badge-primary indicator-item"></span> */}
					</div>
				</button>
			</div>
		</div>
	);
};

export default Header;
