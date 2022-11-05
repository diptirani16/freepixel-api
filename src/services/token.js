const jwt = require('jsonwebtoken');

const { sign: jwtSign, verify: jwtVerify } = jwt;

const JWT_SECRET = process.env.JWT_SECRET;

function sign(user) {
    return new Promise((resolve, reject) => {
        jwtSign({
            given_name: user.name,
            email: user.email,
            _id: user._id,
            points: user.points
        }, JWT_SECRET, {
            issuer: 'FreePixel',
            audience: 'frontend',
            subject: 'authentication',
            expiresIn: '2h',
            notBefore: '-5s'
        }, (err, encoded) => {
            if(err) reject(err);
            else resolve(encoded);
        })
    })
}

function verify(token) {
    return new Promise((resolve, reject) => {
        jwtVerify(token, JWT_SECRET, {
            issuer: 'FreePixel',
            audience: 'frontend',
            subject: 'authentication',
            expiresIn: '2h',
            notBefore: '-5s'
        }, (err, encoded) => {
            if(err) reject(err);
            else resolve(encoded);
        })
    })
}

module.exports = { sign, verify };