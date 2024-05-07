const VideoSchema = require('../models/VideoModel');

exports.addVideo = async (req, res) => {
    const { title, description, type } = req.body;
    const videoPath = req.file.path;

    const video = new VideoSchema({
        title,
        description,
        type,
        filename: req.file.filename,
        videoUrl: videoPath
    });

    try {
        await video.save();
        res.status(200).json({
            message: 'Video Uploaded Successfully',
            video
        });
    } catch (error) {
        res.status(400).json({
            message: 'Video upload failed',
            error
        });
    }
};

exports.getAllVideos = async (req, res) => {
    try {
        const videos = await VideoSchema.find({});
        res.status(200).json({
            videos
        });
    } catch (error) {
        res.status(400).json({
            message: 'Videos fetch failed',
            error
        });
    }
};

exports.deleteVideo = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedVideo = await VideoSchema.findByIdAndDelete(id);
        if (!deletedVideo) {
            return res.status(404).json({ message: 'Video not found' });
        }
        res.status(200).json({ message: 'Video deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete video', error });
    }
};
