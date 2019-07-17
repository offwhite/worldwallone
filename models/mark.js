const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MarkSchema = new Schema({
   user_id: { type: Number, default: 0 },
   points: { type: String, default: '' },
   color: { type: String, default: '' }
})

mongoose.model('Mark', MarkSchema)
