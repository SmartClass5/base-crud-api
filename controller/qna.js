const { QNA } = require('../models/qna');
const _ = require('lodash')
let QNAController ={}
// QNA 관련

// const QNASchemma = new mongoose.Schema({
//     title: { type: String, required: true },
//     hit: { type: Number, required: true },
//     author: [{ type: ObjectId , ref: "user-permission" }],
//     author_name: { type: String, required: true },
//     body: { type: String, required: true },
// }, { timestapms: true })


/**
 * 
 * QNA 조회
 * @param {*} req 
 * @param {id} res.params 
 * @param {limit, sort, title, page} res.query 
 * @param {*} res.body 
 * @param {*} next 
 */
 QNAController.getQNA= async (req,res,next)=>{
    let result = []
    const { id } = _.get(req,'params')
    const {limit =0, sort='title', page=1} = _.get(req,'query')
    try {
        if(_.isEmpty(id)){
         result = await QNA.find().sort({sort:1}).limit(limit).skip(limit*(page-1))
        }else{
            result = await QNA.find({_id:id})
        }
        res.status(200).json({data:result})
    } catch (error) {
        res.status(400).json({path:"QNAController.getQNA Error",error})
    }
   
}
/**
 * 
 * QNA 생성
 * @param {*} req 
 * @param {} res.params 
 * @param {} res.query 
 * @param { title, hit, author, author_name, body } res.body 
 * @param {*} next 
 */
QNAController.createQNA= async (req,res,next)=>{
    const{ title, hit, author, author_name, body } = req.body;
    try{
        const result = await QNA.updateOne(
            {title, sub_title , thumbnail},
            req.body,
            {upsert:true})
    
        res.status(200).json({data:result})
    }catch(error){
        res.status(400).json({path:"QNAController.createQNA Error",error})
    }
}

/**
 * 
 * QNA 수정
 * @param {*} req 
 * @param { id } res.params 
 * @param {} res.query 
 * @param { title, hit, author, author_name, body } res.body 
 * @param {*} next 
 */
QNAController.updateQNA= async (req,res,next)=>{
    let result = []
    const { id } = _.get(req,'params')
    const { title, hit, author, author_name, body } = req.body;
    let update ={}

    if(_.isEmpty(id)){
        throw new Error({message:"cat not find id"})
    }
    try{
        const result = await QNA.updateOne(
            {_id:id},
            { title, hit, author, author_name, body },
            {upsert:true})
    
        res.status(200).json({data:result})
    }catch(error){
        res.status(400).json({path:"QNAController.updateQNA Error",error})
    }
}
/**
 * 
 * QNA 삭제
 * @param {*} req 
 * @param {id} res.params 
 * @param {*} res.body 
 * @param {*} next 
 */
QNAController.deleteQNA= async (req,res,next)=>{
    try {
        const { id } = _.get(req,'params')
        const result = await QNA.findOneAndRemove({_id:id})
        res.status(200).json({data:result})
    } catch (error) {
        res.status(400).json({path:"QNAController.deleteQNA Error",error})
    }
   
}
module.exports = QNAController;