const express  = require('express');
const postRoute = express.Router();
const PostController = require('../Controller/PostController')
const multer = require('multer')

const storage = multer.diskStorage({

        destination: function (req, file, cb) {
          cb(null, 'uploads') //drop picture to folder Uploads
        },
        filename: function (req, file, cb) {
          const filename = file.fieldname + '-' + Date.now() + '-' + Math.round(Math.random() * 1E9)  + '.jpg';
          req.body.image_path = filename;

          cb(null,filename);
        }
      })
      const upload = multer({ storage: storage })

postRoute.post('/add-post',upload.single('image'),PostController.addPost);
postRoute.post('/like-un-like',PostController.likeUnLike);
postRoute.get('/get-all-post',PostController.getAllPost);
module.exports= postRoute;