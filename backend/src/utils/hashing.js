import bcrypt from "bcryptjs";

export const hashMyInput = (input) => {
	const salt = bcrypt.genSaltSync(10);
	const hashedInput = bcrypt.hashSync(input, salt);
	return hashedInput;
};

export const checkMyInput = (input, hashedValue) => {
	return bcrypt.compareSync(input, hashedValue);
};
