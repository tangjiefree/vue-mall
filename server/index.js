const Koa = require('koa');
const {connect} = require('./database/init.js');

(async() => {
    await connect()
})();
const app = new Koa();

app.use(async (ctx) => {
    ctx.body = 'hello koa';
})


app.listen(3000)