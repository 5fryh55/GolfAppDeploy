const { read } = require("fs");
const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.create = async (req, res)=>{
    let user = new User({email: req.body.email, password: req.body.password});
    try{        
        await user.save();
        res.redirect('/?message=User created.')
    } catch(e) {
        if(e.errors){
            console.log('errors:');
            console.log(e.errors);
            res.render('create-user', {errors: e.errors})
            return;
        }
        return res.status(400).send({
            message:JSON.parse(e),
        });
    }
};

exports.login = async (req, res) => {
    try{
        const user = await User.findOne({email: req.body.email});
        if(!user){
            res.render("login", {errors: { email: { message: "email not found"}}})
            return;
        }
        const match = await bcrypt.compare(req.body.password, user.password);
        if (match) {
            req.session.userID = user._id;
            console.log(req.session.userID)
            res.redirect('/')    
            return        
        }
        //res.render("login", {errors: { password: { message: "password does not match"}}})
    }catch(e){
        return res.status(400).send({
            message: JSON.parse(e),
        });
    }
};
