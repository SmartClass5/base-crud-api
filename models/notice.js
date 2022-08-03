const mongoose = require('mongoose');
const {Schema:{Types:{ObjectId}}} = mongoose;

// 공지사항 관련

const NoticeSchemma = new mongoose.Schema({
    title: { type: String, required: true },
    hit: { type: Number, required: true },
    author: [{ type: ObjectId , ref: "user-permission" }],
    author_name: { type: String, required: true },
    body: { type: String, required: true },
}, { timestamps: true })

const Notice = mongoose.model('notice', NoticeSchemma);
module.exports = { Notice };