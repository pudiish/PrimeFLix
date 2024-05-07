const multer = require('multer');
const path = require('path');
const uuid = require('uuid').v4;
const fs = require('fs');

// Destination directory for storing uploaded videos
const uploadDestination = path.join(__dirname, '../public/videos');

// Multer storage configuration for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'video') {
            cb(null, uploadDestination);
        }
    },
    filename: (req, file, cb) => {
        const videoExt = file.mimetype.split('/')[1];
        const id = uuid();
        cb(null, "video_" + id + '.' + videoExt);
    }
});

// Multer file filter for restricting uploads to only mp4 format
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'video/mp4') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

// Multer configuration for upload
exports.videoUpload = multer({ storage, fileFilter });

// Function to delete a video file
exports.deleteVideoFile = (filename) => {
    const filePath = path.join(uploadDestination, filename);
    try {
        fs.unlinkSync(filePath);
        console.log('File deleted successfully:', filename);
    } catch (error) {
        console.error('Error deleting file:', error);
    }
};
