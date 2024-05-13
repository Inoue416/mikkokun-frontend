import { useCallback, useState } from "react";
import { useRecoilValue } from "recoil";
import { userDataStateAtom } from "../stores/userState";
import { websocketAtom } from "../stores/websocketStates";

export type SendAlertType = {
	type: "alert";
	targetSeatNumber: string;
};

export type SendTimeUpType = {
	type: "timeup";
	targetSeatNumber: string;
};

export const useSendAlert = () => {
	const socket = useRecoilValue(websocketAtom);
	const [input, setInput] = useState<string>("");

	const send = useCallback(() => {
		if (input.length === 0) return;
		socket?.send(
			JSON.stringify({
				ActionType: "alert", // TODO: test
				TargetSeatNumber: input,
			}),
		);
		setInput("");
	}, [input]);

	return { input, setInput, send };
};

export const useSendTimeup = () => {
	const socket = useRecoilValue(websocketAtom);
	const targetSeatNumber = useRecoilValue(userDataStateAtom);
	const sendTimeup = useCallback(() => {
		socket?.send(
			JSON.stringify({
				ActionType: "timeup",
				TargetSeatNumber: targetSeatNumber,
			}),
		);
	}, []);

	return { sendTimeup };
};
