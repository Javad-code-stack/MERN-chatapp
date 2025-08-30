import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, Lock, Mail, User, EyeClosed, MessagesSquare } from "lucide-react";
import { Link } from "react-router";

const LoginPage = () => {
	const { login, isLoggingUp } = useAuthStore();

	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const handleSubmit = (e) => {
		e.preventDefault();

		login(formData);
	};

	const showPass = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div className="w-full min-h-screen flex items-center 2xl:max-w-[1440px] mx-auto">
			{/* Form Side - Right */}
			<div className="bg-gradient-to-l from-base-100 to-base-200 h-[100vh] 2xl:h-[90vh] rounded-r-2xl p-6 md:p-12 flex flex-col items-center justify-center mx-auto w-full lg:w-1/2 relative">
				<div className="flex items-center gap-2 text-2xl absolute top-10 right-[50%] translate-x-[50%] font-bold py-2 px-4 hover:text-accent rounded-xl hover:bg-accent/10 transition-all select-none">
					<MessagesSquare />
					<span>Chat</span>
				</div>
				<h1 className="text-2xl font-semibold text-center mb-8">ورود به حساب</h1>
				<form
					onSubmit={handleSubmit}
					className="w-full max-w-[85%] sm:max-w-[65%] md:max-w-[80%] lg:max-w-[70%] space-y-6">
					{/* Email */}
					<div className="flex flex-col gap-0.5">
						<label className="input validator w-full">
							<Mail className="text-accent size-5" />
							<input
								type="email"
								placeholder="mail@site.com"
								required
								className="ltrDir text-left"
								onChange={(e) => setFormData({ ...formData, email: e.target.value })}
							/>
						</label>
					</div>
					{/* Password */}
					<div className="flex flex-col gap-0.5">
						<label className="input validator w-full">
							<Lock className="text-accent size-5" />
							<input
								type={showPassword ? "password" : "text"}
								required
								placeholder="**********"
								className="ltrDir text-left"
								onChange={(e) => setFormData({ ...formData, password: e.target.value })}
							/>
							<div>
								{showPassword ? (
									<Eye
										onClick={() => showPass()}
										className="text-accent size-4 cursor-pointer"
									/>
								) : (
									<EyeClosed
										onClick={() => showPass()}
										className="text-accent size-4 cursor-pointer"
									/>
								)}
							</div>
						</label>
					</div>
					<div className="flex items-center gap-2 text-sm">
						<span>حساب کاربری ندارید؟ </span>
						<Link to="/signup" className="text-accent hover:text-accent-content transition-all">
							ساخت حساب
						</Link>
					</div>
					<button
						disabled={isLoggingUp}
						type="submit"
						className="btn btn-outline btn-accent w-full">
						{isLoggingUp ? (
							<>
								<span className="loading loading-spinner"></span>
								صبر کنید
							</>
						) : (
							"ورود به حساب"
						)}
					</button>
				</form>
			</div>
			{/* Image Side - Left */}
			<div className="bg-gradient-to-l from-base-200 to-base-300 h-[100vh] 2xl:h-[90vh] rounded-l-2xl p-6 md:p-12 mx-auto hidden md:flex items-center justify-center lg:w-1/2">
				<img src="logosvg.svg" alt="animated-svg" width={700} />
			</div>
		</div>
	);
};

export default LoginPage;
