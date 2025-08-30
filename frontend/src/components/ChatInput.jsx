import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const ChatInput = () => {
	const [text, setText] = useState("");
	const [imagePreview, setImagePreview] = useState(null);
	const fileInputRef = useRef(null);
	const { sendMessage } = useChatStore();

	const handleImageChange = (e) => {
		const file = e.target.files[0];

		if (!file.type.startsWith("image/")) {
			toast.error("نوع فایل انتخابی قابل قبول نیست");
			return;
		}

		const reader = new FileReader();
		reader.onloadend = () => {
			setImagePreview(reader.result);
		};
		reader.readAsDataURL(file);
	};

	const removeImage = () => {
		setImagePreview(null);
		if (fileInputRef.current) fileInputRef.current.value = "";
	};

	const handleSendMessage = async (e) => {
		e.preventDefault();
		if (!text.trim() && !imagePreview) return;
		try {
			await sendMessage({
				text: text.trim(),
				image: imagePreview,
			});

			// Clear form
			setText("");
			setImagePreview(null);
			if (fileInputRef.current) fileInputRef.current.value = "";
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="p-4 w-full">
			{/* imagePreview */}
			{imagePreview && (
				<div className="mb-3 flex items-center gap-2">
					<div className="relative">
						<img
							src={imagePreview}
							alt="Image"
							className="size-20 object-cover rounded-lg border"
						/>
						<button
							onClick={removeImage}
							className="absolute -top-1.5 left-1.5 size-5 rounded-full bg-base-200 flex items-center justify-center">
							<X className="size-3" />
						</button>
					</div>
				</div>
			)}
			{/* Text Input */}
			<form onSubmit={handleSendMessage} className="flex items-center gap-2">
				<div className="flex-1 flex gap-2">
					<input
						type="text"
						value={text}
						onChange={(e) => setText(e.target.value)}
						className="w-full input rounded-lg input-sm sm:input-md"
					/>
					<input
						type="file"
						accept="image/*"
						onChange={handleImageChange}
						className="hidden"
						ref={fileInputRef}
					/>
					<button
						type="button"
						className={`flex btn btn-circle ${
							imagePreview ? "text-emerald-500" : "text-zinc-400"
						}`}
						onClick={() => fileInputRef.current?.click()}>
						<Image size={24} />
					</button>
				</div>
				<button
					type="submit"
					className="btn btn-sm btn-accent btn-circle"
					disabled={!text.trim() && !imagePreview}>
					<Send size={20} />
				</button>
			</form>
		</div>
	);
};

export default ChatInput;
