const jwt = require("jsonwebtoken");

// check if there is token
module.exports = (req, res, next) => {
    try {
        // get token from header
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        // check if token
        if (!token)
            return res.status(403).send("Access denied.");

        // decode token to be readable
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        // something were wrong
        res.status(400).send("Invalid token");
    }
};
