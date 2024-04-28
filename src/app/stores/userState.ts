import { atom } from "recoil";

export const userDataStateAtom = atom<string>({
	key: "userDataStateAtom",
	default: "",
});
