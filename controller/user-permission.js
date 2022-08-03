const { User } = require('../models/user-permission');
const _ = require('lodash')
let UserController = {}
//  유저 권한  관련
// const UserSchemma = new mongoose.Schema({
//     title: { type: String, required: true },
// }, { timestapms: true })

// }, { timestapms: true })
/**
 * 
 *  유저 권한  조회
 * @param {*} req 
 * @param {id} res.params 
 * @param {limit, sort, title, page} res.query 
 * @param {*} res.body 
 * @param {*} next 
 */
UserController.getUser = async (req, res, next) => {
    let result = []
    const { id } = _.get(req, 'params')
    const { limit = 0, sort = 'title', page = 1 } = _.get(req, 'query')
    try {
        if (_.isEmpty(id)) {
            result = await User.find().sort({ sort: 1 }).limit(limit).skip(limit * (page - 1))
        } else {
            result = await User.find({ _id: id })
        }
        res.status(200).json({ data: result })
    } catch (error) {
        res.status(400).json({ path: "UserController.getUser Error", error })
    }

}
/**
 * 
 *  유저 권한  생성
 * @param {*} req 
 * @param {} res.params 
 * @param {} res.query 
 * @param { userid , email, password, name, phone, smsalert, authority, photo  } res.body 
 * @param {*} next 
 */
UserController.createUser = async (req, res, next) => {
    const { userid , email, password, name, phone, smsalert, authority, photo  } = req.body;
    try {
        const result = await User.updateOne(
            { userid , email, password, name, phone, smsalert, authority, photo  },
            req.body,
            { upsert: true })

        res.status(200).json({ data: result })
    } catch (error) {
        res.status(400).json({ path: "UserController.createUser Error", error })
    }
}

/**
 * 
 *  유저 권한  수정
 * @param {*} req 
 * @param { id } res.params 
 * @param {} res.query 
 * @param { userid , email, password, name, phone, smsalert, authority, photo  } res.body 
 * @param {*} next 
 */
UserController.updateUser = async (req, res, next) => {
    let result = []
    const { id } = _.get(req, 'params')
    const { userid , email, password, name, phone, smsalert, authority, photo  } = req.body;
    let update = {}

    if (_.isEmpty(id)) {
        throw new Error({ message: "cat not find id" })
    }
    try {
        const result = await User.updateOne(
            { _id: id },
            { userid , email, password, name, phone, smsalert, authority, photo  },
            { upsert: true })

        res.status(200).json({ data: result })
    } catch (error) {
        res.status(400).json({ path: "UserController.updateUser Error", error })
    }
}
/**
 * 
 *  유저 권한  삭제
 * @param {*} req 
 * @param {id} res.params 
 * @param {*} res.body 
 * @param {*} next 
 */
UserController.deleteUser = async (req, res, next) => {
    try {
        const { id } = _.get(req, 'params')
        const result = await User.findOneAndRemove({ _id: id })
        res.status(200).json({ data: result })
    } catch (error) {
        res.status(400).json({ path: "UserController.deleteUser Error", error })
    }

}
module.exports = UserController;