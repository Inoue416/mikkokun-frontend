import { useEffect, useRef } from "react";
import { useRecoilValue, useRecoilCallback } from "recoil";
import { limitTimeAtom } from "@/app/stores/receivedMessageState";
import { timerAtom } from "@/app/stores/timerState";
import Timer from "../Timer/page";
const AlertModal = () => {
	const limitTimeSec = useRecoilValue(limitTimeAtom);
	const timerState = useRecoilValue(timerAtom);
	const updateLimitTime = useRecoilCallback(
		({ set }) =>
			(data: number | undefined) => {
				set(limitTimeAtom, data);
			},
	);
	const updateTimerState = useRecoilCallback(
		({ set }) =>
			(data: number | undefined) => {
				set(timerAtom, data);
			},
	);
	const dialogRef = useRef<HTMLDialogElement>(null);
	const timerStopHandler = () => {
		dialogRef.current?.close();
		updateLimitTime(undefined);
		updateTimerState(undefined);
	};
	limitTimeSec === undefined
		? dialogRef.current?.close()
		: dialogRef.current?.showModal();
	return (
		<>
			<dialog id="alert_modal" className="modal" ref={dialogRef}>
				<div className="modal-box">
					<h3 className="font-bold text-lg">密告されました！</h3>
					<p className="py-4">
						タイマーを止めてると、密告通知を阻止できます。
					</p>
					<div className="text-center">
						<Timer fontSizeAtr="text-6xl" />
					</div>
					<div className="modal-action">
						<form method="dialog">
							{/* if there is a button in form, it will close the modal */}
							<button
								className="btn btn-error mt-3"
								onClick={timerStopHandler}
							>
								ストップ！
							</button>
						</form>
					</div>
				</div>
			</dialog>
		</>
	);
};

export default AlertModal;
