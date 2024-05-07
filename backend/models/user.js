const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
});

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, "672177288fd8569c0331ead2739f8d9cc51209eaa791107fb783de0622cb1d69a5f5d58b1734a3736c32ed49d6c3f59a91841534ff06fbd3c79655f9a3bead992384dbe54532d7347d716f67ecc7a2004e68aad9493d365b1565a412c849569443a6135e0c4d0902d8eae058ea6db2f36686d30f407ad68396629853adeaa580a8a4e93d79d2345d08881038ef82b91fa915862e34bbf7912ca88b515239e2b2b75999178b2c208d9d66b6dba664f35c105814c0e8a759b022e4d422800c011b0d2437e3b717e7ce793f4949085b5d0c21d1d26c7054724fd761c9ddd0aac2523aa1cd6043c1cc6a49319f6a268d6325166e1d7aa04dcfc3f91da6d71f6f71e3", {
		expiresIn: "7d",
	});
	return token;
};

const User = mongoose.model("user", userSchema);

const validate = (data) => {
	const schema = Joi.object({
		firstName: Joi.string().required().label("First Name"),
		lastName: Joi.string().required().label("Last Name"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = { User, validate };
