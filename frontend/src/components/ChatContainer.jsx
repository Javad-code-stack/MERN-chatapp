import { useEffect, useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import MessageSkeleton from "./MessageSkeleton";
import ChatInput from "./ChatInput";
import ChatHeader from "./ChatHeader";
import { useAuthStore } from "../store/useAuthStore";
import { X } from "lucide-react";

const ChatContainer = () => {
	const {
		messages,
		getMessages,
		isMessagesLoading,
		selectedUser,
		listenToMessages,
		stopListeningToMessages,
	} = useChatStore();
	const { authUser } = useAuthStore();
	const [selectedImage, setSelectedImage] = useState(null);
	const messageRef = useRef(null);

	useEffect(() => {
		getMessages(selectedUser._id);
		listenToMessages();

		return () => stopListeningToMessages();
	}, [getMessages, selectedUser._id, listenToMessages, stopListeningToMessages]);

	useEffect(() => {
		if (messageRef.current && messages) {
			messageRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [messages]);

	if (isMessagesLoading) {
		return (
			<div className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden">
				<ChatHeader />
				<MessageSkeleton />
				<ChatInput />
			</div>
		);
	}

	return (
		<div className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden">
			<ChatHeader />
			<div className="flex-1 p-4 overflow-x-hidden overflow-y-auto space-y-5">
				{messages.map((message) => (
					<div
						key={message._id}
						className={`chat ${message.senderId === authUser._id ? "chat-start" : "chat-end"}`}
						ref={messageRef}>
						<div className="chat-image avatar">
							<div className="size-10 rounded-full border">
								<img
									src={
										message.senderId === authUser._id
											? authUser.profilePic || "./undraw_professor-avatar.svg"
											: selectedUser.profilePic || "./undraw_professor-avatar.svg"
									}
									alt="profilePic"
								/>
							</div>
						</div>
						<div className="chat-bubble flex flex-col ltrDir" style={{ transform: "scaleX(-1)" }}>
							<div className="flex flex-col" style={{ transform: "scaleX(-1)" }}>
								<span
									className={`mb-2 text-xs flex items-center justify-between gap-4 ${
										message.senderId === authUser._id
											? "text-accent flex-row-reverse"
											: ""
									}`}>
									{message.senderId === authUser._id
										? authUser.username || "undraw_professor-avatar.svg"
										: selectedUser.username || "undraw_professor-avatar.svg"}
									<time className="text-xs font-light mr-1">{message.createdAt ?? ""}</time>
								</span>
								{message.image && (
									<>
										<img
											className="sm:max-w-[200px] rounded-md mb-2"
											src={message.image}
											alt="attachment"
											onClick={() => {
												setSelectedImage(message.image);
												document.getElementById("img_modal").showModal();
											}}
										/>
										<dialog id="img_modal" className="modal">
											<div className="modal-box w-11/12 max-w-4xl">
												<div className="modal-action mt-0 mb-4">
													<form method="dialog">
														<button className="btn">
															<X className="size-5" />
														</button>
													</form>
												</div>
												<img
													className="w-full max-w-4xl rounded-md mb-2"
													src={selectedImage}
													alt="attachment"
												/>
											</div>
										</dialog>
									</>
								)}
								{message.text && <p className="text-sm mb-2 text-right">{message.text}</p>}
							</div>
						</div>
					</div>
				))}
			</div>
			<ChatInput />
		</div>
	);
};

export default ChatContainer;
