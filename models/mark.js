const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MarkSchema = new Schema({
   sessionId:  { type: String, default: '' },
   pointsJson: { type: String, default: '' },
   color:      { type: String, default: '' },
   opacity:    { type: Number, default: 0 },
   brushSize:  { type: Number, default: 0 },
   hardness:   { type: Number},
   createdAt:  { type: Date, default: Date.now }
})

MarkSchema.methods.points = function pointsArr (cb) {
  return JSON.parse(this.pointsJson)
};

mongoose.model('Mark', MarkSchema)
