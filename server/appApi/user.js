const mongoose = require('mongoose');
const Router = require('koa-router');
let router = new Router();

router.post('/register',async(ctx) => {
    const User = mongoose.model('User');
    let newUser = User(ctx.request.body);
    let result = await newUser.save();
    ctx.body = {
        status: true,
        msg: result
    }
})

router.post('/login', async(ctx) => {
        const userData = mongoose.model('User');
        const {userName, password} = ctx.request.body;
        const result = await userData.findOne({userName: userName, password: password});
        ctx.body = {
            status: true,
            msg: result
        }

})

module.exports = router;