const mongoose = require("mongoose");
const { Schema } = mongoose;

const otpSchema = new Schema(
	{
		otp: {
			type: Number,
			required: true,
		},
		number: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true },
	{
		createdAt: {
			type: Date,
			default: Date.now(),
		},
	}
);
module.exports = mongoose.model("Otp", otpSchema);
