"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { userDataStateAtom } from "@/app/stores/userState";

type SeatNumberType = {
	seatNumber: string;
};

type ApiResponseType = {
	isExists: boolean;
	message: string;
};

const serverUrl = "http://localhost:8080/";

const RegisterSeatNumberForm = () => {
	const [_, setUserState] = useRecoilState(userDataStateAtom);
	const [errorMessage, setErrorMessage] = useState<string | undefined>(
		undefined,
	);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SeatNumberType>();
	const submitHandler = handleSubmit((formData: SeatNumberType) => {
		console.log("FormData: ", formData.seatNumber);
		const callFuncName = "checkSameSeatNumber";
		const fetchUrl =
			serverUrl + callFuncName + "?seatnumber=" + formData.seatNumber;
		fetch(fetchUrl, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				// "Access-Control-Allow-Origin": "*",
			},
		})
			.then((response) => {
				return response.json();
			})
			.then((data: ApiResponseType) => {
				console.log(data)
				if (!data.isExists) {
					setErrorMessage(undefined);
					setUserState(formData.seatNumber);
					return;
				}
				setErrorMessage("その座席番号はすでに使用されています。");
			})
			.catch((err) => {
				console.log(err);
				setErrorMessage("技術的な問題が発生しました。");
			});

		// setUserState(formData.seatNumber);
	});
	return (
		<>
			
			<div className="artboard phone-3">
			{errorMessage === undefined ? undefined : (
				<div role="alert" className="alert alert-error">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="stroke-current shrink-0 h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
				<span>{errorMessage}</span>
			</div>
			)}
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
