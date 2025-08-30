import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getAllUsers = async (req, res) => {
	try {
		const loggedInUserId = req.user._id;
		const allUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

		res.status(200).json(allUsers);
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ message: "Something went wrong in the server" });
	}
};

export const getMessages = async (req, res) => {
	try {
		const { id: userToChat } = req.params;
		const myId = req.user._id;

		const message = await Message.find({
			$or: [
				{ senderId: myId, receiverId: userToChat },
				{ senderId: userToChat, receiverId: myId },
			],
		});

		res.status(200).json(message);
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ message: "Something went wrong in the server" });
	}
};

export const sendMessages = async (req, res) => {
	try {
		const { text, image } = req.body;
		const { id: receiverId } = req.params;
		const senderId = req.user._id;

		let imgUrl;
		if (image) {
			const uploadResonse = await cloudinary.uploader.upload(image);
			imgUrl = uploadResonse.secure_url;
		}

		const newMessage = new Message({
			senderId,
			receiverId,
			text,
			image: imgUrl,
		});

		await newMessage.save();

		// TODO: socket.io
		const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}
		res.status(201).json(newMessage);
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ message: "Something went wrong in the server" });
	}
};
