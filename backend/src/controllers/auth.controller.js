import cloudinary from "../lib/cloudinary.js";
import User from "../models/user.model.js";
import { checkMyInput, hashMyInput } from "../utils/hashing.js";
import { generateToken } from "../utils/jwt.js";

export const signup = async (req, res) => {
	const { username, email, password } = req.body;
	try {
		// hash the password - the fucntion will be in lib utils folder
		if (password.length < 6) return res.status(400).json({ message: "رمزعبور حداقل 6 حرف باشد" });

		const user = await User.findOne({ email });
		if (user) return res.status(400).json({ message: "این ایمیل در حال حاضر وجود دارد" });

		const hashedPass = hashMyInput(password);

		const newUser = new User({
			username,
			email,
			password: hashedPass,
		});

		if (newUser) {
			generateToken(newUser._id, res);
			await newUser.save();

			res.status(201).json({
				message: `خوش آمدید ${newUser.username}`,
				_id: newUser._id,
				username: newUser.username,
				email: newUser.email,
				profilePic: newUser.profilePic,
				createdAt: newUser.createdAt,
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Something went wrong in the server" });
	}
};

export const login = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) return res.status(400).json({ message: "اطلاعات اشتباه وارد شده" });

		const checkPass = checkMyInput(password, user.password);
		if (!checkPass) return res.status(400).json({ message: "اطلاعات اشتباه وارد شده" });

		generateToken(user._id, res);

		return res.status(200).json({
			message: `Welcome back ${user.username}`,
			_id: user._id,
			username: user.username,
			email: user.email,
			profilePic: user.profilePic,
			createdAt: user.createdAt,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Something went wrong in the server" });
	}
};

export const logout = (req, res) => {
	try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Something went wrong in the server" });
	}
};

export const updateProfile = async (req, res) => {
	try {
		const { profilePic } = req.body;
		const userId = req.user._id;
		if (!profilePic) {
			return res.status(400).json({ message: "عکس حساب الزامی است" });
		}

		const uploadPicResponse = await cloudinary.uploader.upload(profilePic);
		const updatedUser = await User.findByIdAndUpdate(
			userId,
			{ profilePic: uploadPicResponse.secure_url },
			{ new: true }
		);
		res.status(200).json({ message: "عکس حساب با موفقیت بروز شد", updatedUser });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Something went wrong in the server" });
	}
};

export const checkAuth = async (req, res) => {
	try {
		res.status(200).json(req.user);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Something went wrong in the server" });
	}
};
