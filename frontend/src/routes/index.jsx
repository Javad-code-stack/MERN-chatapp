import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router";
import { Loader } from "lucide-react";

import MainLayout from "../page/layout/MainLayout";
import AuthLayout from "../page/layout/AuthLayout";
import LoadingPage from "../page/LoadingPage.jsx";
import { useAuthStore } from "../store/useAuthStore.js";

const HomePage = lazy(() => import("../page/HomePage.jsx"));
const SignupPage = lazy(() => import("../page/SignupPage.jsx"));
const LoginPage = lazy(() => import("../page/LoginPage.jsx"));
const NotFound = lazy(() => import("../page/NotFound.jsx"));
const SettingsPage = lazy(() => import("../page/SettingsPage.jsx"));
const ProfilePage = lazy(() => import("../page/ProfilePage.jsx"));

export default function AppRoutes() {
	const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	console.log(onlineUsers);

	if (isCheckingAuth && !authUser) {
		return <LoadingPage />;
	}
	return (
		<Suspense fallback={<LoadingPage />}>
			<Routes>
				{/* Main Routs which are protected */}
				<Route element={<MainLayout />}>
					<Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />}></Route>
					<Route
						path="/settings"
						element={authUser ? <SettingsPage /> : <Navigate to="/login" />}></Route>
					<Route
						path="/profile"
						element={authUser ? <ProfilePage /> : <Navigate to="/login" />}></Route>
				</Route>
				{/* Authentication wiht their layout - Public - Login Singup*/}
				<Route element={<AuthLayout />}>
					<Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to="/" />}></Route>
					<Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />}></Route>
				</Route>

				{/* 404 Not Found Page */}
				<Route element={<AuthLayout />}>
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</Suspense>
	);
}
