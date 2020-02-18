<template>
    <div class="floor">
        <h2 class="title">{{title}}</h2>
        <div class="up">
                <div class="left">
                    <router-link :to="{name: 'goodsdetail', params: {goodsId: floor1_id}}">
                        <img :src="floor1" alt="">
                    </router-link>
                </div>
            <div class="right">
                <div class="upfloor">
                    <router-link :to="{name: 'goodsdetail', params: {goodsId: floor2_id}}">
                        <img :src="floor2" alt="">
                    </router-link>
                </div>
                <div class="downfloor">
                    <router-link :to="{name: 'goodsdetail', params: {goodsId: floor3_id}}">
                        <img :src="floor3" alt="">
                    </router-link>
                </div>
            </div>
        </div>
        <div class="bottom">
            <ul>
                <li v-for="(item, index) in sliceList" :key="item.goodsId">
                    <router-link :to="{name: 'goodsdetail', params: {goodsId: item.goodsId}}">
                            <img :src="item.image" alt="">
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
  name: 'floor',
  props: {
    floorList: {
      type: Array,
      required: true,
    },
    title: {
        type: String,
        required: true
    }
  },
  data() {
    return {
      floor1: '',
      floor1_id: '',
      floor2: '',
      floor2_id: '',
      floor3: '',
      floor3_id: '',
      sliceList: []
    }
  },
  watch: {
    floorList() {
      this.floor1 = this.floorList[0].image;
      this.floor1_id = this.floorList[0].goodsId;
      this.floor2 = this.floorList[1].image;
      this.floor2_id = this.floorList[1].goodsId;
      this.floor3 = this.floorList[2].image;
      this.floor3_id = this.floorList[2].goodsId;
      this.sliceList = this.floorList.slice(3);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/global.scss';
.floor {
    margin: rem(20px) 0;
    .title {
        color: orange;
        padding: rem(10px) rem(20px);
    }
    img {
        width: 100%;
    }
    .up {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #ccc;
        border-top: 1px solid #ccc;
        .left,
        .right {
            width: 50%;
        }
        .right {
            .upfloor,
            .downfloor {
                height: 50%;
            }
            .upfloor {
                border-bottom: 1px solid #ccc;
                border-left: 1px solid #ccc;
            }
            .downfloor {
                border-left: 1px solid #ccc;
                img {
                    height:99%;
                }
            }
        }
    }
    .bottom {
        li {
            border-bottom: 1px solid #ccc;
            // height: rem(300px);
            &:last-child {
                border-bottom: 1px dashed pink; 
            }
        }
        
    }
}
</style>