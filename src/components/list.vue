<template>
  <div class="outlist">
    <mt-header title="商品列表">
      <mt-button icon="back" slot="left" @click="goback">返回</mt-button>
    </mt-header>
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
          <ul class="list">
            <router-link
              tag="li"
              :to="{name: 'goodsdetail', params: {goodsId: item.ID}}"
              v-for="(item, index) in deepList"
              :key="index"
            >
              <img :onerror="errorImg" :src="item.IMAGE1" alt />
              <div>
                <span>{{item.NAME}}</span>
              </div>
              <div class="price">
                <span>库存：{{item.AMOUNT}}</span>
                <span>商品价格：{{item.ORI_PRICE}}元</span>
              </div>
            </router-link>
          </ul>
        </mt-loadmore>
      </section>
    </div>
  </div>
</template>

<script>
import { Url } from "@/serverApi.config.js";
import { Loadmore, Toast, Header, Button } from "mint-ui";
export default {
  name: "list",
  components: {
    "mt-loadmore": Loadmore,
    "mt-header": Header,
    "mt-button": Button
  },
  data() {
    return {
      category: [],//大类列表
      activeIndex: 0,
      categorySub: [],//小类列表
      categoryID: "",
      subIndex: 0,
      pageNum: 1, //当前页数
      Num: 10, //每页条数
      deepList: [],//商品列表
      errorImg: 'this.src="' + require("@/assets/images/errorimg.png") + '"',
      deepSubID: ""
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
        if (res.status) {
          this.category = res.data;
          this.changeCategory(this.activeIndex, this.category[0].ID);
        } else {
          Toast({
            message: "获取数据失败",
            position: "middle",
            duration: 2000
          });
        }
      });
    },
    // 点击大类获取小类信息
    changeCategory(index, ID) {
      this.activeIndex = index;
      this.$http({
        url: Url.categorySub,
        method: "post",
        data: {
          categoryID: ID
        }
      }).then(res => {
        if (res.status) {
          this.categorySub = res.data;
          this.loadTop()
        } else {
          Toast({
            message: "获取数据失败",
            position: "middle",
            duration: 2000
          });
        }
      });
    },
    // 点击小类获取小类商品信息
    deepSub(index, ID) {
      this.subIndex = index;
      this.deepSubID = ID;
      this.$http({
        url: Url.deepSub,
        method: "post",
        data: {
          pageNum: this.pageNum,
          Num: this.Num,
          ID: ID
        }
      }).then(res => {
        console.log(res);
        if (res.status && res.data.length) {
          this.deepList = res.data;
        } else {
          Toast({
            message: "获取数据失败",
            position: "middle",
            duration: 2000
          });
        }
      });
    },
    goback() {
      this.$router.go(-1);
    },
    loadTop() {
      this.pageNum = 1;
      this.deepSub(this.subIndex, this.categorySub[this.subIndex].ID);
      this.$refs.loadmore.onTopLoaded();
    },
    loadBottom() {}
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/style/global.scss";
.outlist {
  .mint-header {
    display: flex;
  }
  .list {
    @include flex(row, space-between);
    .category {
      width: 30%;
      li {
        background: #fff;
        height: rem(100px);
        text-align: center;
        line-height: rem(100px);
        &.active {
          border: 1px solid orange;
          background: palegreen;
        }
      }
    }
    .categorySub {
      width: 70%;
      .top {
        display: -webkit-box;
        overflow-x: scroll;
        height: rem(100px);
        overflow-y: hidden;
        .subActive {
          background: powderblue;
        }
        li {
          width: rem(180px);
          height: rem(80px);
          border-radius: 80%;
          line-height: rem(80px);
          border: 1px solid orange;
          text-align: center;
          margin-right: rem(5px);
        }
      }
      .list {
        display: flex;
        flex-direction: column;
        li {
          display: flex;
          align-items: center;
          font-size: rem(12px);
          img {
            width: rem(200px);
            height: 100%;
          }
          .price {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            span {
              white-space: nowrap;
            }
          }
        }
      }
    }
  }
}
</style>