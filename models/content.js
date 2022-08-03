const mongoose = require('mongoose');
// 강좌 내용 관련
const ContentSchemma = new mongoose.Schema({
    title: { type: String, required: true },// 컨텐츠명
    order: { type: Number, default: 0 },// 콘텐츠 순서
    type: { type: String, required: true }, // 콘텐츠 타입
    data: {
        url:{ type: String, default:"" }, // 영상 및 자료 링크
        body:{ type: String, default:""  }, // 내용
        description:{ type: String, default:""  }, // 학습 목표 및 부가 정보
    }
}, { timestamps: true })


const Content = mongoose.model('content', ContentSchemma);
module.exports = { Content };