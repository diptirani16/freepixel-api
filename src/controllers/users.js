const mongoose = require('mongoose');
const Users = require('../models/users');
const Images = require('../models/images');

const { hashPassword, verifyPassword } = require('../services/auth');

const { sign } = require('../services/token');
const jsonwebtoken = require('jsonwebtoken');

module.exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name && !email && !password) return res.status(400).send({ success: false, message: 'Name, email and password not provided' });
        const hash = hashPassword(password);
        await Users.create({
            name,
            email,
            password: hash
        })
        return res.status(201).send({ success: true, message: 'User registered' });
    } catch (error) {
        if (error.code == 11000) {
            return res.status(409).send({ success: false, message: 'EmailId already in use' })
        } else return res.status(500).send({ success: false, message: 'Internal server error' })
    }

}

module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ email });
        if (!user) return res.status(404).send({ success: false, message: 'You are not registered' });
        const isValid = verifyPassword(user.password, password);
        if (isValid) {
            const token = await sign(user);
            return res.status(200).send({ success: true, message: 'Login successful', result: { token, user: jsonwebtoken.decode(token) } });
        } else return res.status(401).send({ success: false, message: 'Invalid email or password' })
    } catch (error) {
        return res.status(401).send({ success: false, message: 'Internal server error' });
    }

}