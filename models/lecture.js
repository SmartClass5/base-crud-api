const mongoose = require('mongoose');
const {Schema:{Types:{ObjectId}}} = mongoose;

// 강좌 관련

const LectureSchemma = new mongoose.Schema({
    category: { type: String, required: true }, // 카테고리
    sub_category: { type: String, default:"" }, //카테고리 -부
    title: { type: String, required: true }, // 강좌명
    sub_title: { type: String, default:"" }, // 부 제목
    intro: { type: String, default:"" }, // 강의 소개
    thumbnail: { type: Array, default:[] }, // 강의 소개
    difficulty: { type: String, default:"중" }, // 강의 소개
    tag: { type: Array, default:[] }, // 강의 소개
    for_recommend: { type: Array, default:[] }, // 강의 소개
    paid: { type: Number, default:0 }, // 강의 소개
    review: [{ type: ObjectId , ref: "review" }], // 신청 강좌 정보
    body: { type: String, default:"" }, // 강의 소개
    pay_div: { type: Boolean, default:"중" }, // 강의 난이도
    teacher: [{ type: ObjectId , required: true, ref: "techer" }], // 신청 강좌 정보
    curriculum_summary:{ type: Array, default:[] } // 신청 강좌 주차 요약 정보
}, { timestamps: true })

const Lecture = mongoose.model('lecture', LectureSchemma);
module.exports = { Lecture };