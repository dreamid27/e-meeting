const jwt = require('jsonwebtoken')
const encodeJsonWebToken = async (_userModel) => {
    const {username, email } = _userModel
    return jwt.sign(Object.assign({username, email}),  'shhhhh');
}

const decodeJsonWebToken = async (_token) => {
    return jwt.decode(_token)
}

const isValidJSONWebToken = async (_token) => {
    try {
        jwt.verify(_token, 'shhhhh');
        return true
    } catch(err) {
        console.error(err)
        return false;
    }
}

module.exports = { encodeJsonWebToken, decodeJsonWebToken, isValidJSONWebToken};
