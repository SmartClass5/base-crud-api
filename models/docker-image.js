const mongoose = require('mongoose');
const {Schema:{Types:{ObjectId}}} = mongoose;
// 도커 이미지 리스트 관련
const DockerImageSchemma = new mongoose.Schema({
    title: { type: String, required: true }, // 이미지 명칭
    version: { type: String, required: true }, // 이미지 버전
    url: { type: String, required: true }, // 이미지 가져올 허브 주소
    lecture: [{ type: ObjectId , ref: "lecture" }], // 연관 강의
    thumbnail: { type: Array , default:[]}, // 이미지 썸네일
    
}, { timestamps: true })

const DockerImage = mongoose.model('docker-image', DockerImageSchemma);
module.exports = { DockerImage };