"use client";
import { useRecoilValue, useRecoilState } from "recoil";
import RegisterSeatNumberForm from "./components/register/page";
import MikkokuForm from "./components/mikkokuForm/page";
import { userDataStateAtom } from "./stores/userState";
import SideLogHistory from "./components/SideLogHistory/page";

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
				{/* <div className="flex flex-col items-center pt-5"> */}
				<SideLogHistory>
					<MikkokuForm />
				</SideLogHistory>
				{/* </div> */}
			</>
		);
	}
}
