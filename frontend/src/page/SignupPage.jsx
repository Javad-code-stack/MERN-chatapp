import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, Lock, Mail, User, EyeClosed, MessagesSquare } from "lucide-react";
import { Link } from "react-router";
import toast from "react-hot-toast";

const SignupPage = () => {
	const { signup, isSigningUp } = useAuthStore();

	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
	});

	const validateForm = () => {
		if (!formData.username.trim()) return toast.error("نام کاربری خود را وارد کنید");
		if (!formData.email.trim()) return toast.error("ایمیل معتبر برای ثبت نام الزامی است");
		if (!/^\S+@\S+\.\S+$/.test(formData.email)) return toast.error("ایمیل شما معتبر نیست");
		if (!formData.password.trim()) return toast.error("رمزعبور استاندار برای حساب الزامی است");
		if (formData.password.length < 6) return toast.error("رمزعبور باید حداقل 6 حرفی باشد");

		return true;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const success = validateForm();

		if (success) signup(formData);
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
				<h1 className="text-2xl font-semibold text-center mb-8">ثبت نام</h1>
				<form
					noValidate
					onSubmit={handleSubmit}
					className="w-full max-w-[85%] sm:max-w-[65%] md:max-w-[80%] lg:max-w-[70%] space-y-6">
					{/* Username */}
					<div className="flex flex-col gap-0.5">
						<label className="input validator w-full">
							<User className="text-accent size-5" />
							<input
								required
								type="text"
								placeholder="username_123"
								pattern="[A-Za-z][A-Za-z0-9\-]*"
								minLength="3"
								maxLength="24"
								title="فقط حروف انگلیسی حداقل 3 و حداکثر 24 حرف"
								className="ltrDir text-left"
								onChange={(e) => setFormData({ ...formData, username: e.target.value })}
							/>
						</label>
						<div className="validator-hint hidden">حداقل 3 و حداکثر 24 حرف - فقط انگلیسی</div>
					</div>
					{/* Email */}
					<div className="flex flex-col gap-0.5">
						<label className="input validator w-full">
							<Mail className="text-accent size-5" />
							<input
								required
								type="email"
								placeholder="mail@site.com"
								onChange={(e) => setFormData({ ...formData, email: e.target.value })}
							/>
						</label>
						<div className="validator-hint hidden">ایمیل شما معتبر نیست</div>
					</div>
					{/* Password */}
					<div className="flex flex-col gap-0.5">
						<label className="input validator w-full">
							<Lock className="text-accent size-5" />
							<input
								required
								type={showPassword ? "password" : "text"}
								placeholder="**********"
								minLength="6"
								pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
								title="رمزعبور باید حداقل رقمی و ترکیبی از حروف بزرگ و کوچک انگلیسی و ارقام باشد"
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
						<p className="validator-hint hidden">
							حداقل باید 6 حرف باشد
							<br />
							یک عدد باید استفاده شود <br />
							یک حرف کوچک انگلیسی باید استفاده شود <br />
							یک حرف بزرگ انگلیسی باید استفاده شود
						</p>
					</div>
					<div className="flex items-center gap-2 text-sm">
						<span>حساب کاربری دارید؟ </span>
						<Link to="/login" className="text-accent hover:text-accent-content transition-all">
							ورود
						</Link>
					</div>
					<button
						disabled={isSigningUp}
						type="submit"
						className="btn btn-outline btn-accent w-full">
						{isSigningUp ? (
							<>
								<span className="loading loading-spinner"></span>
								صبر کنید
							</>
						) : (
							"ساخت حساب"
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

export default SignupPage;
