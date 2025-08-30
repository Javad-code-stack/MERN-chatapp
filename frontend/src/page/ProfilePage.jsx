import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, User } from "lucide-react";
const ProfilePage = () => {
	const { authUser, updateProfile, isUpdating } = useAuthStore();
	const [selectedImage, setSelectedImage] = useState(null);

	const handleImageUpload = async (e) => {
		const file = e.target.files[0];
		if (!file) return;

		const reader = new FileReader();

		reader.readAsDataURL(file);

		reader.onload = async () => {
			const base64Image = reader.result;
			setSelectedImage(base64Image);
			await updateProfile({ profilePic: base64Image });
		};
	};

	return (
		<div className="pt-4">
			<div className="bg-base-200 rounded-xl p-6 pb-18 space-y-8">
				<div className="text-center">
					<h1 className="text-2xl font-semibold">پروفایل</h1>
					<p className="mt-2">اطلاعات حساب کاربری شما</p>
				</div>
				{/* Details */}
				<div className="flex flex-col items-center gap-4">
					<div className="relative">
						<img
							src={authUser?.profilePic || selectedImage || "/undraw_professor-avatar.svg"}
							alt="profile"
							className="size-32 border-2 object-cover rounded-full"
						/>
						<label
							htmlFor="upload-avatar"
							className={`absolute bottom-0 left-0 bg-base-content rounded-full p-1 border-2 border-accent cursor-pointer transition-all duration-200 ${
								isUpdating ? "animate-pulse pointer-events-none" : ""
							}`}>
							<Camera className="size-5 text-base-200" />
							<input
								type="file"
								accept="image/*"
								id="upload-avatar"
								className="hidden"
								onChange={handleImageUpload}
								disabled={isUpdating}
							/>
						</label>
					</div>
					<p className="text-sm text-accent">
						{isUpdating ? "بارگذاری" : "برای بارگذاری تصویر روی دوربین کلیلک کنید"}
					</p>
				</div>
				<div className="flex flex-col items-center gap-5">
					<div className="space-y-2 w-full sm:w-1/2 lg:w-1/3">
						<div className="flex text-sm items-center gap-2 text-accent">
							<User className="size-4" />
							نام کاربری
						</div>
						<p className="px-4 py-2 border bg-base-100 rounded-lg">{authUser?.username}</p>
					</div>
					<div className="space-y-2 w-full sm:w-1/2 lg:w-1/3">
						<div className="flex text-sm items-center gap-2 text-accent">
							<User className="size-4" />
							آدرس ایمیل
						</div>
						<p className="px-4 py-2 border bg-base-100 rounded-lg">{authUser?.email}</p>
					</div>
				</div>
				<div className="sm:w-1/2 lg:w-1/3 mx-auto p-6 mt-5 rounded-xl bg-base-300">
					<h2 className="text-lg mb-4 font-semibold">جزئیات حساب</h2>
					<div className="text-sm space-y-2">
						<div className="flex items-center justify-between py-2 border-b border-accent gap-2">
							<span>تاریخ عضویت: </span>
							<span>{authUser?.createdAt && authUser.createdAt.split("T")[0]}</span>
						</div>
						<div className="flex items-center justify-between py-2 gap-2">
							<span>وضعیت حساب: </span>
							<span className="text-green-400">فعال</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfilePage;
