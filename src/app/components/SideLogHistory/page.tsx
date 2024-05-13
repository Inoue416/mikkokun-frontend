import { responseAtom } from "@/app/stores/receivedMessageState";
import { useRecoilValue } from "recoil";
import ChatBubble from "../ChatBubble/page";

type PropsType = {
	children: React.ReactNode;
};

const SideLogHistory = (props: PropsType) => {
	const messgeArray = useRecoilValue(responseAtom);
	return (
		<>
			<div className="drawer lg:drawer-open">
				<input
					id="my-drawer-2"
					type="checkbox"
					className="drawer-toggle"
				/>
				<div className="drawer-content flex flex-col items-center justify-center">
					{/* Page content here */}
					<label
						htmlFor="my-drawer-2"
						className="btn drawer-button lg:hidden mt-3"
					>
						通知履歴オープン
					</label>
					<div className="mt-3">{props.children}</div>
				</div>
				<div className="drawer-side">
					<label
						htmlFor="my-drawer-2"
						aria-label="close sidebar"
						className="drawer-overlay"
					></label>
					<ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
						{/* Sidebar content here */}
						{messgeArray.map((item, idx) => {
							return (
								<ChatBubble
									key={idx}
									message={item.message}
									timestamp={item.timestamp}
								/>
							);
						})}
					</ul>
				</div>
			</div>
		</>
	);
};

export default SideLogHistory;
