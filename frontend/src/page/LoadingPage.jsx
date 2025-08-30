import { Loader } from "lucide-react";

const LoadingPage = () => {
	return (
		<div className="h-screen w-full flex items-center justify-center mx-auto">
			<Loader className="size-24 animate-spin text-accent" />
		</div>
	);
};

export default LoadingPage;
