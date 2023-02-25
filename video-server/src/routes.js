const router = require('express').Router();

const {
    getVideo,
    getVideos,
    getVideosofDir,
    downloadVideo
} = require('./controller');

router.get('/', getVideosofDir);
router.get('/videos',getVideos);
router.get('/video/:name', getVideo);
router.get('/download/:name', downloadVideo);

module.exports = router;