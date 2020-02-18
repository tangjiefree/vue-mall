<template>
    <div class="goodsDetail">
        <mt-header fixed title="商品详情页面">
            <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
        </mt-header>
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
            <mt-navbar v-model="selected">
                <mt-tab-item id="1">商品详情</mt-tab-item>
                <mt-tab-item id="2">评价</mt-tab-item>
            </mt-navbar>
            <mt-tab-container v-model="selected" swipeable>
                <mt-tab-container-item id="1">
                    <div class="innerImg" v-html="goodsContent.DETAIL"></div>
                </mt-tab-container-item>
                <mt-tab-container-item id="2">
                    <p>评论制作中</p>
                </mt-tab-container-item>
            </mt-tab-container>
        </section>
        <div class="downButton">
            <mt-button type="primary" @click="addCart">加入购物车</mt-button>
            <mt-button type="danger" @click="buyNow">立即购买</mt-button>
        </div>
    </div>
</template>

<script>
import { Url } from '@/serverApi.config.js';
import { Header, Button, Toast, Navbar, TabItem, TabContainer, TabContainerItem } from 'mint-ui';
    export default {
        name: 'goodsdetail',
        components: {
            'mt-header': Header,
            'mt-button': Button,
            'mt-navbar': Navbar,
            'mt-tab-item': TabItem,
            'mt-tab-container': TabContainer,
            'mt-tab-container-item': TabContainerItem
        },
        data() {
            return {
                goodsId: '775e575ce28a4f89b1dfe2c99eb08ae7',
                goodsContent: {},
                selected: '1'
            }
        },
        created() {
            console.log(this.$route,11)
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
                        Toast({
                            message: res.msg,
                            position: 'middle',
                            duration: 2000
                        })
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
                    Toast({
                        message: '已存在购物车',
                        position: 'middle',
                        duration: 2000
                    })
                })
                .catch(() => {
                    Toast({
                        message: '添加购物车成功',
                        position: 'middle',
                        duration: 2000
                    })
                })
            },
            // 立即购买
            buyNow() {
                this.$store.dispatch('isSave', this.goodsContent)
                .then(() => {
                    return;
                })
                this.$router.push({path: '/cart'});
            }
        }
    }
</script>

<style lang="scss" scoped>
@import '../assets/style/global.scss';
.goodsDetail {
    .mint-header {
        display: flex;
    }
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
        .mint-navbar {
            margin-bottom: rem(5px);
        }
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