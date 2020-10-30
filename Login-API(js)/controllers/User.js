const User = require("../models/User");
const validator = require('email-validator');
const bcrypt = require("bcrypt");
const config = require('config');
const accountUtils = require("../utils/accountUtils");

/**
     * Check if the register's data is valid.
     *
     * @param req - Request's data
     * @param res - Response's data
     */
const Register = async (req, res) => {
    try {
        const { fullName, email, password, phone } = req.body;
        if (!fullName || !email || !password || !phone) {
            throw new Error("Missing argument!!");
        }
        if (!validator.validate(email)) {
            throw new Error("Email is invalid!!")
        }
        const passwordValidate = accountUtils.validatePass(password);
        if (!passwordValidate.valid) {
            throw new Error(passwordValidate.msg)
        }
        const usersWithInformation = await User.find({ email });
        if (usersWithInformation.length) {
            throw new Error("Email exists!!!");

        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const nowTimeStamp = Date.now();
        const nowDateType = new Date(nowTimeStamp);
        const user = new User({
            fullName,
            email,
            password: hashPassword,
            passwordUpdateTime: nowDateType,
            phone,
            status: false
        });
        user.save();
        const now = Math.floor(Date.now() / 1000);
        var exp = now + 604800;
        const header = { cty: "stringee-api;v=1" };
        const tokenRegPayload = {
            jti: config.get("API_KEY_SID") + "-" + now,
            iss: config.get("API_KEY_SID"),
            exp: exp,
            fullName,
            email,
            phone,
            passwordUpdateTime: nowDateType
        }
        const regToken = accountUtils
            .generateToken(tokenRegPayload,
                header,
                config.get("API_KEY_SECRET"));
        const success = { data: { regToken } };
        res.json(success);
        console.log("Register success!!!");
    } catch (err) {
        res.json({
            message: err.message,
        });
    }

}

/**
     * Check if the Login's data is valid and respond token.
     *
     * @param req - Request's data
     * @param res - Response's data
     */
const Login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            throw new Error("Missing argument");
        }
        const userWithEmail = await User.find({ email });
        if (!userWithEmail.length) {
            throw new Error("Account does not exist!!!");
        }
        const { _id, passwordUpdateTime, fullName, phone } = userWithEmail[0];
        const checkPass = bcrypt.compareSync(password, userWithEmail[0].password);
        if (!checkPass) {
            throw new Error("Wrong email or password!!!");
        }
        const now = Math.floor(Date.now() / 1000);
        var exp = now + 604800;
        const header = { cty: "stringee-api;v=1" };
        const tokenPayload = {
            jti: config.get("API_KEY_SID") + "-" + now,
            iss: config.get("API_KEY_SID"),
            exp: exp,
            userId: _id,
            fullName: userWithEmail[0].fullName,
            email: userWithEmail[0].email,
            phone: userWithEmail[0].phone,
            passwordUpdateTime
        }
        const accessToken = accountUtils
            .generateToken(tokenPayload,
                header,
                config.get("API_KEY_SECRET"))
        const success = { data: { _id, fullName, email, phone, accessToken } };
        res.json(success);
    } catch (err) {
        res.json({ message: err.message });
    }
}

/**
     * Update user's infomation
     *
     * @param req - Request's data
     * @param res - Response's data
     */
const Delete = async (req, res) => {
    const { email } = req.body;
    try {
        if (!email) {
            throw new Error("Need email to delete!");
        }
        await User.deleteOne({ email });
        const userWithEmail = await User.find({ email });
        if (userWithEmail.length) {
            throw new Error("Delete failed!!");
        }
        res.json({ message: 'Account had been deleted' })
    } catch (err) {
        res.json({ message: err.message });
    }
}

const Update = async (req, res) => {
    const { email, password, fullName, phone } = req.body;
    try {
        if (!email) {
            throw new Error("Must have email");
        }
        if (password) await User.updateOne({ email }, { password })
        if (fullName) await User.updateOne({ email }, { fullName })
        if (phone) await User.updateOne({ email }, { phone })
        res.json({ message: 'Account updated' })
    } catch (err) {
        res.json({ message: err.message });
    }
}

module.exports = {
    Register,
    Login,
    Delete,
    Update
}