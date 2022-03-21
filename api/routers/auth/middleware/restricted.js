const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../../../configs/auth");

const restricted = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.status(403).json({ message: "Unauthorized" });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err)
            return res.status(401).json({
                message: "Something went wrong, token is no longer valid.",
            });
        req.user = user;
        next();
    });
};

module.exports = {
    restricted,
};

// Other restricted middleware is better standard for Bearer APIS
// const restricted2 = (req, res, next) => {
//     const token = req.headers.authorization;
//     if (!token) {
//         res.status(403).json("You are not authorized");
//     } else {
//         jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
//             if (err) {
//                 res.status(403).json("Your token of authorization is invalid");
//             } else {
//                 req.decodedJWT = decodedToken;
//                 next();
//             }
//         });
//     }
// };
