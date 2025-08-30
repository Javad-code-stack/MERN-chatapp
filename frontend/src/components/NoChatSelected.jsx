import { MessagesSquare } from "lucide-react";

const NoChatSelected = () => {
	return (
		<div className="w-full flex flex-1 flex-col items-center justify-center p-16">
			<div className="max-w-md text-center space-y-6">
				{/* ICON */}
				<div className="flex justify-center gap-4 mb-4">
					<div className="relative">
						<div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center animate-bounce">
							<MessagesSquare className="size-8 text-primary" />
						</div>
					</div>
				</div>
				<h2 className="text-2xl font-bold">به چت خوش آمدید</h2>
				<p className="text-base-content/60">یک گفتگو را انتخاب کنید و شروع به صحبت کنید</p>
			</div>
		</div>
	);
};

export default NoChatSelected;
