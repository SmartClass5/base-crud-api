const { Notice } = require('../models/notice');
const _ = require('lodash')
let NoticeController ={}
// 공지사항 관련

// const NoticeSchemma = new mongoose.Schema({
//     title: { type: String, required: true },
//     hit: { type: Number, required: true },
//     author: [{ type: ObjectId , ref: "user-permission" }],
//     author_name: { type: String, required: true },
//     body: { type: String, required: true },
// }, { timestapms: true })


/**
 * 
 * 공지사항 조회
 * @param {*} req 
 * @param {id} res.params 
 * @param {limit, sort, title, page} res.query 
 * @param {*} res.body 
 * @param {*} next 
 */
 NoticeController.getNotice= async (req,res,next)=>{
    let result = []
    const { id } = _.get(req,'params')
    const {limit =0, sort='title', page=1} = _.get(req,'query')
    try {
        if(_.isEmpty(id)){
         result = await Notice.find().sort({sort:1}).limit(limit).skip(limit*(page-1))
        }else{
            result = await Notice.find({_id:id})
        }
        res.status(200).json({data:result})
    } catch (error) {
        res.status(400).json({path:"NoticeController.getNotice Error",error})
    }
   
}
/**
 * 
 * 공지사항 생성
 * @param {*} req 
 * @param {} res.params 
 * @param {} res.query 
 * @param { title, hit, author, author_name, body } res.body 
 * @param {*} next 
 */
NoticeController.createNotice= async (req,res,next)=>{
    const{ title, hit, author, author_name, body } = req.body;
    try{
        const result = await Notice.updateOne(
            {title, sub_title , thumbnail},
            req.body,
            {upsert:true})
    
        res.status(200).json({data:result})
    }catch(error){
        res.status(400).json({path:"NoticeController.createNotice Error",error})
    }
}

/**
 * 
 * 공지사항 수정
 * @param {*} req 
 * @param { id } res.params 
 * @param {} res.query 
 * @param { title, hit, author, author_name, body } res.body 
 * @param {*} next 
 */
NoticeController.updateNotice= async (req,res,next)=>{
    let result = []
    const { id } = _.get(req,'params')
    const { title, hit, author, author_name, body } = req.body;
    let update ={}

    if(_.isEmpty(id)){
        throw new Error({message:"cat not find id"})
    }
    try{
        const result = await Notice.updateOne(
            {_id:id},
            { title, hit, author, author_name, body },
            {upsert:true})
    
        res.status(200).json({data:result})
    }catch(error){
        res.status(400).json({path:"NoticeController.updateNotice Error",error})
    }
}
/**
 * 
 * 공지사항 삭제
 * @param {*} req 
 * @param {id} res.params 
 * @param {*} res.body 
 * @param {*} next 
 */
NoticeController.deleteNotice= async (req,res,next)=>{
    try {
        const { id } = _.get(req,'params')
        const result = await Notice.findOneAndRemove({_id:id})
        res.status(200).json({data:result})
    } catch (error) {
        res.status(400).json({path:"NoticeController.deleteNotice Error",error})
    }
   
}

module.exports = NoticeController;