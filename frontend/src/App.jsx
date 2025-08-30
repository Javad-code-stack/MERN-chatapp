import { BrowserRouter } from "react-router";
import AppRoutes from "./routes";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/useThemeStore";

function App() {
	const { theme } = useThemeStore();
	return (
		<BrowserRouter>
			<div data-theme={theme}>
				<AppRoutes />
				<Toaster
					position="top-center"
					toastOptions={{
						duration: 3500,
						style: {
							background: "#363636",
							color: "#fff",
						},
					}}
				/>
			</div>
		</BrowserRouter>
	);
}

export default App;
