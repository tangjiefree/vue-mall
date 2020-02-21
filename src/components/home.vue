<template>
  <div class="home">
    <Header />
    <Banner :bannerList="bannerList" />
    <div>
      <img  class="advertes" :src="middleImg" alt="">
    </div>
    <HotGoods :hotGoods="HotGoods"/>
    <Floor :floorList="floor1" :title="floor1_title"/>
    <Floor :floorList="floor2" :title="floor2_title"/>
    <Floor :floorList="floor3" :title="floor3_title"/>
    <Recommend :recommend="recommend" />
  </div>
</template>

<script>
// import Swiper from 'swiper';
import Header from './component/Header';
import Banner from './component/banner';
import Floor from './component/floor';
import HotGoods from './component/hotGoods';
import Recommend from './component/recommend';
import {Url} from '../serverApi.config';

export default {
  name: 'HelloWorld',
  components: { Header, Banner, Floor, HotGoods, Recommend },
  data() {
    return {
      bannerList: [],
      middleImg: '',
      floor1: [],
      floor1_title: '',
      floor2: [],
      floor2_title: '',
      floor3: [],
      floor3_title: '',
      HotGoods: [],
      recommend: []
    };
  },
  mounted() {
    /* eslint-disable */
    // this.$http.get('/goods/fetchall')
    this.$http.get(Url.fetchall)
      .then(res => {
        console.log(res);
        if(res.status) {
          const data = res.data.data;
          this.bannerList = data.slides;
          this.middleImg = data.advertesPicture.PICTURE_ADDRESS;
          this.floor1 = data.floor1;
          this.floor2 = data.floor2;
          this.floor3 = data.floor3;
          this.floor1_title = data.floorName.floor1;
          this.floor2_title = data.floorName.floor2;
          this.floor3_title = data.floorName.floor3;
          this.HotGoods = data.hotGoods;
          this.recommend = data.recommend;
        }
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.home {
  .advertes {
    width:100%;
    display: block;
  }
}
</style>
