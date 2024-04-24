import { useCallback, useState } from "react";
import { websocketAtom } from "../stores/websocketStates";
import { useRecoilValue } from "recoil";

export type SendAlertType = {
	targetseatnumber: string;
};

export type SendTimeUpType = {
	message: "timeup";
};

export const useSendAlert = () => {
	const socket = useRecoilValue(websocketAtom);
	const [input, setInput] = useState<string>("");

	const send = useCallback(() => {
		if (input.length === 0) return;
		socket.send(JSON.stringify({ targetseatnumber: input }));
		setInput("");
	}, [input]);

	return { input, setInput, send };
};

export const useSendTimeup = () => {
	const socket = useRecoilValue(websocketAtom);
	const [isTimeup, setIsTimeup] = useState<boolean>(false);
	const send = useCallback(() => {
		if (!isTimeup) return;
		socket.send(JSON.stringify({ message: "timeup" }));
		setIsTimeup(false);
	}, [isTimeup]);

	return { isTimeup, setIsTimeup, send };
};
