const { Review } = require('../models/review');
const _ = require('lodash')
let ReviewController ={}
// 수강 후기 관련
// const ReviewSchemma = new mongoose.Schema({
//     author: [{ type: ObjectId , ref: "user-permission" }],
//     author_name: { type: String, required: true },
//     grade: { type: Number, required: true },
//     body: { type: String, required: true },
   
// }, { timestapms: true })
/**
 * 
 * 수강 후기 조회
 * @param {*} req 
 * @param {id} res.params 
 * @param {limit, sort, title, page} res.query 
 * @param {*} res.body 
 * @param {*} next 
 */
 ReviewController.getReview= async (req,res,next)=>{
    let result = []
    const { id } = _.get(req,'params')
    const {limit =0, sort='title', page=1} = _.get(req,'query')
    try {
        if(_.isEmpty(id)){
         result = await Review.find().sort({sort:1}).limit(limit).skip(limit*(page-1))
        }else{
            result = await Review.find({_id:id})
        }
        res.status(200).json({data:result})
    } catch (error) {
        res.status(400).json({path:"ReviewController.getReview Error",error})
    }
   
}
/**
 * 
 * 수강 후기 생성
 * @param {*} req 
 * @param {} res.params 
 * @param {} res.query 
 * @param { author, author_name, grade, body } res.body 
 * @param {*} next 
 */
ReviewController.createReview= async (req,res,next)=>{
    const{ author, author_name, grade, body } = req.body;
    try{
        const result = await Review.updateOne(
            {title, sub_title , thumbnail},
            req.body,
            {upsert:true})
    
        res.status(200).json({data:result})
    }catch(error){
        res.status(400).json({path:"ReviewController.createReview Error",error})
    }
}

/**
 * 
 * 수강 후기 수정
 * @param {*} req 
 * @param { id } res.params 
 * @param {} res.query 
 * @param { author, author_name, grade, body } res.body 
 * @param {*} next 
 */
ReviewController.updateReview= async (req,res,next)=>{
    let result = []
    const { id } = _.get(req,'params')
    const { author, author_name, grade, body } = req.body;
    let update ={}

    if(_.isEmpty(id)){
        throw new Error({message:"cat not find id"})
    }
    try{
        const result = await Review.updateOne(
            {_id:id},
            { author, author_name, grade, body },
            {upsert:true})
    
        res.status(200).json({data:result})
    }catch(error){
        res.status(400).json({path:"ReviewController.updateReview Error",error})
    }
}
/**
 * 
 * 수강 후기 삭제
 * @param {*} req 
 * @param {id} res.params 
 * @param {*} res.body 
 * @param {*} next 
 */
ReviewController.deleteReview= async (req,res,next)=>{
    try {
        const { id } = _.get(req,'params')
        const result = await Review.findOneAndRemove({_id:id})
        res.status(200).json({data:result})
    } catch (error) {
        res.status(400).json({path:"ReviewController.deleteReview Error",error})
    }
   
}

module.exports = ReviewController;