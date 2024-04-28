import { websocketAtom } from "../stores/websocketStates";
import { useRecoilCallback, useRecoilValue } from "recoil";
import { responseAtom, limitTimeAtom } from "../stores/receivedMessageState";

// TODO: 次はWebSocketの独立した管理の作成
export type RecievedMessageType = {
	type: string;
	message: string;
};

const TIMELIMIT = 300; // [s]

export const useRecievedMessage = () => {
	const socket = useRecoilValue(websocketAtom);
	const message = useRecoilValue(responseAtom);
	const limitTime = useRecoilValue(limitTimeAtom);
	const updateMessage = useRecoilCallback(({ set }) => (data: string) => {
		set(responseAtom, data);
	});
	const updateLimitTime = useRecoilCallback(({ set }) => (data: number) => {
		set(limitTimeAtom, data);
	});
	socket.onmessage = (msg) => {
		console.log("--- On Message ---")
		const content: RecievedMessageType = JSON.parse(msg.data);
		if (content.type === "alert") {
			updateLimitTime(TIMELIMIT);
			updateMessage(content.message);
			return;
		}
		updateMessage(content.message);
		console.log("Message: ", content.message);
		console.log("-----------------\n")
	};
	return { message, limitTime };
};
