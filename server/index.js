const Koa = require('koa');
const { connect, initSchemas } = require('./database/init.js');
const moongse = require('mongoose');
const Router = require('koa-router');
const BodyParse = require('koa-bodyparser')
let router = new Router();
const app = new Koa();
const cors = require('koa2-cors');

let user = require('./appApi/user.js');
let goods = require('./appApi/goods.js');
let category = require('./appApi/category.js');


app.use(cors());
app.use(BodyParse());
app.use(router.routes());
app.use(router.allowedMethods());
router.use('/user',user.routes());
router.use('/goods', goods.routes());
router.use('/category',category.routes());

(async () => {
  await connect();
  initSchemas();
//   const User = moongse.model('User');
//   const OneUser = new User({ userName: 'tangjie02', password: '123123' });
//   OneUser.save().then((res) => {
//     console.log(res, '插入成功');
//   });
//   const Users = await User.findOne({});
//   console.log('herhe', Users);
})();



app.listen(3000);
