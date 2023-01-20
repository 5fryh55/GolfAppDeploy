const mongoose = require("mongoose");
const { Schema } = mongoose;

const golferSchema = new Schema(
    {
        name: { type: String, required: [true, "Name is required"], minlength: [2, "Name must be at least 2 characters."]}, 
        scorecards: {type: Number},        
    }, 
    {timestamps: true}
);

module.exports = mongoose.model("Golfer", golferSchema);  