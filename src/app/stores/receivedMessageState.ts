import { atom } from "recoil";

export type ResponseAtomType = {
	message: string;
	timestamp: string;
};

export const responseAtom = atom<ResponseAtomType[]>({
	key: "recievedMessage",
	default: [],
});

export const limitTimeAtom = atom<number | undefined>({
	key: "limitTime",
	default: undefined,
});
