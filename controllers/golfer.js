const { read } = require("fs");
const Golfer = require("../models/Golfer");

exports.list = async(req, res) => {
    try{
        console.log(req.query)
        const message = req.query.message;
        const golfers = await Golfer.find({});
        res.render("golfers", {golfers: golfers, message: message});
    } catch(e){
        res.status(404).send({message: "Could not list golfers"});
    }
};

exports.delete = async (req, res)=>{
    const id = req.params.id;
    try{
        await Golfer.findByIdAndRemove(id);
        res.redirect("/golfers");
    } catch(e) {
        res.status(404).send({
            message: `could not delete record ${id}.`,
        });
    }
};

exports.create = async (req, res)=>{
    let golfer = new Golfer({name: req.body.name});
    try{        
        await golfer.save();
        res.redirect('/golfers')
    } catch(e) {
        if(e.errors){
            console.log('errors:');
            console.log(e.errors);
            res.render('create-golfer', {errors: e.errors})
            return;
        }
        return res.status(400).send({
            message:JSON.parse(e),
        });
    }
};

exports.edit = async (req, res) => {
    const id = req.params.id;
    try {
      const golfer = await Golfer.findById(id);
      res.render('update-golfer', { golfer: golfer, id: id });
    } catch (e) {
      res.status(404).send({
        message: `could find golfer ${id}.`,
      });
    }
  };

exports.update = async(req, res) =>{
    const id = req.params.id;
    try{
        let golfer = await Golfer.updateOne({_id: id}, req.body);
        res.redirect('/golfers/?message=golfer has been updated');
    }catch(e){
        res.status(404).send({
            message: `could not find golfer ${id}`,
        });
    }
};