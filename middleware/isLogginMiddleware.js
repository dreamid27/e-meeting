
const JWTService = require('../services/JWTService')
const isLogginMiddleware = function (req, res, next) {
    JWTService.isValidJSONWebToken(req.headers.authorization).then(isLogged => {
        if (isLogged) {
            next()
        } else {
            res.status(401)
            res.send("Unauthorized")
        }
    })
}

module.exports = isLogginMiddleware

