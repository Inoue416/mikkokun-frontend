import { atom, selector, useRecoilValue } from "recoil";
import { userDataStateAtom } from "./userState";

const WEBSOCKETURL = "ws://localhost:8080/ws";

const connect = (userSeatNumber: string): Promise<WebSocket | undefined> => {
	return new Promise((resolve, reject) => {
		if (userSeatNumber === "") resolve(undefined);
		const socket = new WebSocket(
			WEBSOCKETURL + "?seatnumber=" + userSeatNumber,
		);
		socket.onopen = () => {
			console.log("connected");
			resolve(socket);
		};
		socket.onclose = () => {
			console.log("reconnecting...");
			connect(userSeatNumber);
		};
		socket.onerror = (err) => {
			console.log("connection error:", err);
			reject(err);
		};
	});
};

// const connectWebsocketSelector = selector({
// 	key: "connectWebsocket",
// 	get: async ({get}): Promise<WebSocket> => {
// 		const userSeatNumber = get(userDataStateAtom);
// 		return await connect(userSeatNumber);
// 	},
// });
export const connectWebsocket = async (
	userSeatNumber: string,
): Promise<WebSocket | undefined> => {
	return await connect(userSeatNumber);
};

export const websocketAtom = atom<WebSocket | undefined>({
	key: "websocket",
	default: undefined,
});
