const mongoose = require('mongoose');
const Router = require('koa-router');

const router = new Router();

// 请求商品大类信息
router.get('/all', async(ctx) => {
    try {
        const categoryData = mongoose.model('category');
        const result = await categoryData.find();
        ctx.body = {
            status: true,
            data: result
        }
    }
    catch(err) {
        ctx.body = {
            status: false,
            data: err
        }
    }
})
// 请求商品小类信息
router.post('/categorysub', async(ctx) => {
    try{
        let categoryId = ctx.request.body.categoryID;
        const categorySub = mongoose.model('categorySub');
        const result = await categorySub.find({MALL_CATEGORY_ID: categoryId});
        ctx.body = {
            status: true,
            data: result
        }
    }
    catch(err) {
        ctx.body = {
            status: false,
            data: err
        }
    }
})
// 请求小类商品集合
router.post('/deepSub', async(ctx) => {
    try{
        // 当前页数,每页显示数量,开始位置
        const { pageNum, Num, ID } = ctx.request.body;
        const start= (pageNum-1)*Num;
        const goods = mongoose.model('Goods');
        const result = await goods.find({SUB_ID: ID}).skip(start).limit(Num);
        ctx.body = {
            status: true,
            data: result
        }
    }
    catch(err) {
        ctx.body = {
            status: false,
            msg: err
        }
    }
})

module.exports = router;
