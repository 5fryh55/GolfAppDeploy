const { read } = require("fs");
const Course = require("../models/Course");
const Golfer = require("../models/Golfer");
const Scorecard = require("../models/Scorecard");

exports.list = async(req, res) => {
    try{
        console.log(req.query)
        const message = req.query.message;
        const scorecards = await Scorecard.find({});
        res.render("scorecards", {scorecards: scorecards, message: message});
    } catch(e){
        res.status(404).send({message: "Could not list scorecards"});
    }
};

exports.createView = async(req, res) => {
    try{
        const golfers = await Golfer.find({});
        const courses = await Course.find({});
        res.render("create-scorecard",{ golfers: golfers, courses: courses, errors:{} });
    } catch(e){
        res.status(404).send({message: "Could not create scorecard"});
    }
};

exports.delete = async (req, res)=>{
    const id = req.params.id;
    try{
        await Scorecard.findByIdAndRemove(id);
        res.redirect("/scorecards");
    } catch(e) {
        res.status(404).send({
            message: `could not delete scorecard ${id}.`,
        });
    }
};

exports.create = async (req, res)=>{
    try{        
        await Scorecard.create({
            name: req.body.name,
            course: req.body.course,
            course_par: req.body.course_par,
            date: req.body.date,
            hole_1: req.body.hole_1,
            hole_2: req.body.hole_2,
            hole_3: req.body.hole_3,
            hole_4: req.body.hole_4,
            hole_5: req.body.hole_5,
            hole_6: req.body.hole_6,
            hole_7: req.body.hole_7,
            hole_8: req.body.hole_8,
            hole_9: req.body.hole_9,
            hole_10: req.body.hole_10,
            hole_11: req.body.hole_11,
            hole_12: req.body.hole_12,
            hole_13: req.body.hole_13,
            hole_14: req.body.hole_14,
            hole_15: req.body.hole_15,
            hole_16: req.body.hole_16,
            hole_17: req.body.hole_17,
            hole_18: req.body.hole_18
        })
        res.redirect('/scorecards/?message=scorecard created.')
    } catch (e){
        if(e.errors){
            res.render('create-scorecard',{errors:e.errors})
            return;
        }
        return res.status(400).send({
            message: JSON.parse(e),
        });
    }
};

exports.update = async(req, res) =>{
    const id = req.params.id;
    try{
        const scorecard = await Scorecard.updateOne({_id: id}, req.body);
        res.redirect('scorecards/?message=scorecard has been updated');
    }catch(e){
        res.status(404).send({
            message: `could not find scorecard ${id}`,
        });
    }
};