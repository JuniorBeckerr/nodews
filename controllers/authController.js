const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    const token = req.header('authorization-token');
    if (!token) return res.status(401).send('access denied')

    try {
        const userVerified = jwt.verify(token, 'dasndi3n4354f3n')
        req.user = userVerified;
        next()
    }catch (err){
         res.status(401).send('access denied')
    }
}