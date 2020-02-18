// const BASE_URL = 'https://mock.yonyoucloud.com/mock/3759/mall/api/';
const LOCAL_URL = 'http://localhost:3000/';

exports.Url = {
    // 'index': BASE_URL + 'jspang'
    'regist': LOCAL_URL + 'user/register', //注册接口
    'GoodsDetail': LOCAL_URL + 'goods/fetchdetail', //获取商品详情
    'fetchall': LOCAL_URL + 'goods/fetchall', //获取所有商品信息
    'category': LOCAL_URL + 'category/all', //获取商品大类信息,
    'categorySub': LOCAL_URL + 'category/categorysub', //获取商品小类信息
    'deepSub': LOCAL_URL + 'category/deepSub' //获取小类商品信息
}