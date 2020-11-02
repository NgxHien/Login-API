const passwordValidator = require("password-validator");
const schema = new passwordValidator();
const jwt = require("jsonwebtoken");

schema
    .is().min(8)
    .is().max(100)
    .has().uppercase()
    .has().lowercase()
    .has().digits()
    .has().not().spaces()


/** 
    * Check if password is valid.
    * 
    * @param password
    * @returns valid - true | false
    * @returns msg - If password is invalid
    */
const validatePass = (password) => {
    const validatePassword = schema.validate(password, { list: true });
    if (validatePassword.length) {
        for (let i = 0; i < validatePassword.length; i++) {
            switch (validatePassword[i]) {
                case "min":
                    validatePassword[i] = "Password must have at least 8 digits!";
                    break;
                case "uppercase":
                    validatePassword[i] = "Password must have at least one Uppercase!"
                    break;
                case "lowercase":
                    validatePassword[i] = "Password must have at least one Lowercase!"
                    break;
                case "digits":
                    validatePassword[i] = "Password must contain at least a numbet"
                    break;
                case "spaces":
                    validatePassword[i] = "Password should not have any spaces"
                    break;
            }
        }
        return {
            valid: false,
            msg: validatePassword
        }
    }
    return { valid: true }
}

const generateToken = (payload, sercetkey) => {
    return jwt.sign(
        {
            ...payload
        },
        sercetkey,
        { algorithm: 'HS256' }
    );
}

module.exports = {
    validatePass,
    generateToken
}
