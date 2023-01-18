const mongoose = require("mongoose");
const { Schema } = mongoose;

const courseSchema = new Schema(
    {
        name: String, 
        course_par: Number,
        scorecards: {type: Number, default: 0},        
    }, 
    {timestamps: true}
);

module.exports = mongoose.model("Course", courseSchema);  