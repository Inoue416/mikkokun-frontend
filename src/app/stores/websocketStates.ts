import { atom, selector } from "recoil";

const connect = (): Promise<WebSocket> => {
	return new Promise((resolve, reject) => {
		const socket = new WebSocket("ws://localhost:80/ws");
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
