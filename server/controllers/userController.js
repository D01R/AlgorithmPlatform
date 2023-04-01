const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User,  Basket } = require('../models/models')


function generateJwt(id, email, role){
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '12h'}
    )
}


class UserController{

    async registration(req,res, next){
        const {email, password, phone, role} = req.body
        if (!email || !password || !phone){
            return next(ApiError.badRequest("Некорректный email, password или phone"))
        }
        const candidate = await User.findOne({where: {email, phone}})
        if (candidate){
            return next(ApiError.badRequest("Пользователь с таким email или phone уже существует"))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({phone, email, password: hashPassword, role})
        const basket = await Basket.create({userId: user.id, discount: 0})
        const token = generateJwt(user.id,user.email,user.role)

        return res.json({token})
    }


    async login(req,res, next){
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user){
            return next(ApiError.internal("Пользователь не найден"))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword){
            return next(ApiError.internal("Неверная почта или пароль"))
        }

        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }


    async check(req,res,next){
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }
}

module.exports = new UserController()