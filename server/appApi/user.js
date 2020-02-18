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
        ctx.body = {
            status: false,
            msg: '注册失败'
        }
    })
})

router.post('/login', async(ctx) => {
        const {userName, password} = ctx.request.body;
        const userData = mongoose.model('User');
        const result = await userData.findOne({userName: userName, password: password})
        if(result) {
            ctx.body = {
                status: true,
                msg: result
            }
        }
        else {
            ctx.body = {
                status: false,
                msg: '请检查用户名和密码是否正确'
            }
        }

})

module.exports = router;