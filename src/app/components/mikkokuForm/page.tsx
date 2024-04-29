"use client";
import { redirect } from "next/navigation";
import { useRecoilValue } from "recoil";
import {
	useSendAlert,
	useSendTimeup,
	SendAlertType,
	SendTimeUpType,
} from "@/app/hooks/useMikkoku";
import { useRecievedMessage } from "@/app/hooks/useRecieve";
import { userDataStateAtom } from "@/app/stores/userState";
// import AlertComponent from "../AlertComponent/page";

const MikkokuForm = () => {
	const seatNumberData = useRecoilValue(userDataStateAtom);
	if (seatNumberData === "") return redirect("/");
	const { input, setInput, send } = useSendAlert();
	const { isTimeup, setIsTimeup, sendTimeup } = useSendTimeup();
    const { message, limitTime } = useRecievedMessage();
	return (
		<>
			<div></div>
			<div className="items-center text-3xl mb-3">
				<p>座席番号：{seatNumberData} さん。ようこそ！</p>
			</div>
			<div className="artboard phone-2">
				<label className="form-control w-full max-w-xm mb-5">
					<div className="label mb-5">
						<span className="label-text text-2xl">
							<p>どの席を密告しますか？</p>
							<p>(席番号を入力して下さい。)</p>
						</span>
					</div>
					<div className="flex">
						<div>
							<input
								type="text"
								placeholder="Target Seat Number"
								className="input input-bordered w-full max-w-xs"
								onBlur={(event) => {
									setInput(event.target.value);
								}}
							/>
						</div>
						<div className="ms-2">
							<button
								className="btn btn-outline btn-error"
								onClick={() => send()}
							>
								密告
							</button>
						</div>
					</div>
				</label>
			</div>
		</>
	);
};

export default MikkokuForm;
