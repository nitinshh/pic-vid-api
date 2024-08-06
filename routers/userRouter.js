const express = require('express');
const router = express.Router();
const controller = require('../controllers/index');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the uploads directory exists
const uploadDir = './public/uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Function to generate a unique filename
const generateUniqueFilename = (originalName) => {
    const dir = uploadDir;
    const ext = path.extname(originalName);
    const baseName = path.basename(originalName, ext);
    let newName = originalName;
    let counter = 1;

    // Check if the file exists and rename it
    while (fs.existsSync(path.join(dir, newName))) {
        newName = `${baseName}(${counter})${ext}`;
        counter++;
    }

    return newName;
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/'); // Directory for uploads
    },
    filename: (req, file, cb) => {
        const uniqueName = generateUniqueFilename(file.originalname);
        console.log(uniqueName, "uniqueName");
        cb(null, uniqueName);
    }
});

const upload = multer({ storage: storage });

router.post('/profileUpload', upload.array('profile-files', 12), controller.userController.insert);

module.exports = router;
