const mongoose = require('mongoose');
// 카테고리 관련
const CategorySchemma = new mongoose.Schema({
    title: { type: String, required: true }, // 카테고리 타이틀
    sub_title:{ type: Array, default:[] }, // 하위 타이틀
    thumbnail:{ type: Array, default:[] }, // 썸네일 

},  { timestamps: true })

const Category = mongoose.model('category', CategorySchemma);
module.exports = { Category };