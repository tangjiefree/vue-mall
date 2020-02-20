<template>
    <div class="goodsDetail">
        <van-nav-bar
            title="商品详情页面"
            left-text="返回"
            left-arrow
            @click-left="goBack"
        />
        <section class="content">
            <img :src="goodsContent.IMAGE1" alt="" style="width: 100%;">
            <div class="detail">
                <span>{{goodsContent.NAME}}</span>
                <div class="detailNum">
                    <span>{{goodsContent.PRESENT_PRICE}}元</span>
                    <span>库存：{{goodsContent.AMOUNT}}件</span>
                </div>
            </div>
        </section>
        <section class="choice">
            <van-tabs v-model="active">
                <van-tab title="商品详情">
                    <div class="innerImg" v-html="goodsContent.DETAIL"></div>
                </van-tab>
                <van-tab title="评价"><p>评论制作中</p></van-tab>
            </van-tabs>
        </section>

        <div class="downButton">
            <van-goods-action>
                <!-- <van-goods-action-icon icon="chat-o" text="客服" @click="onClickIcon" /> -->
                <van-goods-action-icon icon="cart-o" text="购物车" @click="gocart" />
                <van-goods-action-button type="warning" text="加入购物车" @click="addCart" />
                <van-goods-action-button type="danger" text="立即购买" @click="buyNow" />
            </van-goods-action>
        </div>
    </div>
</template>

<script>
import { Url } from '@/serverApi.config.js';
    export default {
        name: 'goodsdetail',
        data() {
            return {
                goodsId: '',
                goodsContent: {},
                active: '1'
            }
        },
        created() {
            if(this.$route.params.goodsId) {
                this.goodsId = this.$route.params.goodsId;
            }
        },
        mounted() {
            this.getDetail();
        },
        methods: {
            getDetail() {
                this.$http({
                    method: 'post',
                    url: Url.GoodsDetail,
                    data: {goodsId: this.goodsId}
                })
                .then(res => {
                    console.log(res)
                    if(res.status === 200) {
                        this.goodsContent = res.msg;
                    }
                    else {
                        Toast(res.msg);
                    }
                })
            },
            // 返回上一页
            goBack() {
                this.$router.go(-1)
            },
            // 加入购物车
            addCart() {
                this.$store.dispatch('isSave', this.goodsContent)
                .then(() => {
                    Toast('已存在购物车');
                })
                .catch(() => {
                    Toast('添加购物车成功');
                })
            },
            // 立即购买
            buyNow() {
                this.$store.dispatch('isSave', this.goodsContent)
                .then(() => {
                    return;
                })
                this.$router.push({path: '/cart'});
            },
            // gocart
            gocart() {
                this.$router.push({path: '/cart'});
            }
        }
    }
</script>

<style lang="scss" scoped>
@import '../assets/style/global.scss';
.goodsDetail {
    .content {
        margin-top: 41px;
        .detail {
            border-top: 1px solid orange;
            @include flex();
            padding: rem(20px);
            .detailNum {
                margin: rem(20px);
                @include flex(row, flex-end);
                span:first-child {
                    margin-right: rem(20px);
                }
            }
        }
    }
    .choice {
        border-top: 1px solid #ccc;
        .innerImg {
            font-size: 0;
        }
    }
    .downButton {
        position: fixed;
        background: #cc6699;
        padding: rem(20px);
        width: 100%;
        bottom: 0;
        display: flex;
        justify-content: space-around;
    }
}
</style>