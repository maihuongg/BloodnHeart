const jwt = require('jsonwebtoken')
const authMiddleware = {
    //verify Token
    verifyToken: (req, res, next) => {
        const token = req.headers.token;
        if (token) {
            //bearer accesss => split
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (error, account) => {
                if (error) {
                    return res.status(403).json({
                        message: "TOKEN không còn hiệu lực"
                    });
                }
                req.account = account;
                next();
            });
            
        }
        else {
            return res.status(401).json({
                message: "Bạn không có quyền này !"
            })
        }
    },
    isAdmin: (req, res, next) => {
        authMiddleware.verifyToken(req, res, () => {
            if (req.account.isAdmin) {
                return next();
            }
            else {
                return res.status(403).json({ message: "Bạn không có quyền này" });
            }
        })
    },
    isHospital: (req, res, next) => {
        authMiddleware.verifyToken(req, res, () => {
            if (req.account.isHospital) {
                next();
            }
            return res.status(403).json({ message: "Bạn không có quyền này" });

        })

    }
}
module.exports = authMiddleware;