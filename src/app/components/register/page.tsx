const RegisterSeatNumberForm = async () => {
	return (
		<>
			<div className="artboard artboard-horizontal phone-5">
				<label className="form-control w-full max-w-xm">
					<div className="label">
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
							/>
						</div>
						<div className="ms-2">
							<button className="btn btn-outline btn-success">
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
