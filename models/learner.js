const mongoose = require('mongoose');
const {Schema:{Types:{ObjectId}}} = mongoose;

// 수강생 관련
const LearnerSchemma = new mongoose.Schema({
    name: { type: String, required: true },// 수강생명
    user: [{ type: ObjectId , ref: "user-permission" }], // 유저 정보
    lecture_title:{ type: String, required: true },// 신청 강좌명,
    lecture: [{ type: ObjectId , ref: "lecture" }], // 신청 강좌 정보
}, { timestamps: true })

const Learner = mongoose.model('learner', LearnerSchemma);
module.exports = { Learner };