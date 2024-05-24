const { comparePassword } = require("../helpers/bcryptjs");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models");
const axios = require('axios');
require("dotenv").config();
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();




class UserController {
    static async register(req, res, next) {
        try {
            const { username, email, password } = req.body;
            const data = await User.create({
                username,
                email,
                password,
            });
            res.status(201).json({ msg: `${data.username} has ready to login` });
        } catch (error) {
            next(error);
        }
    }
    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            if (!email) throw { name: "BadRequest", msg: "email must be exist" };
            if (!password)
                throw { name: "BadRequest", msg: "password must be exist" };
            const data = await User.findOne({ where: { email } });
            if (!data) {
                throw { name: "unauthorized", msg: "email/password invalid" };
            }
            const validPassword = comparePassword(password, data.password);

            if (!validPassword)
                throw { name: "unauthorized", msg: "email/password invalid" };
            const access_token = signToken({ id: data.id });
            res.status(201).json({ token: access_token });
        } catch (error) {
            next(error);
        }
    }
    static async GoogleLogin(req, res, next) {
        try {
            const { google_token } = req.headers;
            const ticket = await client.verifyIdToken({
                idToken: google_token,
                audience: process.env.CLIENT_ID,
            });
            const payload = ticket.getPayload();
            const [user, created] = await User.findOrCreate({
                where: { email : payload.email },
                defaults: {
                    username: payload.name,
                    email: payload.email,
                    password: String(Math.random() * 10000),
                },
            });
            const access_token = signToken({ id: user.id,email:user.email });
            res.status(200).json({ message: `loggin from ${user.email}`, access_token });
        } catch (error) {
            next(error);
        }
    }
    static async githubLogin(req, res, next) {
        try {
            req.query.code;
            const params =
                "?client_id=" +
                process.env.CLIENT_ID_GITHUB +
                "&client_secret=" +
                process.env.CLIENT_SECRET_GITHUB +
                "&code=" +
                req.query.code +
                "&scope=user:mail";

            const { data } = await axios({
                url: "https://github.com/login/oauth/access_token" + params,
                method: "POST",
                headers: {
                    Accept: "application/json",
                },
            });
            // console.log(data);

            let payload = await axios({
                method: "get",
                url: "https://api.github.com/user",
                headers: {
                    Authorization: "Bearer " + data.access_token,
                },
            });
            // console.log(payload);
            const [user, created] = await User.findOrCreate({
                where: { email: `${payload.data.login}@mail.com` },
                defaults: {
                    username: payload.data.name,
                    email: `${payload.data.login}@mail.com`,
                    password: String(Math.random() * 10000),
                },
            });
            // console.log(user);
            const access_token = signToken({
                id: user.id, email: user.email
            });
            res.status(200).json({ access_token, email: user.email });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = UserController;
