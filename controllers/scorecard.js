const { read } = require("fs");
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
        const scorecard = new Scorecard({name: req.body.name});
        await scorecard.save();
        res.redirect('/scorecards/?message=scorecard has been created')
    } catch(e) {
        if(e.errors){
            console.log('errors:');
            console.log(e.errors);
            res.render('create-scorecard', {errors: e.errors})
            return;
        }
        return res.status(400).send({
            message:JSON.parse(e),
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