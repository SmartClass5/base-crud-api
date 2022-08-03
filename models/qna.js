const mongoose = require('mongoose');
const {Schema:{Types:{ObjectId}}} = mongoose;
// qna 관련
const QNASchemma = new mongoose.Schema({
    title: { type: String, required: true },
    hit: { type: Number, required: true },
    author: [{ type: ObjectId , ref: "user-permission" }],
    author_name: { type: String, required: true },
    body: { type: String, required: true },
}, { timestamps: true })

const QNA = mongoose.model('qna', QNASchemma);
module.exports = { QNA };