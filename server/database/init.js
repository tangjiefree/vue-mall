const mongoose = require('mongoose');
const glob = require('glob');
const path = require('path');
const db = 'mongodb://localhost/vue-mall';

exports.connect = () => {
    glob.sync(path.resolve(__dirname, './database/schema/', '**/*.js')).forEach(require)
let index = 0;
  return new Promise((resolve,reject) => {
    mongoose.connect(db);
    // 链接中断
    mongoose.connection.on('disconnected',() => {
      if(index > 3) {
          reject()
        console.log('出问题了，链接断开了')
      }
      else {
        index++;
        mongoose.connect(db);
      }
    })
    // 出现问题了
    mongoose.connection.on('error', err => {
      if(index > 3) {
        reject()
        console.log('err',err)
      }
      else {
        index++;
        mongoose.connect(db);
      }
            
    })

    // 第一次连接上
    mongoose.connection.once('open',() => {
        resolve();
      console.log('successful')
    })
  })
}