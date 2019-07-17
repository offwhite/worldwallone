const express = require('express')
const router = express.Router()

const index = require('../controllers/index_controller.js')

router.get('/',      index.index)
router.get('/about', index.about)
router.get('*',      index.error)

module.exports = router;
