import { useRecoilCallback, useRecoilValue } from "recoil";
import { timerAtom } from "../stores/timerState";

export const useTimer = () => {
	const timer = useRecoilValue(timerAtom);
	const updateTimer = useRecoilCallback(
		({ set }) =>
			(data: number | undefined) => {
				set(timerAtom, data);
			},
	);

	return { timer, updateTimer };
};
