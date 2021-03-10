const multer = require('multer')

const storage = multer.diskStorage({
  filename: (req, file, callback) => {
    callback(null, Date.now() + file.originalname)
  }
})

const imageFilter = (req, file, cb) => {
  // accept image files only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|heic|mp4)$/i)) {
    return cb(
      new Error(
        'Only image files(.jpg, .jpeg, .heic) and video files(.mp4) are allowed!'
      ),
      false
    )
  }
  cb(null, true)
}

exports.upload = multer({ storage: storage, fileFilter: imageFilter })
