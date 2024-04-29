import { useEffect, useRef } from "react";
import { useRecoilValue, useRecoilCallback } from "recoil";
import { limitTimeAtom } from "@/app/stores/receivedMessageState";
import Timer from "../Timer/page";
const AlertModal = () => {
	const limitTimeSec = useRecoilValue(limitTimeAtom);
	const updateLimitTime = useRecoilCallback(
		({ set }) =>
			(data: number | undefined) => {
				set(limitTimeAtom, data);
			},
	);
	const dialogRef = useRef<HTMLDialogElement>(null);
	useEffect(() => {
		dialogRef.current?.showModal();
	}, []);
	if (limitTimeSec === undefined) return <></>;

	const timerStopHandler = () => {
		dialogRef.current?.close();
		updateLimitTime(undefined);
	};
	return (
		<>
			<dialog id="alert_modal" className="modal" ref={dialogRef}>
				<div className="modal-box">
					<h3 className="font-bold text-lg">密告されました！</h3>
					<p className="py-4">
						タイマーを止めてると、密告通知を阻止できます。
					</p>
					<p></p>
					<div className="modal-action">
						<form method="dialog">
							{/* if there is a button in form, it will close the modal */}
							<Timer />
							<button
								className="btn btn-error"
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
