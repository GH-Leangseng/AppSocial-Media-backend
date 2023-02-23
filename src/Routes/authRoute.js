const express = require('express');
const AuthController = require('../Controller/AuthController');
const route = express.Router();
const multer = require('multer')

const storage = multer.diskStorage({

        destination: function (req, file, cb) {
          cb(null, 'uploads') //drop picture to folder Uploads
        },
        filename: function (req, file, cb) {
          const filename = file.fieldname + '-' + Date.now() + '-' + Math.round(Math.random() * 1E9)  + '.jpg';
          req.body.profile_picture_path = filename;

          cb(null,filename);
        }
      })
      
      const upload = multer({ storage: storage })

route.post('/register',upload.single('image'),AuthController.register)
route.get('/login',AuthController.login)
route.get('/user',AuthController.getall)






// /*-----------myidea 
// route.get('/user',AuthController.getall)
// route.get('/user/:id',AuthController.getUserByid)
// route.delete('/user/:id',AuthController.deleteUser)
// route.patch('/user/:id',AuthController.updateUser)

module.exports = route;