const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    const tocken = req.body.token || req.query.token || req.headers['authorization']
    if (!tocken) return res.status(403).send({ message: 'No token provided' })
    try {
        const bearer =  token.split(' ');
        const token = bearer[1];
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;

    }
    catch (err) {
        return res.status(400).json({
            success: false,
            msg: 'Invalid Token'
        });
    }
    return next();
}

module.exports = verifyToken