<template>
    <div  class="swiper">
        <swiper :options="swiperOption">
            <swiperSlide v-for="(item, index) in bannerList" :key="index">
                <img :src="item.image" alt="">
            </swiperSlide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>
import 'swiper/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';

export default {
  props: {
    bannerList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      swiperOption: {
        loop: true,
        slidesPerView: 1,
        pagination: {
          el: '.swiper-pagination',
          clickable:true,
        }
      }
    }
  },
  components: {
    swiper, swiperSlide,
  },
//   watch: {
//       bannerList() {
//           console.log(this.bannerList)
//       }
//   }
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/global.scss';
.swiper {
    height: rem(400px);
    text-align: center;
    img {
        width: 100%;
        height: 100%;
    }
}
</style>