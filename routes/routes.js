const express = require("express");

const router = express.Router();
const CategoryRouters = require('./category');
const ContentRouters = require('./content');
const DockerImageRouters = require('./docker-image');
const LearnerRouters = require('./learner');
const LectureRouters = require('./lecture');
const NoticeRouters = require('./notice');
const QnaRouters = require('./qna');
const ReViewRouters = require('./review');
const TecherRouters = require('./teacher');
const UserAuthRouters = require('./user-authority');
const UserPermissionRouters = require('./user-permission');

router.use('/category', CategoryRouters);
router.use('/content', ContentRouters);
router.use('/docker-image', DockerImageRouters);
router.use('/learner', LearnerRouters);
router.use('/lecture', LectureRouters);
router.use('/notice', NoticeRouters);
router.use('/qna', QnaRouters);
router.use('/review', ReViewRouters);
router.use('/teacher', TecherRouters);
router.use('/user-authority', UserAuthRouters);
router.use('/user-permission', UserPermissionRouters);

module.exports = router;