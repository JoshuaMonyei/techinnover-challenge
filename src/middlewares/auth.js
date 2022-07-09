const crypto = require("crypto");
const fetch = require("node-fetch");
const { emailService } = require("../services");

const ENC_KEY = "bf3c199c4207bc477b907d1e0917b17c"; // set random encryption key
const IV = "6148677d82dec9e3"; // set random initialisation vector
// ENC_KEY and IV can be generated as crypto.randomBytes(32).toString('hex');

const encrypt = (val, res) => {
	try {
		let cipher = crypto.createCipheriv("aes-256-cbc", ENC_KEY, IV);
		let encrypted = cipher.update(val, "utf8", "base64");
		encrypted += cipher.final("base64");
		return encrypted;
	} catch (error) {
		return errorResponse(res, 400, "Invalid encryption in request", null);
	}
};

var decrypt = (encrypted, res) => {
	try {
		let decipher = crypto.createDecipheriv("aes-256-cbc", ENC_KEY, IV);
		let decrypted = decipher.update(encrypted, "base64", "utf8");
		return decrypted + decipher.final("utf8");
	} catch (error) {
		return errorResponse(res, 400, "Invalid decryption in request", null);
	}
};


module.exports = {
  encrypt,
  decrypt,
};
