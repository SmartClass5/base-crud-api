const mongoose = require('mongoose');
const {Schema:{Types:{ObjectId}}} = mongoose;

// 강의자 관련

const TeacherSchemma = new mongoose.Schema({
    name: { type: String, required: true },
    user: [{ type: ObjectId , ref: "user-permission" }], // 유저 정보
    lecture_list: [{ type: ObjectId , ref: "lecture" }], // 신청 강좌 정보
    intor:{ type:Array, default:[]}
}, { timestamps: true })

const Teacher = mongoose.model('teacher', TeacherSchemma);
module.exports = { Teacher };