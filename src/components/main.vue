<template>
    <div>
        <div>
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
        <mt-tabbar fixed v-model="selected">
            <mt-tab-item id="1">
                <img slot="icon" src="../assets/images/index.png">
                首页
            </mt-tab-item>
            <mt-tab-item id="2">
                <img slot="icon" src="../assets/images/list.png">
                商品列表
            </mt-tab-item>
            <mt-tab-item id="3">
                <img slot="icon" src="../assets/images/cart.png">
                购物车
            </mt-tab-item>
            <mt-tab-item id="4">
                <img slot="icon" src="../assets/images/center.png">
                个人中心
            </mt-tab-item>
        </mt-tabbar>
    </div>
</template>

<script>
import { Tabbar, TabItem, img } from 'mint-ui';
    export default {
        name: 'mainhome',
        components: {
            'mt-tabbar': Tabbar,
            'mt-tab-item': TabItem,
        },
        data() {
            return {
                selected: ''
            }
        },
        watch: {
            selected(val) {
                switch(+val) {
                    case 1:
                        this.$router.push({path: '/main'});
                        break;
                    case 2: 
                        this.$router.push({path: '/list'});
                        break;
                    case 3: 
                        this.$router.push({path: '/cart'});
                        break;
                    case 4: 
                        this.$router.push({path: '/center'});
                        break;
                }
            }
        },
        methods: {
        }
    }
</script>

<style lang="scss" scoped>
@import '../assets/style/global.scss';
</style>