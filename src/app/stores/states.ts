import { atom, selector } from "recoil";

export const userDataState = atom({
	key: "SeatNumber",
	default: "",
});

export const getUserDataState = selector({
	key: "getUserData",
	get: ({ get }) => {
		const userData = get(userDataState);
		return userData;
	},
});

export const webSocketState = atom({
	key: "websocketConnection",
	default: null as unknown as WebSocket,
});

export const getWebSocketState = selector({
	key: "getWebSocketState",
	get: ({ get }) => {
		const webSocket = get(webSocketState);
		return webSocket;
	},
});
