const { Content } = require('../models/content');
const _ = require('lodash')
let ContentController ={}


// 강좌 내용 관련
// const ContentSchemma = new mongoose.Schema({
//     title: { type: String, required: true },// 컨텐츠명
//     order: { type: Number, required: true },// 콘텐츠 순서
//     type: { type: String, required: true }, // 콘텐츠 타입
//     data: {
//         url:{ type: String, default:"" }, // 영상 및 자료 링크
//         body:{ type: String, default:""  }, // 내용
//         description:{ type: String, default:""  }, // 학습 목표 및 부가 정보
//     }
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
 ContentController.getContent= async (req,res,next)=>{
    let result = []
    const { id } = _.get(req,'params')
    const {limit =0, sort='title', page=1} = _.get(req,'query')
    try {
        if(_.isEmpty(id)){
         result = await Content.find().sort({sort:1}).limit(limit).skip(limit*(page-1))
        }else{
            result = await Content.find({_id:id})
        }
        res.status(200).json({data:result})
    } catch (error) {
        res.status(400).json({path:"ContentController.getContent Error",error})
    }
   
}
/**
 * 
 * 강좌 생성
 * @param {*} req 
 * @param {} res.params 
 * @param {} res.query 
 * @param { title, order,type, data:{url, body,description}} res.body 
 * @param {*} next 
 */
ContentController.createContent= async (req,res,next)=>{
    const { title, order,type, data:{url, body,description}} = req.body;
    try{
        const result = await Content.updateOne(
            {title, order,type, data:{url, body,description}},
            req.body,
            {upsert:true})
    
        res.status(200).json({data:result})
    }catch(error){
        res.status(400).json({path:"ContentController.createContent Error",error})
    }
}

/**
 * 
 * 강좌 수정
 * @param {*} req 
 * @param { id } res.params 
 * @param {} res.query 
 * @param { title, order ,type, data:{url, body,description}} res.body 
 * @param {*} next 
 */
ContentController.updateContent= async (req,res,next)=>{
    let result = []
    const { id } = _.get(req,'params');
    console.log(req.body)
    const { title, order,type, data:{ url, body,description} } = req.body;
    let update ={}

    if(_.isEmpty(id)){
        throw new Error({message:"cat not find id"})
    }
    try{
        const result = await Content.updateOne(
            {_id:id},
            { title, order,type, data:{ url, body,description}},
            {upsert:true})
    
        res.status(200).json({data:result})
    }catch(error){
        res.status(400).json({path:"ContentController.updateContent Error",error})
    }
}
/**
 * 
 * 강좌 삭제
 * @param {*} req 
 * @param {id} res.params 
 * @param {*} res.body 
 * @param {*} next 
 */
ContentController.deleteContent= async (req,res,next)=>{
    try {
        const { id } = _.get(req,'params')
        const result = await Content.findOneAndRemove({_id:id})
        res.status(200).json({data:result})
    } catch (error) {
        res.status(400).json({path:"ContentController.deleteContent Error",error})
    }
   
}


module.exports = ContentController;