const express = require('express')
const router = express.Router()

const index = require('../controllers/index_controller.js')
const marks = require('../controllers/marks_controller.js')

router.get('/',         index.index)
router.get('/about',    index.about)
router.get('/the-wall', index.theWall)

router.get('/mark/:since', marks.get)
router.post('/mark', marks.add)


router.get('*',      index.error)

module.exports = router;
