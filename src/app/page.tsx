"use client";
import { useRecoilValue } from "recoil";
import RegisterSeatNumberForm from "./components/register/page";
import { userDataState, getUserDataState } from "./stores/state";
// import { useForm, SubmitHandler } from "react-hook-form";

type FormData = {
	chatData: string;
};

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
				<div className="text-5xl">Hello World!</div>
			</>
		);
	}
}
