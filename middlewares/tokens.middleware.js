const jwt = require('jsonwebtoken');
const usersModel = require('../models/User');
const config = require('config');
const secretTokenSingupKey = config.get("API_KEY_SECRET");
function verifyToken(req, res, next) {
    const { headers: { authorization } } = req;
    if (authorization == null) {
        return res.json({
            reason: "Need token in header ",
        })
    }
    const Regx = /\s+(.*)/g;
    const token = Regx.exec(authorization)[1];
    jwt.verify(token, secretTokenSingupKey, async (err, decoded) => {
        if (err) {
            return res.json({
                reason: "User is unauthorized"
            })
        }
        req.user = await usersModel.findById(decoded.id);
        next();
    })

}
module.exports = {
    verifyToken
}
