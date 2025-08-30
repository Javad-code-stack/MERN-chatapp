import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import SidebarSkeleton from "../components/SidebarSkeleton";
import { Users } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const Sidebar = () => {
	const { getUsers, users, selectedUser, setSelectedUser, isUserLoading } = useChatStore();
	const { onlineUsers } = useAuthStore();

	const [showOnlineOnly, setShowOnlineOnly] = useState(true);

	const filteredUsers = showOnlineOnly ? users.filter((user) => onlineUsers.includes(user._id)) : users;

	useEffect(() => {
		getUsers();
	}, [getUsers]);

	const showOnline = () => {
		setShowOnlineOnly(!showOnlineOnly);
	};

	if (isUserLoading) return <SidebarSkeleton />;

	return (
		<aside className="h-full w-20 lg:w-72 border-l border-base-300 flex flex-col transition-all duration-200 bg-base-300/40">
			{/* Header */}
			<div className="border-b border-base-300 w-full p-5 flex flex-col items-center lg:items-start">
				<div className="flex items-center gap-2">
					<Users className="size-6" />
					<span className="font-medium hidden lg:block">مخاطبین</span>
				</div>

				<label className="label mt-3">
					<input
						type="checkbox"
						defaultChecked
						className="checkbox checkbox-xs"
						onChange={showOnline}
					/>
					<span className="hidden lg:block text-sm">فقط کاربران آنلاین</span>
				</label>
			</div>
			<div className="overflow-y-auto overflow-x-hidden w-full pb-3">
				{filteredUsers.map((user) => (
					<button
						key={user._id}
						onClick={() => setSelectedUser(user)}
						className={`w-full flex items-center gap-3 p-3 transition-all hover:bg-base-300 ${
							selectedUser?._id === user?._id ? "bg-base-300 ring-1 ring-base-300" : ""
						}`}>
						<div className="relative mx-auto lg:mx-0">
							<img
								src={user.profilePic || "./undraw_professor-avatar.svg"}
								alt="profilePic"
								className="size-9 sm:size-10 lg:size-12 object-cover rounded-full border-2 border-accent"
							/>
							{(onlineUsers || []).includes(user._id) && (
								<div className="absolute top-1 left-1 inline-grid *:[grid-area:1/1]">
									<div className="status status-success animate-ping"></div>
									<div className="status status-success"></div>
								</div>
							)}
						</div>
						<div className="hidden lg:block text-right min-w-0">
							<div className="truncate font-medium">{user.username}</div>
							<div className="text-sm">
								{(onlineUsers || []).includes(user._id) ? "آنلاین" : "آفلاین"}
							</div>
						</div>
					</button>
				))}
				{filteredUsers.length === 0 && (
					<div className="text-center text-zinc-500 p-4">هیچ کاربری آنلاین نیست</div>
				)}
			</div>
		</aside>
	);
};

export default Sidebar;
