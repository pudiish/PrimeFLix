const { addVideo, getAllVideos, deleteVideo } = require('../controllers/video'); // Import the deleteVideo function
const { videoUpload } = require('../middlewares/videoUpload');

const router = require('express').Router();

router
    .post('/upload', videoUpload.single('video'), addVideo)
    .get('/videos', getAllVideos)
    .delete('/videos/:id', deleteVideo); // Add route for deleting videos

module.exports = router;
