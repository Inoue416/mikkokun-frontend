"use client";
import { useRecoilValue } from "recoil";
import AlertModal from "./components/AlertModal/page";
import MikkokuForm from "./components/MikkokuForm/page";
import RegisterSeatNumberForm from "./components/Register/page";
import SideLogHistory from "./components/SideLogHistory/page";
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
				<SideLogHistory>
					<MikkokuForm />
				</SideLogHistory>
				<AlertModal />
			</>
		);
	}
}
