<template>
    <div class="hotGoods">
        <h3>热门商品</h3>
        <swiper :options="swiperOptions">
            <swiperSlide class="slides" v-for="(item, index) in hotGoods" :key="index">
              <router-link
                :to="{name: 'goodsdetail', params:{goodsId: item.goodsId}}"
                tag="div"
              >
                <div class="image">
                    <img :src="item.image" alt="">
                </div>
                <div class="des">
                    <span>{{item.name}}</span>
                    <span>￥{{item.price | FixPrice}}元</span>
                </div>
              </router-link>
            </swiperSlide>
        </swiper>
    </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';
import { PriceFix } from '@/utils/filter';

export default {
  name: 'hotGoods',
  props: {
    hotGoods: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      swiperOptions: {
        slidesPerView: 3,
      },
    };
  },
  components: {
    swiper,
    swiperSlide,
  },
  filters: {
      FixPrice(money) {
        return  PriceFix(money)
      }
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/style/global.scss';
.hotGoods {
    h3 {
        color: orange;
        padding: rem(20px) rem(30px);
    }
    .slides {
        height: rem(470px);
        img {
            width: 100%;
            height: 100%;
        }
        .des {
            font-size: rem(30px);
            display: flex;
            white-space: pre-wrap;
            flex-direction: column;
            text-align: center;
            span:last-child {
              color:orangered;
            }
        }
    }
}
</style>
