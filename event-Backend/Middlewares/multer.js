const multer = require('multer');

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        if(file.fieldname === 'profileImage'){
            cb(null,"./Uploads/ProfileImage")
        }
    },
    filename:function(req,file,cb){
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname)
    }
})

const uploads = multer({storage:storage})
module.exports = uploads