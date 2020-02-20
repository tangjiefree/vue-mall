const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const bcrypt = require('bcrypt');

// const SALT_WORK_FACTOR = 10;

let ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({
    userId: ObjectId,
    userName: {unique: true, type: String},
    password: String,
    createAt: {type: Date, default: Date.now()},
    lastLoginAt: {type: Date, default: Date.now()}
})

// userSchema.pre('save',function(next) {
//     bcrypt.genSalt(SALT_WORK_FACTOR,(err,salt) => {
//         if(err) return next(err)
//         bcrypt.hash(this.password, salt, (err, hash) => {
//             console.log(err,'here------')
//             if(err) return next(err)
//             this.password = hash;
//             next();
//         })
//     })
// })

mongoose.model('User', userSchema);