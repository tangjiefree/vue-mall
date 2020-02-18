<template>
  <div class="list">
    <section class="category">
      <ul>
        <li
          @click="changeCategory(index,item.ID)"
          :class="activeIndex === index ? 'active' : ''"
          v-for="(item, index) in category"
          :key="index"
        >{{item.MALL_CATEGORY_NAME}}</li>
      </ul>
    </section>
    <section class="categorySub">
      <ul class="top">
        <li
          :class="subIndex === index ? 'subActive': ''"
          v-for="(item, index) in categorySub"
          :key="index"
          @click="deepSub(index, item.ID)"
        >{{item.MALL_SUB_NAME}}</li>
      </ul>
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" ref="loadmore">
            <ul>
                <li v-for="(item, index) in deepList" :key="index">
                    <img :onerror="errorImg" :src="item.IMAGE1" alt="">
                    <div>
                        <span>{{item.NAME}}</span>
                        <div class="add">
                            <span>-</span>
                            <span>0</span>
                            <span>+</span>
                        </div>
                    </div>
                    <div class="price">
                        <span>库存：{{item.AMOUNT}}</span>
                        <span>商品价格：{{item.ORI_PRICE}}元</span>
                    </div>
                </li>
            </ul>
      </mt-loadmore>
    </section>
  </div>
</template>

<script>
import { Url } from "@/serverApi.config.js";
import { Loadmore, Toast } from "mint-ui";
export default {
  name: "list",
  components: {
    "mt-loadmore": Loadmore
  },
  data() {
    return {
      category: [],
      activeIndex: 0,
      categorySub: [],
      categoryID: "",
      subIndex: 0,
      pageNum: 1, //当前页数
      Num: 10, //每页条数
      deepList: [],
    //   errorImg:'this.src="'+require('@/assets/images/errorimg.png')+'"',
    };
  },
  mounted() {
    this.getCategory();
  },
  methods: {
    // 获取所有大类信息
    getCategory() {
      this.$http({
        url: Url.category,
        method: "get"
      }).then(res => {
        console.log(res);
        if (res.status) {
          this.category = res.data;
        } else {
          Toast({
            message: "获取数据失败",
            position: "middle",
            duration: 2000
          });
        }
      });
    },
    // 获取小类信息
    changeCategory(index, ID) {
      this.activeIndex = index;
      this.$http({
        url: Url.categorySub,
        method: "post",
        data: {
          categoryID: ID
        }
      }).then(res => {
        console.log(res);
        if (res.status) {
          this.categorySub = res.data;
        } else {
          Toast({
            message: "获取数据失败",
            position: "middle",
            duration: 2000
          });
        }
      });
    },
    // 获取小类商品信息
    deepSub(index, ID) {
        this.subIndex = index;
        this.$http({
            url: Url.deepSub,
            method: 'post',
            data: {
                pageNum: this.pageNum,
                Num: this.Num,
                ID: ID
            }
        })
        .then(res => {
            console.log(res)
            if(res.status && res.data.length) {
                this.deepList = res.data;
            }
            else {
                Toast({
                    message: "获取数据失败",
                    position: "middle",
                    duration: 2000
                });
            }
        })
    },
    errorImg() {
        console.log(this)
        this.src = require('../assets/images/errorimg.png');
    },
    loadTop() {

    },
    loadBottom() {
        
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/style/global.scss";
.list {
  @include flex(row, space-between);
  .category {
    width: 30%;
    li {
      background: #fff;
      &.active {
        border: 1px solid orange;
        background: palegreen;
      }
    }
  }
  .categorySub {
    width: 70%;
    .top {
      @include flex(row, space-around);
      flex-wrap: wrap;
      .subActive {
        background: powderblue;
      }
    }
  }
}
</style>