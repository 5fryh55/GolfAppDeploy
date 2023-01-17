const mongoose = require("mongoose");
const { Schema } = mongoose;

const golferSchema = new Schema(
    {
        name: { type: String, required: [true, "Name is required"]}, 
        scorecards: {type: Number, default: 0},        
    }, 
    {timestamps: true}
);

module.exports = mongoose.model("Golfer", golferSchema);  