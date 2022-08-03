const { Category } = require('../models/category');
const _ = require('lodash')
let CategoryController ={}

// 카테고리 스키마
// const CategorySchemma = new mongoose.Schema({
//     title: { type: String, required: true }, // 카테고리 타이틀
//     sub_title:{ type: Array, default:[] }, // 하위 타이틀
//     thumbnail:{ type: Array, default:[] }, // 썸네일 

// },  { timestamps: true })

/**
 * 
 * 카테고리 조회
 * @param {*} req 
 * @param {id} res.params 
 * @param {limit, sort, title, page} res.query 
 * @param {*} res.body 
 * @param {*} next 
 */
CategoryController.getCategory= async (req,res,next)=>{
    let result = []
    const { id } = _.get(req,'params')
    const {limit =0, sort='title', page=1} = _.get(req,'query')
    try {
        if(_.isEmpty(id)){
         result = await Category.find().sort({sort:1}).limit(limit).skip(limit*(page-1))
        }else{
            result = await Category.find({_id:id})
        }
        res.status(200).json({data:result})
    } catch (error) {
        res.status(400).json({path:"CategoryController.getCategory Error",error})
    }
   
}
/**
 * 
 * 카테고리 생성
 * @param {*} req 
 * @param {} res.params 
 * @param {} res.query 
 * @param { title, sub_title, thumbnail } res.body 
 * @param {*} next 
 */
CategoryController.createCategory= async (req,res,next)=>{
    const { title, sub_title , thumbnail } = req.body;
    try{
        const result = await Category.updateOne(
            {title, sub_title , thumbnail},
            req.body,
            {upsert:true})
    
        res.status(200).json({data:result})
    }catch(error){
        res.status(400).json({path:"CategoryController.createCategory Error",error})
    }
}

/**
 * 
 * 카테고리 수정
 * @param {*} req 
 * @param { id } res.params 
 * @param {} res.query 
 * @param {   title, sub_title , thumbnail } res.body 
 * @param {*} next 
 */
CategoryController.updateCategory= async (req,res,next)=>{
    let result = []
    const { id } = _.get(req,'params')
    const { title, sub_title , thumbnail } = req.body;
    let update ={}

    if(_.isEmpty(id)){
        throw new Error({message:"cat not find id"})
    }
    try{
        const result = await Category.updateOne(
            {_id:id},
            { title, sub_title , thumbnail },
            {upsert:true})
    
        res.status(200).json({data:result})
    }catch(error){
        res.status(400).json({path:"CategoryController.updateCategory Error",error})
    }
}
/**
 * 
 * 카테고리 삭제
 * @param {*} req 
 * @param {id} res.params 
 * @param {limit, sort, title, page} res.query 
 * @param {*} res.body 
 * @param {*} next 
 */
CategoryController.deleteCategory= async (req,res,next)=>{
    try {
        const { id } = _.get(req,'params')
        const result = await Category.findOneAndRemove({_id:id})
        res.status(200).json({data:result})
    } catch (error) {
        res.status(400).json({path:"CategoryController.deleteCategory Error",error})
    }
   
}

module.exports = CategoryController;