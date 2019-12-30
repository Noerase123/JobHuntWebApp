var express = require('express');
var router = express.Router();
const auth = require('../middleware/Auth')
const Images = require('../models/ImagesModel')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null,'./uploads/')
    },
    filename: function(req,file,cb) {
        cb(null, new Date().toISOString() + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer({storage: storage, limits: {
    fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})

router.post('/', auth, upload.single('image'), (req, res) => {
    console.log(req.file)
    const prod = new Images({
        refId: req.body.refID,
        image: req.file.path
    })
    prod.save()
        .then(response => {
            res.status(201).json({
                message: 'Image created'
            })
        })
        .catch(err => {
            res.status(500).json({
                message: err
            })
            console.log(err)
        })
})


router.get('/', auth, async (req,res) => {

    const all = await Images.find()

    try {
        res.status(200).json(all)
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }

})

router.get('/:id', auth, async (req,res) => {
    const id = req.params.id
    const byID = await Images.findById(id)
    
    try {
        res.status(200).json(byID)
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
})


module.exports = router;
