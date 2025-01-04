const cloudinary = require('../config/cloudinary'); // Import your Cloudinary configuration
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Set up multer storage using Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'food_store', // Folder in Cloudinary where images will be stored
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif'], // Supported image formats
  },
});

const upload = multer({ storage: storage });

module.exports = Upload;
