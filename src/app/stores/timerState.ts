import { atom } from "recoil";

export const timerAtom = atom<number | undefined>({
	key: "timerState",
	default: undefined,
});
