type PropsType = {
	message: string;
	timestamp: string;
};
const ChatBubble = (props: PropsType) => {
	return (
		<>
			<div className="chat chat-start">
				<div className="chat-bubble">{props.message}</div>
				<div className="chat-footer opacity-50">{props.timestamp}</div>
			</div>
		</>
	);
};

export default ChatBubble;
