"use client";
import { useRecoilValue } from "recoil";
import RegisterSeatNumberForm from "./components/register/page";
import MikkokuForm from "./components/mikkokuForm/page";
import { userDataState } from "./stores/state";

export default function Home() {
	const seatNumberData = useRecoilValue(userDataState);
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
