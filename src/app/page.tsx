"use client";
import { useRecoilValue } from "recoil";
import RegisterSeatNumberForm from "./components/register/page";
import MikkokuForm from "./components/mikkokuForm/page";
import { userDataStateAtom } from "./stores/userState";
import SideLogHistory from "./components/SideLogHistory/page";
import AlertModal from "./components/AlertModal/page";

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
				<SideLogHistory>
					<MikkokuForm />
				</SideLogHistory>
				<AlertModal />
			</>
		);
	}
}
