const mongoose = require('mongoose');
const {Schema:{Types:{ObjectId}}} = mongoose;
// 수강 후기 관련
const ReviewSchemma = new mongoose.Schema({
    author: [{ type: ObjectId , ref: "user-permission" }],
    author_name: { type: String, required: true },
    grade: { type: Number, required: true },
    body: { type: String, required: true },
   
}, { timestamps: true })

const Review = mongoose.model('review', ReviewSchemma);
module.exports = { Review };