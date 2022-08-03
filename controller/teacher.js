const { Teacher } = require('../models/teacher');
const _ = require('lodash')
let TeacherController ={}
//  강의자  관련
// const TeacherSchemma = new mongoose.Schema({
//     name: { type: String, required: true },
//     user: [{ type: ObjectId , ref: "user-permission" }], // 유저 정보
//     lecture_list: [{ type: ObjectId , ref: "lecture" }], // 신청 강좌 정보
//     intor:{ type:Array, default:[]}
// }, { timestapms: true })

/**
 * 
 *  강의자  조회
 * @param {*} req 
 * @param {id} res.params 
 * @param {limit, sort, title, page} res.query 
 * @param {*} res.body 
 * @param {*} next 
 */
 TeacherController.getTeacher= async (req,res,next)=>{
    let result = []
    const { id } = _.get(req,'params')
    const {limit =0, sort='title', page=1} = _.get(req,'query')
    try {
        if(_.isEmpty(id)){
         result = await Teacher.find().sort({sort:1}).limit(limit).skip(limit*(page-1))
        }else{
            result = await Teacher.find({_id:id})
        }
        res.status(200).json({data:result})
    } catch (error) {
        res.status(400).json({path:"TeacherController.getTeacher Error",error})
    }
   
}
/**
 * 
 *  강의자  생성
 * @param {*} req 
 * @param {} res.params 
 * @param {} res.query 
 * @param { name, user, lecture_list, intor } res.body 
 * @param {*} next 
 */
TeacherController.createTeacher= async (req,res,next)=>{
    const{ name, user, lecture_list, intor } = req.body;
    try{
        const result = await Teacher.updateOne(
            { name, user, lecture_list, intor },
            req.body,
            {upsert:true})
    
        res.status(200).json({data:result})
    }catch(error){
        res.status(400).json({path:"TeacherController.createTeacher Error",error})
    }
}

/**
 * 
 *  강의자  수정
 * @param {*} req 
 * @param { id } res.params 
 * @param {} res.query 
 * @param { name, user, lecture_list, intor } res.body 
 * @param {*} next 
 */
TeacherController.updateTeacher= async (req,res,next)=>{
    let result = []
    const { id } = _.get(req,'params')
    const { name, user, lecture_list, intor } = req.body;
    let update ={}

    if(_.isEmpty(id)){
        throw new Error({message:"cat not find id"})
    }
    try{
        const result = await Teacher.updateOne(
            {_id:id},
            { name, user, lecture_list, intor },
            {upsert:true})
    
        res.status(200).json({data:result})
    }catch(error){
        res.status(400).json({path:"TeacherController.updateTeacher Error",error})
    }
}
/**
 * 
 *  강의자  삭제
 * @param {*} req 
 * @param {id} res.params 
 * @param {*} res.body 
 * @param {*} next 
 */
TeacherController.deleteTeacher= async (req,res,next)=>{
    try {
        const { id } = _.get(req,'params')
        const result = await Teacher.findOneAndRemove({_id:id})
        res.status(200).json({data:result})
    } catch (error) {
        res.status(400).json({path:"TeacherController.deleteTeacher Error",error})
    }
   
}

module.exports = TeacherController;