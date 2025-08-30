import { MessagesSquare } from "lucide-react";
import { Link } from "react-router";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
	const { logout, authUser } = useAuthStore();

	return (
		<nav className=" lg:rounded-b-xl navbar bg-base-300 shadow-sm">
			{/* Profile */}
			<div className="flex-none">
				<div className="dropdown dropdown-bottom dropdown-start pr-4">
					{/* Avatar */}
					<div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
						<div className="w-10 rounded-full">
							<img alt="Profile" src={authUser?.profilePic || "/undraw_professor-avatar.svg"} />
						</div>
					</div>
					{/* Menu Links */}
					<ul
						tabIndex={0}
						className=" flex flex-col items-end gap-2 dropdown-content bg-base-200 rounded-box z-1 mt-3 w-52 p-2 shadow">
						<Link
							to="/profile"
							className="hover:bg-accent/20 w-full rtlDir text-right py-1 px-2 rounded-lg">
							حساب کاربری
						</Link>
						<Link
							to="/settings"
							className="hover:bg-accent/20 w-full rtlDir text-right py-1 px-2 rounded-lg">
							تنظیمات رنگ
						</Link>
						<button
							className="hover:bg-accent/20 cursor-pointer w-full rtlDir text-right py-1 px-2 rounded-lg"
							onClick={() => logout()}>
							خروج از حساب
						</button>
					</ul>
				</div>
			</div>
			{/* Logo */}
			<div className="flex-1">
				<Link
					to="/"
					className="flex w-fit items-center gap-2 text-2xl font-bold py-2 px-4 hover:text-accent rounded-xl hover:bg-accent/10 transition-all select-none mr-auto">
					<MessagesSquare />
					<span>Chat</span>
				</Link>
			</div>
		</nav>
	);
};

export default Navbar;
