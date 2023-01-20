const { read } = require("fs");
const Course = require("../models/Course");
const Golfer = require("../models/Golfer");
const Scorecard = require("../models/Scorecard");

exports.list = async(req, res) => {
    const perPage = 8;
    const limit = parseInt(req.query.limit) || 8;
    const page = parseInt(req.query.page)||1;
    try{      
        
        const scorecards = await Scorecard.find({}).sort({date:-1})

        res.render("scorecards", {scorecards: scorecards});
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
    let scorecard = new Scorecard({name: req.body.name,
        course: req.body.course,
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
        hole_18: req.body.hole_18, 
        score: req.body.score,})
    try{        
        await scorecard.save();
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

exports.edit = async (req, res) => {
    const id = req.params.id;
    try {
      const scorecard = await Scorecard.findById(id);
      res.render('update-scorecard', { scorecard: scorecard, id: id });
    } catch (e) {
      res.status(404).send({
        message: `could find scorecard ${id}.`,
      });
    }
  };

exports.update = async(req, res) =>{
    let updatedScorecard = new Scorecard({name: req.body.name,
        course: req.body.course,
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
        hole_18: req.body.hole_18, 
        score: req.body.score,})
    let id = req.params.id;
    try{
        let scorecard = await Scorecard.updateOne({_id: id}, req.body);
        res.redirect('/scorecards/?message=scorecard has been updated');
    }catch(e){
        res.status(404).send({
            message: `could not find scorecard ${id}`,
        });
    }
};