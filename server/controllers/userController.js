const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models/models')
const  { Op } = require('sequelize')


function generateJwt(id, login, role){
    return jwt.sign(
        {id, login, role},
        process.env.SECRET_KEY,
        {expiresIn: '12h'}
    )
}


class UserController{

    async registration(req, res, next){
        const {login, mail, password, name, surname, role, universityId} = req.body
        console.log(login);
        //if (!login || !password || !mail || !name || !surname || !universityId){
        if (!login || !password || !mail || !name || !surname){
            return next(ApiError.badRequest("Проверьте все поля"));
        }
        const candidate = await User.findOne({
            where: {
                [Op.or]: [{mail}, {login}]
            }
        });
        if (candidate){
            console.log(candidate)
            return next(ApiError.badRequest("Пользователь с таким email или login уже существует"));
        }
        const passwordHash = await bcrypt.hash(password, 5)
        const user = await User.create({login, mail, passwordHash, role, name, surname, universityId})
        const token = generateJwt(user.id, user.login, user.role)

        return res.json({token})
    }


    async login(req, res, next){
        const {loginOrMail, password} = req.body

        const findProp = loginOrMail.includes('@')? {mail: loginOrMail}: {login: loginOrMail};
        const user = await User.findOne({
            where: findProp
        })
        if (!user){
            return next(ApiError.internal("Пользователь не найден"))
        }
        let comparePassword = bcrypt.compareSync(password, user.passwordHash)
        if (!comparePassword){
            return next(ApiError.internal("Пользователь не найден"))
        }

        const token = generateJwt(user.id, user.login, user.role)
        return res.json({token})
    }


    async check(req, res, next){
        const token = generateJwt(req.user.id, req.user.login, req.user.role)
        return res.json({token})
    }
}

module.exports = new UserController()