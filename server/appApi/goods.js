const Router = require('koa-router');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const router = new Router();


// 将所有数据存入数据库
router.get('/alldata', async(ctx) => {
    fs.readFile(path.resolve(__dirname, '../data_json/alldata.json'), 'utf8',(err,data) => {
        if(!err) {
            data = JSON.parse(data);
            let alldata = mongoose.model('alldata');
            let newRecord = new alldata(data);
            newRecord.save()
            .then((err) => {
                if(!err) {
                    console.log('插入成功');
                }
                else {
                    console.log(err)
                }
            })
        }
    })
    ctx.body="插入首页数据中"
})


// 将商品详情存入数据库
router.get('/goodsdetail', async(ctx) => {
    fs.readFile(path.resolve(__dirname, '../data_json/goodsDetail.json'), 'utf8', (err,data) => {
        data = JSON.parse(data);
        let goodsSchema = mongoose.model('Goods');
        data.map((item, index) => {
            let newInsert = new goodsSchema(item);
            newInsert.save().then((err) => {
                if(!err) {
                    console.log('插入成功')
                }
                else {
                    console.log(err)
                }
            })
        })
    })
    ctx.body = '正在插入数据...';
})

// 将商品大类信息存入数据库
router.get('/category', async(ctx) => {
    fs.readFile(path.resolve(__dirname, '../data_json/category.json'), 'utf8', (err, data) => {
        data = JSON.parse(data);
        const newCategory = mongoose.model('category');
        data.RECORDS.map((item, index) => {
            let recode = newCategory(item);
            recode.save().then((err) => {
                if(!err) {
                    return;
                }
                else {
                    console.log('出错了',err)
                }
            })
        })
    })
    ctx.body="商品大类添加中";
})

// 将商品小类信息存入数据库
router.get('/categorySub', async(ctx) => {
    fs.readFile(path.resolve(__dirname, '../data_json/category_sub.json'), 'utf8', (err, data) => {
        data = JSON.parse(data);
        const category = mongoose.model('categorySub');
        data.RECORDS.map((item, index) => {
            let newRecord = new category(item);
            newRecord.save().then((err) => {
                if(err) {
                    console.log(err)
                }
            })
        })
    })
    ctx.body = '正在插入商品小类数据';
})

// 所有商品接口
router.get('/fetchall', async(ctx) => {
    try {
        const alldata = mongoose.model('alldata');
        const result = await alldata.findOne();
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

router.post('/fetchdetail', async(ctx) => {
    try {
        let goodsId = ctx.request.body.goodsId;
        const Goods = mongoose.model('Goods');
        let result = await Goods.findOne({ID: goodsId}).exec();
        ctx.body = {
            status: 200,
            msg: result
        }
    }
    catch(err) {
        ctx.body = {
            status: 500,
            msg: err
        }
    }
})

module.exports = router;