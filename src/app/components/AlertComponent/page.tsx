import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

export type AlertComponentPropsType = {
	message: string;
	setClearErrorMessage: () => void;
};

const fadeOut = keyframes`
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
`;

// const AlertWrapper = styled.div<{ visible: boolean }>`
//     position: relative;
//     // animation: ${({ visible }) => (visible ? 'none' : fadeOut)} 0.5s ease-out forwards;
// `;

// const CloseButton = styled.button`
//     position: absolute;
//     top: 0;
//     right: 0;
//     background-color: transparent;
//     border: none;
//     cursor: pointer;
//     padding: 0.25rem;
//     transition: transform 0.3s ease;

//     &:hover {
//         transform: scale(1.1);
//     }
// `;
// TODO: いずれfade-outが使えるように親コンポーネントを編集したい
const AlertComponent = (props: AlertComponentPropsType) => {
	// const [visible, setVisible] = useState(true);

	const handleClose = () => {
		// setVisible(false);
		props.setClearErrorMessage();
	};

	return (
		// <AlertWrapper role="alert" className="alert alert-error" visible={visible}>
		<div role="alert" className="alert alert-error">
			<button className="btn-error btn-sm" onClick={handleClose}>
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
			</button>
			<span>{props.message}</span>
		</div>
		// </AlertWrapper>
	);
};

export default AlertComponent;
