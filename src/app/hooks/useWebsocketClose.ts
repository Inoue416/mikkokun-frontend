import { websocketAtom } from "../stores/websocketStates";
import { useRecoilCallback, useRecoilValue } from "recoil";
import { responseAtom, limitTimeAtom } from "../stores/receivedMessageState";
import { userDataStateAtom } from "../stores/userState";

// TODO: 無限ロード編を解消したい
export const useLogout = () => {
    const socket = useRecoilValue(websocketAtom);
	const updateMessage = useRecoilCallback(({ set }) => (data: []) => {
		set(responseAtom, data);
	});
	const updateLimitTime = useRecoilCallback(
		({ set }) =>
			(data: undefined) => {
				set(limitTimeAtom, data);
			},
	);
	const updateUserState = useRecoilCallback(({ set }) => (data: "") => {
		set(userDataStateAtom, data);
	});
	const logoutHandler = () => {
		try {
			socket.close();
			updateMessage([]);
			updateLimitTime(undefined);
			updateUserState("");
		} catch (e) {
            console.log("--- Logout Handler Error ---");
			console.error(e);
		}
	};

	return { logoutHandler };
};
