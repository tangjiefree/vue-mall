<template>
    <div class="cart">
        <mt-header fixed title="购物车"></mt-header>
        <img class="default" :src="require('../assets/images/cart.jpg')" v-if="!hasGoods" alt="">
        <section class="cartlist">
            <ul>
                <li v-for="(item, index) in cartList" :key="item.ID">
                    <img :src="item.IMAGE1" alt="">
                    <div class="content">
                        <div style="width: 100%;">{{item.NAME}}</div>
                        <div class="bottom">
                            <div class="price">
                                <span v-if="item.PRESENT_ORI_PRICE">原价：￥{{item.PRESENT_ORI_PRICE}}</span>
                                <span>现卖：￥{{item.PRESENT_PRICE}}</span>
                            </div>
                            <div class="addNum">
                                <span @click="delOneGoods(index)">-</span>
                                <span>{{item.num > 0 ? item.num : 0}}</span>
                                <span @click="addOneGoods(index)">+</span>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </section>
        <section class="total"  v-if="hasGoods">
            <span>总共:{{allTotal}}件</span>
            <span>共计: {{allPrice}}元</span>
        </section>
        <section class="btnButton" v-if="hasGoods">
            <mt-button type="danger" @click="clearCart">清空购物车</mt-button>
            <mt-button type="primary" @click="settle">去结算</mt-button>
        </section>
    </div>
</template>

<script>
import { Header, Button, Toast, MessageBox } from 'mint-ui';
import { mapState, mapGetters } from 'vuex';
    export default {
        name: 'cart',
        components: {
            'mt-header': Header,
            'mt-button': Button
        },
        data() {
            return {
                
            }
        },
        computed: {
            ...mapState({
                cartList: 'cartList'
            }),
            ...mapGetters({
                allTotal: 'allTotal',
                allPrice: 'allPrice'
            }),
            hasGoods() {
                return this.cartList.length;
            }
        },
        mounted() {
            let height = document.documentElement.clientHeight;
            document.querySelector('.cart').style.height = height - 40 + 'px';
        },
        methods: {
            clearCart() {
                this.$store.commit('clearGoods')
            },
            settle() {
                Toast({
                    message: "开发中",
                    position: "middle",
                    duration: 2000
                });
            },
            delOneGoods(index) {
                if(this.cartList[index].num === 1) {
                    MessageBox.confirm('不要这个商品了?').then(action => {
                        this.$store.commit('clearItem', index)
                    });
                }
                else {
                    this.$store.commit('delOneGoods', index)
                }
            },
            addOneGoods(index) {
                this.$store.commit('addOneGoods', index);
            }
        }
    }
</script>

<style lang="scss" scoped>
@import '../assets/style/global.scss';
.cart {
    position: relative;
    .mint-header {
        display: flex;
    }
    .default {
        position: absolute;
        width: 100%;
        height: rem(700px);
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    .cartlist {
        margin-top: 40px;
        padding: rem(20px);
        li {
            display: flex;
            border: 1px dashed #666;
            border-radius: rem(20px);
            overflow: hidden;
            margin-bottom: rem(5px);
            img {
                width: rem(200px);
            }
            .content {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-around;
                width: 100%;
                padding: 0 rem(30px);
                .bottom {
                    width:100%;
                    display: flex;
                    justify-content: space-between;
                    .addNum {
                        display: flex;
                        text-align: center;
                        span {
                            width: rem(50px);
                            width: rem(50px);
                            border:1px solid #ccc;
                        }
                    }
                }
            }
        }
    }
    .total {
        padding: rem(30px);
        span {
            margin-right: rem(30px);
        }
    }
    .btnButton {
        display: flex;
        justify-content: flex-end;
        .mint-button {
            margin-right: rem(10px);
        }
    }
}
</style>