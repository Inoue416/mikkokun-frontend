import { useCallback, useState } from "react";
import { websocketAtom } from "../stores/websocketStates";
import { useRecoilValue } from "recoil";
import { userDataStateAtom } from "../stores/userState";

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
		socket.send(
			JSON.stringify({
				ActionType: "broadcast", // TODO: test
				TargetSeatNumber: input,
			}),
		);
		setInput("");
	}, [input]);

	return { input, setInput, send };
};

export const useSendTimeup = () => {
	const socket = useRecoilValue(websocketAtom);
	const [isTimeup, setIsTimeup] = useState<boolean>(false);
	const targetSeatNumber = useRecoilValue(userDataStateAtom);
	const sendTimeup = useCallback(() => {
		if (!isTimeup) return;
		socket.send(
			JSON.stringify({
				ActionType: "timeup",
				TargetSeatNumber: targetSeatNumber,
			}),
		);
		setIsTimeup(false);
	}, [isTimeup]);

	return { isTimeup, setIsTimeup, sendTimeup };
};
