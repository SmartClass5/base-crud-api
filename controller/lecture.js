const { Lecture } = require('../models/lecture');
const _ = require('lodash')
let LectureController ={}
// 강좌 관련

// const LectureSchemma = new mongoose.Schema({
//     category: { type: String, required: true }, // 카테고리
//     sub_category: { type: String, default:"" }, //카테고리 -부
//     title: { type: String, required: true }, // 강좌명
//     sub_title: { type: String, default:"" }, // 부 제목
//     intro: { type: String, default:"" }, // 강의 소개
//     thumbnail: { type: Array, default:[] }, // 강의 소개
//     difficulty: { type: String, default:"중" }, // 강의 소개
//     tag: { type: Array, default:[] }, // 강의 소개
//     for_recommend: { type: Array, default:[] }, // 강의 소개
//     paid: { type: Number, default:0 }, // 강의 소개
//     review: [{ type: ObjectId , ref: "review" }], // 신청 강좌 정보
//     body: { type: String, default:"중" }, // 강의 소개
//     pay_div: { type: Boolean, default:false }, // 강의 소개
//     teacher: [{ type: ObjectId , required: true, ref: "techer" }], // 신청 강좌 정보
//     curriculum_summary:{ type: Array, default:[] }
// }, { timestapms: true })

/**
 * 
 * 강좌 조회
 * @param {*} req 
 * @param {id} res.params 
 * @param {limit, sort, title, page} res.query 
 * @param {*} res.body 
 * @param {*} next 
 */
 LectureController.getLecture= async (req,res,next)=>{
    let result = []
    const { id } = _.get(req,'params')
    const {limit =0, sort='title', page=1} = _.get(req,'query')
    try {
        if(_.isEmpty(id)){
         result = await Lecture.find().sort({sort:1}).limit(limit).skip(limit*(page-1))
        }else{
            result = await Lecture.find({_id:id})
        }
        res.status(200).json({data:result})
    } catch (error) {
        res.status(400).json({path:"LectureController.getLecture Error",error})
    }
   
}
/**
 * 
 * 강좌 생성
 * @param {*} req 
 * @param {} res.params 
 * @param {} res.query 
 * @param  { category, sub_category, title,sub_title,intro,thumbnail,difficulty,tag,for_recommend,paid,review,body,pay_div,teacher,curriculum_summary }  res.body 
 * @param {*} next 
 */
LectureController.createLecture= async (req,res,next)=>{
    const { category, sub_category, title,sub_title,intro,thumbnail,difficulty,tag,for_recommend,paid,review,body,pay_div,teacher,curriculum_summary } = req.body;
    try{
        const result = await Lecture.updateOne(
            { category, sub_category, title,sub_title,intro,thumbnail,difficulty,tag,for_recommend,paid,review,body,pay_div,teacher,curriculum_summary } ,
            { category, sub_category, title,sub_title,intro,thumbnail,difficulty,tag,for_recommend,paid,review,body,pay_div,teacher,curriculum_summary } ,
            {upsert:true})
    
        res.status(200).json({data:result})
    }catch(error){
        res.status(400).json({path:"LectureController.createLecture Error",error})
    }
}

/**
 * 
 * 강좌 수정
 * @param {*} req 
 * @param { id } res.params 
 * @param {} res.query 
 * @param { name, user, lecture_title,lecture } res.body 
 * @param {*} next 
 */
LectureController.updateLecture= async (req,res,next)=>{
    let result = []
    const { id } = _.get(req,'params')
    const  { category, sub_category, title,sub_title,intro,thumbnail,difficulty,tag,for_recommend,paid,review,body,pay_div,teacher,curriculum_summary } = req.body;
    console.log({ title, sub_title , thumbnail })
    let update ={}

    if(_.isEmpty(id)){
        throw new Error({message:"cat not find id"})
    }
    try{
        const result = await Lecture.updateOne(
            {_id:id},
            { category, sub_category, title,sub_title,intro,thumbnail,difficulty,tag,for_recommend,paid,review,body,pay_div,teacher,curriculum_summary } ,
            {upsert:true})
    
        res.status(200).json({data:result})
    }catch(error){
        res.status(400).json({path:"LectureController.updateLecture Error",error})
    }
}
/**
 * 
 * 강좌 삭제
 * @param {*} req 
 * @param {id} res.params 
 * @param {limit, sort, title, page} res.query 
 * @param {*} res.body 
 * @param {*} next 
 */
LectureController.deleteLecture= async (req,res,next)=>{
    try {
        const { id } = _.get(req,'params')
        const result = await Lecture.findOneAndRemove({_id:id})
        res.status(200).json({data:result})
    } catch (error) {
        res.status(400).json({path:"LectureController.deleteLecture Error",error})
    }
   
}

module.exports = LectureController;