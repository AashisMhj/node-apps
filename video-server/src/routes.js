const router = require('express').Router();

const {
    getVideo,
    getVideos,
    getVideosOfDir,
    downloadVideo
} = require('./controller');

router.get('/', getVideosOfDir);
router.get('/videos',getVideos);
router.get('/video/:name', getVideo);
router.get('/download/:name', downloadVideo);

module.exports = router;