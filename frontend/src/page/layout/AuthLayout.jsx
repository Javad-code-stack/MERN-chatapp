import { Outlet } from "react-router";

const AuthLayout = () => {
	return (
		<div className="bg-gradient-to-l from-neutral/20 to-neutral/60">
			<Outlet />
		</div>
	);
};

export default AuthLayout;
