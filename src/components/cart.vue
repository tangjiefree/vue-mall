<template>
    <div class="cart">
        <van-nav-bar title="购物车" />
        <img class="default" :src="require('../assets/images/cart.jpg')" v-if="!hasGoods" alt="">
        <section class="cartlist">
            <ul>
                <van-card
                    :num="item.num > 0 ? item.num : 0"
                    tag="热卖"
                    :price="item.PRESENT_PRICE"
                    desc="描述信息"
                    :title="item.NAME"
                    :thumb="item.IMAGE1"
                    :origin-price="item.PRESENT_ORI_PRICE"
                    v-for="(item, index) in cartList" :key="item.ID"
                >
                    <div slot="footer" class="addNum">
                        <span style="text-align: center;display: inline-block;width: 15px;height: 15px;border:1px solid #ccc;" @click="delOneGoods(index)">-</span>
                        <span style="text-align: center;display: inline-block;width: 15px;height: 15px;border:1px solid #ccc;">{{item.num > 0 ? item.num : 0}}</span>
                        <span style="text-align: center;display: inline-block;width: 15px;height: 15px;border:1px solid #ccc;" @click="addOneGoods(index)">+</span>
                    </div>
                </van-card>
            </ul>
        </section>
        <section class="total"  v-if="hasGoods">
            <span>总共:{{allTotal}}件</span>
            <span>共计: {{allPrice | newPrice}}元</span>
        </section>
        <section class="btnButton" v-if="hasGoods">
            <van-button round @click="clearCart" type="info">清空购物车</van-button>
            <van-button round @click="settle" type="warning">去结算</van-button>
        </section>
    </div>
</template>

<script>
import { Dialog, Toast } from 'vant';
import { mapState, mapGetters } from 'vuex';
import { PriceFix } from '../utils/filter';
    export default {
        name: 'cart',
        data() {
            return {
                
            }
        },
        filters: {
            newPrice(val) {
                return PriceFix(val);
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
                Dialog.confirm({
                    message: '确定清空购物车？'
                })
                .then(() => {
                    this.$store.commit('clearGoods')
                })
                .catch(() => {
                    return;
                })
            },
            settle() {
                Toast('开发中,敬请期待');
            },
            delOneGoods(index) {
                if(this.cartList[index].num === 1) {
                    Dialog.confirm({
                        message: '不要这个商品了?'
                    }).then(() => {
                        this.$store.commit('clearItem', index)
                    }).catch(() => {
                        // on cancel
                        return;
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
    .default {
        position: absolute;
        width: 100%;
        height: rem(700px);
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    .cartlist {
        padding: 0 rem(20px);
        height: 80%;
        overflow-y: scroll;
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
        .van-button {
            margin-right: rem(10px);
        }
    }
}
</style>