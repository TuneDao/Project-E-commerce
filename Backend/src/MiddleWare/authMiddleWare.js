const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authMiddleWare = (req, res, next) => {
    const token = req.headers.token.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(404).json({
                status: 'ERROR',
                message: 'Unauthorized'
            })
        }
        if (user?.isAdmin) {
            next()
        }
        else {
            return res.status(404).json({
                status: 'ERROR',
                message: 'Unauthorized'
            })
        }

    });
}
const authUserMiddleWare = (req, res, next) => {
    const token = req.headers.token.split(' ')[1]
    const userId = req.params.id
    console.log('id: ', req.params.id)
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(404).json({
                status: 'ERROR',
                message: 'Unauthorized'
            })
        }
        if (user?.isAdmin || user?.id) {
            next()
        }
        else {
            return res.status(404).json({
                status: 'ERROR',
                message: 'Unauthorized'
            })
        }

    });
}

module.exports = {
    authMiddleWare,
    authUserMiddleWare
}