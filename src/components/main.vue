<template>
    <div>
        <div>
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
        <van-tabbar v-model="active">
            <van-tabbar-item icon="home-o">首页</van-tabbar-item>
            <van-tabbar-item icon="hot-sale-o">商品列表</van-tabbar-item>
            <van-tabbar-item icon="cart-o">购物车</van-tabbar-item>
            <van-tabbar-item icon="user-o">个人中心</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
    export default {
        name: 'mainhome',
        data() {
            return {
                active: ''
            }
        },
        watch: {
            active(val) {
                switch(+val) {
                    case 0:
                        this.$router.push({path: '/'});
                        break;
                    case 1: 
                        this.$router.push({path: '/list'});
                        break;
                    case 2: 
                        this.$router.push({path: '/cart'});
                        break;
                    case 3: 
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