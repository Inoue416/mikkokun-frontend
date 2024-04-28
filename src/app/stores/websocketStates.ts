import { atom, selector, useRecoilValue } from "recoil";
import { userDataStateAtom } from "./userState";

const WEBSOCKETURL = "ws://localhost:8080/ws";

const connect = (): Promise<WebSocket> => {
	return new Promise((resolve, reject) => {
		const userSeatNumber = useRecoilValue(userDataStateAtom);
		const socket = new WebSocket(
			WEBSOCKETURL + "?seatnumber=" + userSeatNumber,
		);
		socket.onopen = () => {
			console.log("connected");
			resolve(socket);
		};
		socket.onclose = () => {
			console.log("reconnecting...");
			connect();
		};
		socket.onerror = (err) => {
			console.log("connection error:", err);
			reject(err);
		};
	});
};

const connectWebsocketSelector = selector({
	key: "connectWebsocket",
	get: async (): Promise<WebSocket> => {
		return await connect();
	},
});

export const websocketAtom = atom<WebSocket>({
	key: "websocket",
	default: connectWebsocketSelector,
});
