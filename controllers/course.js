const { read } = require("fs");
const Course = require("../models/Course");

exports.list = async(req, res) => {
    try{
        console.log(req.query)
        const message = req.query.message;
        const courses = await Course.find({});
        res.render("courses", {courses: courses, message: message});
    } catch(e){
        res.status(404).send({message: "Could not list courses"});
    }
};

exports.delete = async (req, res)=>{
    const id = req.params.id;
    try{
        await Course.findByIdAndRemove(id);
        res.redirect("/courses");
    } catch(e) {
        res.status(404).send({
            message: `could not delete course ${id}.`,
        });
    }
};

exports.create = async (req, res)=>{
    let course = new Course({course: req.body.course, course_par: req.body.par});
    try{
        await course.save();
        res.redirect('courses')
    } catch(e) {
        if(e.errors){
            console.log('errors:');
            console.log(e.errors);
            res.render('create-course', {errors: e.errors})
            return;
        }
        return res.status(400).send({
            message:JSON.parse(e),
        });
    }
};

exports.createView = async(req, res) => {
    try{
        res.render("create-course");
    } catch(e){
        res.status(404).send({message: "Could not create course"});
    }
};

exports.edit = async (req, res) => {
    const id = req.params.id;
    try {
      const course = await Course.findById(id);
      res.render('update-course', { course: course, id: id });
    } catch (e) {
      res.status(404).send({
        message: `could find course ${id}.`,
      });
    }
  };

exports.update = async(req, res) =>{
    const id = req.params.id;
    try{
        let course = await Course.updateOne({_id: id}, req.body);
        res.redirect('/courses');
    }catch(e){
        res.status(404).send({
            message: `could not find course ${id}`,
        });
    }
};
