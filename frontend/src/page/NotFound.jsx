export default function NotFound() {
	return (
		<div className="h-screen w-full flex flex-col items-center justify-center gap-8">
			<h1 className="text-2xl md:text-5xl font-bold">صفحه پیدا نشد </h1>
			<div className="h-md w-md md:h-lg md:w-lg rounded-full">
				<img
					src="/404-error-animate.svg"
					alt="error animated svg"
					className="w-full h-full rounded-full"
				/>
			</div>
		</div>
	);
}
