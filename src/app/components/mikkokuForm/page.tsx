"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { useRecoilValue, useRecoilState } from "recoil";
import { userDataState, webSocketState } from "@/app/stores/states";

type FormDataType = {
	targetSeatNumber: string;
};

type WebSocketRequestType = {
	ActionType: "broadcast" | "alert";
	SeatNumber: string;
};

const MikkokuForm = () => {
	const seatNumberData = useRecoilValue(userDataState);
	if (seatNumberData === "") return redirect("/");
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormDataType>();
	// const socketState = useRecoilValue(webSocketState);
	const wsUrl = "ws:localhost:8080/ws" + "?seatnumber=" + seatNumberData;
	const ws = new WebSocket(wsUrl);

	useEffect(() => {
		ws.onopen = (response) => {
			console.log("*** Connected to server ***");
			console.log(response);
		};
	}, []);
	// useEffect(() => {
	// 	const wsUrl =
	// 		"ws:localhost:8080/ws" +
	// 		"?seatnumber=" +
	// 		seatNumberData;
	//     if(!socketState) return;
	// 	const ws = new WebSocket(wsUrl);
	// 	setSocketState(ws);
	// 	ws.onopen = () => {
	// 		console.log("Connected to server");
	// 	};
	// }, []);
	const submitHandler = handleSubmit((formData: FormDataType) => {
		const request: WebSocketRequestType = {
			ActionType: "alert",
			SeatNumber: formData.targetSeatNumber,
		};
		console.log("Request: ", JSON.stringify(request));

		ws.send(JSON.stringify(request) ?? "");
	});
	return (
		<>
			<div className="items-center text-3xl mb-3">
				<p>座席番号：{seatNumberData} さん。ようこそ！</p>
			</div>
			<div className="artboard phone-2">
				<label className="form-control w-full max-w-xm">
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
								{...register("targetSeatNumber")}
							/>
						</div>
						<div className="ms-2">
							<button
								className="btn btn-outline btn-error"
								onClick={submitHandler}
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
