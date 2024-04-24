import { atom } from "recoil";

export const responseAtom = atom<string>({
	key: "recievedMessage",
	default: "",
});

export const limitTimeAtom = atom<number | undefined>({
	key: "limitTime",
	default: undefined,
});
