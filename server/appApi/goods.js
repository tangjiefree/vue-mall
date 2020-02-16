const Router = require('koa-router');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const router = new Router();


let goodsDetail = []

router.get('/goodsdetail', async(ctx) => {
    fs.readFile(path.resolve(__dirname, '../data_json/goods.json'), 'utf8', (err,data) => {
        if(!err) {
            goodsDetail = JSON.parse(data);
            let goodsSchema = mongoose.model('Goods');
            goodsDetail.RECORDS.map((item, index) => {
                let newInsert = new goodsSchema(item);
                newInsert.save().then((err) => {
                    if(!err) {
                        console.log('插入成功')
                    }
                    else {
                        // console.log(err)
                    }
                })
            })
        }
    })
    ctx.body = '正在插入数据...';
})


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

router.post('/fetchdetail', async(ctx) => {
    let goodsId = ctx.request.body.goodsId;
    const Goods = mongoose.model('Goods');
    await Goods.findOne({ID: goodsId})
    .then(res => {
        ctx.body = {
            status: 200,
            msg: res
        }
    })
    .catch((res) => {
        ctx.body = {
            status: 500,
            msg: res
        }
    })
})

module.exports = router;