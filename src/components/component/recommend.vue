<template>
    <div class="recommend">
        <h3>热门推荐</h3>
        <ul>
            <router-link tag="li" :to="{name: 'goodsdetail', query:{goodsId: item.goodsId}}" v-for="(item, index) in recommend" :key="index">
                <img :src="item.image" alt="">
                <span>{{item.goodsName}}</span>
                <span>{{item.price | newPrice}}元</span>
            </router-link>
        </ul>
    </div>
</template>

<script>
import { PriceFix } from '../../utils/filter';
    export default {
        name: 'recommend',
        props: {
            recommend: {
                type: Array,
                required: true
            }
        },
        filters: {
            newPrice(val) {
                return PriceFix(val);
            }
        }
    }
</script>

<style lang="scss" scoped>
@import '../../assets/style/global.scss';
.recommend {
    h3 {
        text-align: center;
        font-size: rem(48px);
        margin: rem(20px) 0;
    }
    ul {
        padding: rem(20px) 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        background: cornsilk;
        li {
            width: 45%;
            display: flex;
            flex-direction: column;
            text-align: center;
            height: rem(550px);
            img {
                width: 100%;
                height: rem(400px);
            }
            border-radius: rem(20px);
            overflow: hidden;
            span {
                font-size: rem(24px);
                line-height: 1;
                padding: rem(15px) 0;
            }
        }
    }
}
</style>