import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		username: {
			type: String,
			required: true,
			unique: true,
		},
		profilePic: {
			type: String,
			default: "",
		},
		password: {
			type: String,
			required: true,
			minlength: 6,
		},
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
