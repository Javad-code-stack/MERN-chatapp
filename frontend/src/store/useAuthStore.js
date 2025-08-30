import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = "http://localhost:8001";

export const useAuthStore = create((set, get) => ({
	authUser: null,
	isSigningUp: false,
	isLoggingUp: false,
	isUpdating: false,
	isCheckingAuth: true,
	onlineUsers: [],
	socket: null,

	checkAuth: async () => {
		try {
			const response = await axiosInstance.get("/auth/check");
			set({ authUser: response.data });
			get().connectSocket();
		} catch (error) {
			console.log("Error in Check Auth:\n", error);
			set({ authUser: null });
		} finally {
			set({ isCheckingAuth: false });
		}
	},

	signup: async (data) => {
		set({ isSigningUp: true });
		try {
			const response = await axiosInstance.post("/auth/signup", data);
			set({ authUser: response.data });
			get().connectSocket();
			toast.success("حساب با موفقیت ساخته شد");
		} catch (error) {
			console.log(error.message);
			toast.error(
				error.response?.data?.message ||
					error.message ||
					"مشکلی در ساخت حساب بوجود آمد لطفا بعدا تلاش کنید"
			);
		} finally {
			set({ isSigningUp: false });
		}
	},
	// javad2@example.com
	login: async (data) => {
		set({ isLoggingUp: true });
		try {
			const response = await axiosInstance.post("/auth/login", data);
			set({ authUser: response.data });
			get().connectSocket();
			toast.success("ورود به حساب موفقیت آمیز");
		} catch (error) {
			console.log(error.message);
			toast.error(error.response?.data?.message || error.message || "مشکلی در سرور بوجود آمده");
		} finally {
			set({ isLoggingUp: false });
		}
	},

	logout: async () => {
		try {
			await axiosInstance.post("/auth/logout");
			set({ authUser: null });
			get().disconnectSocket();
		} catch (error) {
			console.log(error.message);
			toast.error(error.response.data.error);
		}
	},

	updateProfile: async (data) => {
		set({ isUpdating: true });
		try {
			const response = await axiosInstance.put("/auth/update-profile", data);
			set({ authUser: response.data.updatedUser });
			toast.success("تغییر با موفقیت انجام شد");
		} catch (error) {
			console.log(error.message);
			toast.error(error.response?.data?.message || error.message || "مشکلی در بروزرسانی حساب پیش آمده");
		} finally {
			set({ isUpdating: false });
		}
	},

	connectSocket: async () => {
		const { authUser } = get();
		if (!authUser || get().socket?.connected) return;
		const socket = io(BASE_URL, {
			query: {
				userId: authUser._id,
			},
		});
		socket.connect();

		set({ socket: socket });

		socket.on("getOnlineUsers", (userIds) => {
			set({ onlineUsers: userIds });
		});
	},

	disconnectSocket: async () => {
		if (get().socket?.connected) get().socket.disconnect();
	},
}));
