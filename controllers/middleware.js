const jwt = require("jsonwebtoken")

exports.middleware = (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            res.status(401).send("unauthorized")
        }
        const { userId } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)

        req.userId = userId
        next()
    } catch (err) {
        console.log(err)
    }
}