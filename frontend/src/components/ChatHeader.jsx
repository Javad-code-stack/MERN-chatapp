import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { X } from "lucide-react";

const ChatHeader = () => {
	const { selectedUser, setSelectedUser } = useChatStore();

	const { onlineUsers } = useAuthStore();

	return (
		<div className="py-2 border-b border-base-100">
			<div className="flex items-center justify-between px-4 py-2">
				<div className="flex items-center gap-3">
					{/* Avatar */}
					<div className="avatar">
						<div className="ring-primary ring-offset-base-100 size-10 rounded-full ring-2 ring-offset-2">
							<img
								src={selectedUser.profilePic || "./undraw_professor-avatar.svg"}
								alt={selectedUser.username}
							/>
						</div>
					</div>
					{/* Info */}
					<div className="flex flex-col items-center gap-1">
						<h3 className="font-medium">{selectedUser.username}</h3>
						<p className="text-sm text-base-content/70">
							{onlineUsers.includes(selectedUser._id) ? "آنلاین" : "آفلاین"}
						</p>
					</div>
				</div>
				{/* Close Button */}
				<button
					onClick={() => setSelectedUser(null)}
					className="hover:text-accent cursor-pointer transition-all">
					<X />
				</button>
			</div>
		</div>
	);
};

export default ChatHeader;
