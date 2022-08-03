const { DockerImage } = require('../models/docker-image');
const _ = require('lodash')
let DockerImageController ={}

// 도커 이미지 리스트 관련
// const DockerImageSchemma = new mongoose.Schema({
//     title: { type: String, required: true }, // 이미지 명칭
//     version: { type: String, required: true }, // 이미지 버전
//     url: { type: String, required: true }, // 이미지 가져올 허브 주소
//     lecture: [{ type: ObjectId , ref: "lecture" }], // 연관 강의
//     thumbnail: { type: Array , default:[]}, // 이미지 썸네일
    
// }, { timestapms: true })

/**
 * 
 * 도커 이미지 리스트  조회
 * @param {*} req 
 * @param {id} res.params 
 * @param {limit, sort, title, page} res.query 
 * @param {*} res.body 
 * @param {*} next 
 */
 DockerImageController.getDockerImage= async (req,res,next)=>{
    let result = []
    const { id } = _.get(req,'params')
    const {limit =0, sort='title', page=1} = _.get(req,'query')
    try {
        if(_.isEmpty(id)){
         result = await DockerImage.find().sort({sort:1}).limit(limit).skip(limit*(page-1))
        }else{
            result = await DockerImage.find({_id:id})
        }
        res.status(200).json({data:result})
    } catch (error) {
        res.status(400).json({path:"DockerImageController.getDockerImage Error",error})
    }
   
}
/**
 * 
 * 도커 이미지 리스트  생성
 * @param {*} req 
 * @param {} res.params 
 * @param {} res.query 
 * @param { title, version , url,lecture,thumbnail } res.body 
 * @param {*} next 
 */
DockerImageController.createDockerImage= async (req,res,next)=>{
    const { title, version , url,lecture,thumbnail } = req.body;
    try{
        const result = await DockerImage.updateOne(
            { title, version , url,lecture,thumbnail },
            req.body,
            {upsert:true})
    
        res.status(200).json({data:result})
    }catch(error){
        res.status(400).json({path:"DockerImageController.createDockerImage Error",error})
    }
}

/**
 * 
 * 도커 이미지 리스트  수정
 * @param {*} req 
 * @param { id } res.params 
 * @param {} res.query 
 * @param { title, version , url,lecture,thumbnail } res.body 
 * @param {*} next 
 */
DockerImageController.updateDockerImage= async (req,res,next)=>{
    let result = []
    const { id } = _.get(req,'params')
    const { title, version , url,lecture,thumbnail } = req.body;
    let update ={}

    if(_.isEmpty(id)){
        throw new Error({message:"cat not find id"})
    }
    try{
        const result = await DockerImage.updateOne(
            { _id:id },
            { title, version , url,lecture,thumbnail },
            {upsert:true})
    
        res.status(200).json({data:result})
    }catch(error){
        res.status(400).json({path:"DockerImageController.updateDockerImage Error",error})
    }
}
/**
 * 
 * 도커 이미지 리스트  삭제
 * @param {*} req 
 * @param {id} res.params 
 * @param {*} res.body 
 * @param {*} next 
 */
DockerImageController.deleteDockerImage= async (req,res,next)=>{
    try {
        const { id } = _.get(req,'params')
        const result = await DockerImage.findOneAndRemove({_id:id})
        res.status(200).json({data:result})
    } catch (error) {
        res.status(400).json({path:"DockerImageController.deleteDockerImage Error",error})
    }
   
}

module.exports = DockerImageController;