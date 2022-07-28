const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
	{
		name: {
            type:String,
			required: true,
		},
	},
    {
		email: {
            type:String,
			required: true,
		},
	},
    {
		number: {
			type: Number,
			required: true,
		},
	},
    {
		password: {
            type:String,
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
module.exports = mongoose.model("User", userSchema);
