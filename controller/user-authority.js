const { UserAuthority } = require('../models/user-authority');
const _ = require('lodash')
let UserAuthorityController ={}
//  유저 권한  관련
// const UserAuthoritySchemma = new mongoose.Schema({
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
 UserAuthorityController.getUserAuthority= async (req,res,next)=>{
    let result = []
    const { id } = _.get(req,'params')
    const {limit =0, sort='title', page=1} = _.get(req,'query')
    try {
        if(_.isEmpty(id)){
         result = await UserAuthority.find().sort({sort:1}).limit(limit).skip(limit*(page-1))
        }else{
            result = await UserAuthority.find({_id:id})
        }
        res.status(200).json({data:result})
    } catch (error) {
        res.status(400).json({path:"UserAuthorityController.getUserAuthority Error",error})
    }
   
}
/**
 * 
 *  유저 권한  생성
 * @param {*} req 
 * @param {} res.params 
 * @param {} res.query 
 * @param { title } res.body 
 * @param {*} next 
 */
UserAuthorityController.createUserAuthority= async (req,res,next)=>{
    const{ title } = req.body;
    try{
        const result = await UserAuthority.updateOne(
            { title },
            req.body,
            {upsert:true})
    
        res.status(200).json({data:result})
    }catch(error){
        res.status(400).json({path:"UserAuthorityController.createUserAuthority Error",error})
    }
}

/**
 * 
 *  유저 권한  수정
 * @param {*} req 
 * @param { id } res.params 
 * @param {} res.query 
 * @param { title } res.body 
 * @param {*} next 
 */
UserAuthorityController.updateUserAuthority= async (req,res,next)=>{
    let result = []
    const { id } = _.get(req,'params')
    const { title } = req.body;
    let update ={}

    if(_.isEmpty(id)){
        throw new Error({message:"cat not find id"})
    }
    try{
        const result = await UserAuthority.updateOne(
            {_id:id},
            { title },
            {upsert:true})
    
        res.status(200).json({data:result})
    }catch(error){
        res.status(400).json({path:"UserAuthorityController.updateUserAuthority Error",error})
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
UserAuthorityController.deleteUserAuthority= async (req,res,next)=>{
    try {
        const { id } = _.get(req,'params')
        const result = await UserAuthority.findOneAndRemove({_id:id})
        res.status(200).json({data:result})
    } catch (error) {
        res.status(400).json({path:"UserAuthorityController.deleteUserAuthority Error",error})
    }
   
}

module.exports = UserAuthorityController;