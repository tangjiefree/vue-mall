const fs = require('fs');

fs.readFile('./data_json/goods.json', 'utf8', (err, data) => {
    if(!err) {
        let jsonData = JSON.parse(data);
        let newData = [];
        jsonData.RECORDS.map((item, index) => {
            if(item.IMAGE1) {
                newData.push(item);
            }
        })
        fs.writeFile('./data_json/goodsDetail.json', JSON.stringify(newData), (err, data) => {
            if(!err) {
                return;
            }
            else {
                console.log(err);
            }
        })
    }
})