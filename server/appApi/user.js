const mongoose = require('mongoose');
const Router = require('koa-router');
let router = new Router();

router.post('/register',async(ctx) => {
    var User = mongoose.model('User');
    let newUser = User(ctx.request.body);

    await newUser.save().then(() => {
        ctx.body = {
            status: true,
            msg: '注册成功'
        }
    })
    .catch((err) => {
        console.log(err)
        ctx.body = {
            status: false,
            msg: '注册失败'
        }
    })
})

module.exports = router;