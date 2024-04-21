import RegisterSeatNumberForm from "./components/register/page";

// import { useForm, SubmitHandler } from "react-hook-form";

type FormData = {
	chatData: string;
};

export default async function Home() {
	return (
		<>
			<div className="flex flex-col items-center pt-5">
				<RegisterSeatNumberForm />
			</div>
		</>
	);
}
