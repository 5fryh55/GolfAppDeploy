const mongoose = require("mongoose");
const { Schema } = mongoose;

const scorecardSchema = new Schema(
    {
        name:{ type: String, required: [true, "Name is required"]},
        course:{ type: String, required: [true, "Course is required"]},
        date:{ type: Date, required: [true, "Date is required"]},
        score: { type: Number, required: [true, "Score is required"]}, 
        player_id:{
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Scorecard"
        }
    }, 
    {timestamps: true}
);

module.exports = mongoose.model("Scorecard", scorecardSchema);  