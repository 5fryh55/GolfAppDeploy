const mongoose = require("mongoose");
const { Schema } = mongoose;

const scorecardSchema = new Schema(
    {
        name:{ type: String, required: [true, "Name is required"]},
        course:{ type: String, required: [true, "Course is required"]},
        course_par: { type: Number, required: [true, "Par is required"]}, 
        date:{ type: Date, required: [true, "Date is required"]},      
        hole_1: { type: Number, required: [true, "Score is required"]},
        hole_2: { type: Number, required: [true, "Score is required"]},
        hole_3: { type: Number, required: [true, "Score is required"]},
        hole_4: { type: Number, required: [true, "Score is required"]},
        hole_5: { type: Number, required: [true, "Score is required"]}, 
        hole_6: { type: Number, required: [true, "Score is required"]},
        hole_7: { type: Number, required: [true, "Score is required"]},
        hole_8: { type: Number, required: [true, "Score is required"]},
        hole_9: { type: Number, required: [true, "Score is required"]},
        hole_10: { type: Number, required: [true, "Score is required"]},
        hole_11: { type: Number, required: [true, "Score is required"]},
        hole_12: { type: Number, required: [true, "Score is required"]},
        hole_13: { type: Number, required: [true, "Score is required"]},
        hole_14: { type: Number, required: [true, "Score is required"]},
        hole_15: { type: Number, required: [true, "Score is required"]},
        hole_16: { type: Number, required: [true, "Score is required"]},
        hole_17: { type: Number, required: [true, "Score is required"]},
        hole_18: { type: Number, required: [true, "Score is required"]},
        score: { type:Number, required: [true, "Total is required"]},
        golfer_id:{
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Golfer"
        }, 
        course_id:{
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Course"
        },       
    }, 
    
    {timestamps: true}
);

module.exports = mongoose.model("Scorecard", scorecardSchema);  