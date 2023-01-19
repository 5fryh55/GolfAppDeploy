const mongoose = require("mongoose");
const {Schema} = mongoose;
const bcrypt = require("bcrypt");

const userSchema = new Schema(
    {
        email: {type: String, required: [true, 'email required'], unique: true},
        password: {type: String, required: [ true, 'password required']}
    },
    {timestamps:true}
);

userSchema.pre('save', async function (next) {
    console.log("password hashing # # #");
    try{
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
        next();
        console.log("password hashed.");
    } catch(e) {
        throw Error ("couldn't hash password");
    }
})

module.exports = mongoose.model("User", userSchema);