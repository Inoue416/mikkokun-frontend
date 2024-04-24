"use client";
import { useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import RegisterSeatNumberForm from "./components/register/page";
import MikkokuForm from "./components/mikkokuForm/page";
import { userDataState, webSocketState } from "./stores/websocketStates";

export default function Home() {
	const seatNumberData = useRecoilValue(userDataState);
	// const [socketState, setSocketState] = useRecoilState(webSocketState);
	// useEffect(() => {
	// 	const wsUrl =
	// 		"ws:localhost:8080/ws" +
	// 		"?seatnumber=" +
	// 		seatNumberData;
	//     if(socketState) return;
	// 	const ws = new WebSocket(wsUrl);
	// 	setSocketState(ws);
	// }, []);

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
