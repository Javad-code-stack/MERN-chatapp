import "dotenv/config";
import mongoose from "mongoose";

const dbConnect = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI);
		console.log("MongoDB connected", conn.connection.host);
	} catch (error) {
		console.log("Something went wrong connecting to database:\n", error);
	}
};

export default dbConnect;
