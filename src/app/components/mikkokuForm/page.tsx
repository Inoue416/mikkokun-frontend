"use client";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { userDataState } from "@/app/stores/state";

type FormDataType = {
    targetSeatNumber: string;
};


const MikkokuForm = () => {
    const seatNumberData = useRecoilValue(userDataState);
    if (seatNumberData === "") return redirect("/");

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormDataType>();
    return(
        <>
            <div className="items-center text-3xl mb-3">
                <p>座席番号：{seatNumberData} さん。ようこそ！</p>
            </div>
            <div className="artboard phone-2">
				<label className="form-control w-full max-w-xm">
					<div className="label mb-5">
						<span className="label-text text-2xl">
							<p>どの席を密告しますか？</p>
                            <p>(席番号を入力して下さい。)</p>
						</span>
					</div>
					<div className="flex">
						<div>
							<input
								type="text"
								placeholder="Target Seat Number"
								className="input input-bordered w-full max-w-xs"
								{...register("targetSeatNumber")}
							/>
						</div>
						<div className="ms-2">
							<button
								className="btn btn-outline btn-error"
							>
								密告
							</button>
						</div>
					</div>
				</label>
			</div>
        </>
    );
}

export default MikkokuForm