"use client";
import { userDataStateAtom } from "@/app/stores/userState";
import { connectWebsocket, websocketAtom } from "@/app/stores/websocketStates";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilCallback, useRecoilState, useRecoilValue } from "recoil";

type SeatNumberType = {
	seatNumber: string;
};

const serverUrl = "http://localhost:8080/";

const RegisterSeatNumberForm = () => {
	const [_, setUserState] = useRecoilState(userDataStateAtom);
	const websocket = useRecoilValue(websocketAtom);
	const updateWebsocket = useRecoilCallback(
		({ set }) =>
			(data: WebSocket | undefined) => {
				set(websocketAtom, data);
			},
	);
	const [errorMessage, setErrorMessage] = useState<string | undefined>(
		undefined,
	);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SeatNumberType>();
	const submitHandler = handleSubmit(async (formData: SeatNumberType) => {
		console.log("FormData: ", formData.seatNumber);
		updateWebsocket(await connectWebsocket(formData.seatNumber));
		setUserState(formData.seatNumber);
	});
	return (
		<>
			<div className="artboard phone-3">
				{errorMessage === undefined ? undefined : (
					<div role="alert" className="alert alert-error">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="stroke-current shrink-0 h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<span>{errorMessage}</span>
					</div>
				)}
				<label className="form-control w-full max-w-xm">
					<div className="label mb-5">
						<span className="label-text text-2xl">
							座席番号を入力してください。
						</span>
					</div>
					<div className="flex">
						<div>
							<input
								type="text"
								placeholder="Seat Number"
								className="input input-bordered w-full max-w-xs"
								{...register("seatNumber")}
							/>
						</div>
						<div className="ms-2">
							<button
								className="btn btn-outline btn-success"
								onClick={submitHandler}
							>
								送信
							</button>
						</div>
					</div>
				</label>
			</div>
		</>
	);
};

export default RegisterSeatNumberForm;
