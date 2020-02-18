import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        count: '',
        cartList: [],
        token: '',
    },
    getters: {
        // 购物车商品总件数
        allTotal(state) {
            let alltotal = 0;
            state.cartList.forEach((item) => {
                alltotal += item.num
            });
            return alltotal
        },
        // 购物车商品总价
        allPrice(state) {
            let allPrice = 0;
            state.cartList.forEach((item) => {
                allPrice += item.num*item.PRESENT_PRICE
            })
            return allPrice;
        }
    },
    mutations: {
        // 保存token
        setToken(state, token) {
            state.token = token;
            localStorage.setItem('token', JSON.stringify(token))
        },
        // 移除token
        removeToken(state) {
            state.token = '';
            localStorage.removeItem('token')
        },
        // 增加商品到购物车
        addGoods(state, value) {
            state.cartList.push(value)
        },
        // 减少商品个数
        delOneGoods(state, index) {
            console.log('here')
            if(state.cartList[index].num === 0) {
                return;
            }
            else {
                state.cartList[index].num -= 1;
            }
        },
        // 增加商品个数
        addOneGoods(state, index) {
            console.log('hrere')
            state.cartList[index].num += 1;
        },
        // 删除当前项
        clearItem(state, index) {
            state.cartList.splice(index, 1);
        },
        clearGoods(state, value) {
            state.cartList = [];
        }
    },
    actions: {
        // 是否存在商品
        isSave(store, value) {
            return new Promise((resolve, reject) => {
                const result = store.state.cartList.find(item => item.ID === value.ID)
                if(result) {
                    // 已存在
                    resolve();
                }
                else {
                    // 不存在,那就增加到购物车
                    // value.num = 1;
                    Vue.set(value,'num',1);
                    store.commit('addGoods',value);
                    reject();
                }
            })
        }
    }
}
)

export default store;