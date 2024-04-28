"use client";
import { useRecoilValue, useRecoilState } from "recoil";
import RegisterSeatNumberForm from "./components/register/page";
import MikkokuForm from "./components/mikkokuForm/page";
import { userDataStateAtom } from "./stores/userState";

export default function Home() {
	const seatNumberData = useRecoilValue(userDataStateAtom);

	if (seatNumberData === "") {
		return (
			<>
				<div className="flex flex-col items-center pt-5">
					<RegisterSeatNumberForm />
				</div>
			</>
		);
	} else {
		return (
			<>
				<div className="flex flex-col items-center pt-5">
					<MikkokuForm />
				</div>
			</>
		);
	}
}
