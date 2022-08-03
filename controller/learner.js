const { Learner } = require('../models/learner');
const _ = require('lodash')
let LearnerController ={}

// 수강생 관련
// const LearnerSchemma = new mongoose.Schema({
//     name: { type: String, required: true },// 수강생명
//     user: [{ type: ObjectId , ref: "user-permission" }], // 유저 정보
//     "lecture-title":{ type: String, required: true },// 신청 강좌명,
//     lecture: [{ type: ObjectId , ref: "lecture" }], // 신청 강좌 정보
// }, { timestapms: true })

/**
 * 
 * 수강생 조회
 * @param {*} req 
 * @param {id} res.params 
 * @param {limit, sort, title, page} res.query 
 * @param {*} res.body 
 * @param {*} next 
 */
 LearnerController.getLearner= async (req,res,next)=>{
    let result = []
    const { id } = _.get(req,'params')
    const {limit =0, sort='title', page=1} = _.get(req,'query')
    try {
        if(_.isEmpty(id)){
         result = await Learner.find().sort({sort:1}).limit(limit).skip(limit*(page-1))
        }else{
            result = await Learner.find({_id:id})
        }
        res.status(200).json({data:result})
    } catch (error) {
        res.status(400).json({path:"LearnerController.getLearner Error",error})
    }
   
}
/**
 * 
 * 수강생 생성
 * @param {*} req 
 * @param {} res.params 
 * @param {} res.query 
 * @param { name, user, lecture_title,lecture } res.body 
 * @param {*} next 
 */
LearnerController.createLearner= async (req,res,next)=>{
    const { name, user, lecture_title,lecture } = req.body;
    try{
        const result = await Learner.updateOne(
            { name, user, lecture_title,lecture } ,
            req.body,
            {upsert:true})
    
        res.status(200).json({data:result})
    }catch(error){
        res.status(400).json({path:"LearnerController.createLearner Error",error})
    }
}

/**
 * 
 * 수강생 수정
 * @param {*} req 
 * @param { id } res.params 
 * @param {} res.query 
 * @param { name, user, lecture_title,lecture } res.body 
 * @param {*} next 
 */
LearnerController.updateLearner= async (req,res,next)=>{
    let result = []
    const { id } = _.get(req,'params')
    const { name, user, lecture_title,lecture }= req.body;
    console.log({ title, sub_title , thumbnail })
    let update ={}

    if(_.isEmpty(id)){
        throw new Error({message:"cat not find id"})
    }
    try{
        const result = await Learner.updateOne(
            {_id:id},
            { name, user, lecture_title,lecture },
            {upsert:true})
    
        res.status(200).json({data:result})
    }catch(error){
        res.status(400).json({path:"LearnerController.updateLearner Error",error})
    }
}
/**
 * 
 * 수강생 삭제
 * @param {*} req 
 * @param {id} res.params 
 * @param {limit, sort, title, page} res.query 
 * @param {*} res.body 
 * @param {*} next 
 */
LearnerController.deleteLearner= async (req,res,next)=>{
    try {
        const { id } = _.get(req,'params')
        const result = await Learner.findOneAndRemove({_id:id})
        res.status(200).json({data:result})
    } catch (error) {
        res.status(400).json({path:"LearnerController.deleteLearner Error",error})
    }
   
}
module.exports = LearnerController;