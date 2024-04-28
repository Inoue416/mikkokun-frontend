"use client";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { userDataStateAtom } from "@/app/stores/userState";

type SeatNumberType = {
	seatNumber: string;
};

const RegisterSeatNumberForm = () => {
	const [_, setUserState] = useRecoilState(userDataStateAtom);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SeatNumberType>();
	const submitHandler = handleSubmit((formData: SeatNumberType) => {
		console.log("FormData: ", formData.seatNumber);
		setUserState(formData.seatNumber);
	});
	return (
		<>
			<div className="artboard phone-2">
				<label className="form-control w-full max-w-xm">
					<div className="label mb-5">
						<span className="label-text text-2xl">
							座席番号を入力してください。
						</span>
					</div>
					<div className="flex">
						<div>
							<input
								type="text"
								placeholder="Seat Number"
								className="input input-bordered w-full max-w-xs"
								{...register("seatNumber")}
							/>
						</div>
						<div className="ms-2">
							<button
								className="btn btn-outline btn-success"
								onClick={submitHandler}
							>
								送信
							</button>
						</div>
					</div>
				</label>
			</div>
		</>
	);
};

export default RegisterSeatNumberForm;
