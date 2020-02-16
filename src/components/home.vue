<template>
  <div>
    <Header />
    <Banner :bannerList="bannerList" />
    <img  class="advertes" :src="middleImg" alt="">
    <HotGoods :hotGoods="HotGoods"/>
    <Floor :floorList="floor1" :title="floor1_title"/>
    <Floor :floorList="floor2" :title="floor2_title"/>
    <Floor :floorList="floor3" :title="floor3_title"/>
  </div>
</template>

<script>
// import Swiper from 'swiper';
import Header from './component/Header';
import Banner from './component/banner';
import Floor from './component/floor';
import HotGoods from './component/hotGoods';

export default {
  name: 'HelloWorld',
  components: { Header, Banner, Floor, HotGoods },
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
    };
  },
  mounted() {
    /* eslint-disable */
    this.$http.get('https://mock.yonyoucloud.com/mock/3759/mall/api/jspang')
      .then(res => {
        console.log(res);
        this.bannerList = res.data.slides;
        this.middleImg = res.data.advertesPicture.PICTURE_ADDRESS;
        this.floor1 = res.data.floor1;
        this.floor2 = res.data.floor2;
        this.floor3 = res.data.floor3;
        this.floor1_title = res.data.floorName.floor1;
        this.floor2_title = res.data.floorName.floor2;
        this.floor3_title = res.data.floorName.floor3;
        this.HotGoods = res.data.hotGoods;
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.advertes {
  width:100%;
}
</style>
