const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
mongoose.connect('mongodb+srv://userone:userone@fsdfiles.gewcx.mongodb.net/LibraryApp?sretryWrites=true&w=majority');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    fname: {
        type: String,
        required: true,
        trim: true
    },
    lname: {
        type: String,
        required: true,
        trim: true

    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) throw new Error("Invalid Email Provided")
        }
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.pre('save', async function (next) {
    const user = this;
    user.password = await bcrypt.hash(user.password, 8)
    next();
})




userSchema.statics.findByCredentials = async (email, password) => {
    const user = await userData.findOne({ email })
    if (!user) throw new Error("Unable to LOGIN(signup Please)")

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) throw new Error("Unable to LOGIN")

    return user
}

const userData = mongoose.model('userData', userSchema);
module.exports = userData;