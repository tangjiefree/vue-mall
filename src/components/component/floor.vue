<template>
    <div class="floor">
        <h2 class="title">{{title}}</h2>
        <div class="up">
            <div class="left">
                <img :src="floor1" alt="">
            </div>
            <div class="right">
                <div class="upfloor">
                    <img :src="floor2" alt="">
                </div>
                <div class="downfloor">
                    <img :src="floor3" alt="">
                </div>
            </div>
        </div>
        <div class="bottom">
            <ul>
                <li v-for="(item, index) in sliceList" :key="item.goodsId">
                    <img :src="item.image" alt="">
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
      floor2: '',
      floor3: '',
      sliceList: []
    }
  },
  watch: {
    floorList() {
      this.floor1 = this.floorList[0].image;
      this.floor2 = this.floorList[1].image;
      this.floor3 = this.floorList[3].image;
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
        height: 100%;
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
            height: rem(300px);
            &:last-child {
                border-bottom: 1px dashed pink; 
            }
        }
        
    }
}
</style>