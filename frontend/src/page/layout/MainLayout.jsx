import { Outlet } from "react-router";
import Navbar from "../../components/Navbar";

const MainLayout = () => {
	return (
		<div className="min-h-screen w-full max-w-[1200px] mx-auto">
			<Navbar />
			<div className="pb-4">
				<Outlet />
			</div>
		</div>
	);
};

export default MainLayout;
