import ChatContainer from "../components/ChatContainer";
import NoChatSelected from "../components/NoChatSelected";
import Sidebar from "../components/Sidebar";
import { useChatStore } from "../store/useChatStore";

const HomePage = () => {
	const { selectedUser } = useChatStore();
	return (
		<div className="bg-base-200 rounded-xl mt-4">
			<div className="flex items-center justify-center">
				<div className="rounded-lg w-full h-[calc(100vh-8rem)]">
					<div className="flex h-full rounded-lg overflow-hidden">
						<Sidebar />
						{!selectedUser ? <NoChatSelected /> : <ChatContainer />}
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
