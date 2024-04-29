import { useEffect } from "react";
import { useTimer } from "@/app/hooks/useTimer";
import { useRecoilValue, useRecoilCallback } from "recoil";
import { limitTimeAtom } from "@/app/stores/receivedMessageState";
import { useSendTimeup } from "@/app/hooks/useMikkoku";

const Timer = () => {
	const { timer, updateTimer } = useTimer();
	const limitTimeSec = useRecoilValue(limitTimeAtom);
	const { sendTimeup } = useSendTimeup();
	const updateLimitTime = useRecoilCallback(
		({ set }) =>
			(data: number | undefined) => {
				set(limitTimeAtom, data);
			},
	);
	useEffect(() => {
		if (timer === undefined) {
			updateTimer(limitTimeSec);
			return;
		}
		const id = setInterval(() => {
			if (timer - 1 === 0) {
				updateTimer(undefined);
				updateLimitTime(undefined);
				sendTimeup();
				return () => clearInterval(id);
			}
			updateTimer(timer === undefined ? 0 : timer - 1);
		}, 1000);
		return () => clearInterval(id);
	}, []);
	if (limitTimeSec === undefined) return <></>;

	return (
		<>
			<p className="text-3xl">{timer} [s]</p>
		</>
	);
};

export default Timer;
