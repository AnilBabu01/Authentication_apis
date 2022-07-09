var jwt = require('jsonwebtoken');
const JWT_SECRET = 'anilbabu$oy';

const fetchUser = (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    var token =req.headers.authorization;
    token =token.split(' ')[1]
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }

}

module.exports = fetchUser;