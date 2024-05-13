import { useRecoilCallback, useRecoilValue } from "recoil";
import {
	type ResponseAtomType,
	limitTimeAtom,
	responseAtom,
} from "../stores/receivedMessageState";
import { websocketAtom } from "../stores/websocketStates";
import { useTimer } from "./useTimer";

export const useRecievedMessage = () => {
	const socket = useRecoilValue(websocketAtom);
	const messageArray = useRecoilValue(responseAtom);
	const limitTime = useRecoilValue(limitTimeAtom);
	const { timer, updateTimer } = useTimer();
	const updateMessage = useRecoilCallback(
		({ set }) =>
			(data: ResponseAtomType[]) => {
				set(responseAtom, data);
			},
	);
	const updateLimitTime = useRecoilCallback(({ set }) => (data: number) => {
		set(limitTimeAtom, data);
	});
	if (socket !== undefined) {
		socket.onmessage = (msg) => {
			const content = JSON.parse(msg.data);
			if (content.ActionType === "alert") {
				console.log("Alert!!!!!");
				const timelimit = content.TimeLimitSec as number;
				console.log("timelimit: ", timelimit);
				updateLimitTime(timelimit);
				updateTimer(timelimit);
			}
			const timestamp = new Date();
			updateMessage(
				messageArray.concat({
					message: content.Message,
					timestamp: timestamp.toLocaleString(),
				}),
			);
		};
	}
	return { messageArray, limitTime, timer };
};
