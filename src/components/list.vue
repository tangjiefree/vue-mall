<template>
  <div class="outlist">
    <van-nav-bar
      title="商品列表"
    />
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
          <van-tag round :type="subIndex === index ? 'success' : 'warning'" v-for="(item, index) in categorySub"
            :key="index"
            @click="deepSub(index, item.ID)">{{item.MALL_SUB_NAME}}</van-tag>
        </ul>
        <ul class="goodslist">
            <van-pull-refresh success-text="刷新成功" v-model="isLoading" @refresh="loadTop">
              <van-list
                  v-model="loading"
                  :immediate-check="false"
                  :finished="finished"
                  finished-text="没有更多了"
                  @load="onLoad"
                >
                <router-link
                  tag="li"
                  :to="{name: 'goodsdetail', query: {goodsId: item.ID}}"
                  v-for="(item, index) in deepList"
                  :key="index"
                >
                  <img :onerror="errorImg" :src="item.IMAGE1" alt />
                  <div class="name">
                    <span>{{item.NAME}}</span>
                  </div>
                  <div class="price">
                    <span>库存：{{item.AMOUNT}}</span>
                    <span>￥{{item.ORI_PRICE}}元</span>
                  </div>
                </router-link>
              </van-list>
          </van-pull-refresh>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
import { Url } from "@/serverApi.config.js";
import { Toast } from 'vant';
export default {
  name: "list",
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
      deepSubID: "",
      isLoading: false,
      loading: false,
      finished: false
    };
  },
  created() {
  },
  mounted() {
    this.getCategory();
    // 设置容器高度
    let deviceHeight = document.documentElement.clientHeight;
    let topHeight = document.querySelector('.top').clientHeight;
    let goodsClient = deviceHeight - 46 - topHeight - 50;
    document.querySelector('.goodslist').style.height = goodsClient + 'px';
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
          Toast('获取数据失败');
        }
      });
    },
    // 点击大类获取小类信息
    changeCategory(index, ID) {
      this.pageNum = 1;
      this.deepList = [];
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
          this.deepSub(0,this.categorySub[0].ID)
        } else {
          Toast('获取数据失败');
        }
      });
    },
    // 点击小类获取小类商品信息
    deepSub(index, ID) {
      this.pageNum = 1;
      this.finished = false;
      this.subIndex = index;
      this.deepSubID = ID;
      this.deepList = [];
      this.onLoad();
      // this.deepList = [];
      // this.$http({
      //   url: Url.deepSub,
      //   method: "post",
      //   data: {
      //     pageNum: this.pageNum++,
      //     Num: this.Num,
      //     ID: ID
      //   }
      // }).then(res => {
      //   console.log(res);
      //   if (res.status && res.data.length) {
      //     this.deepList = this.deepList.concat(res.data);
      //   } else {
      //     this.finished = true
      //     Toast('获取数据失败');
      //   }
      //   this.isLoading = false;
      // });
    },
    onLoad() {
      this.$http({
        url: Url.deepSub,
        method: "post",
        data: {
          pageNum: this.pageNum,
          Num: this.Num,
          ID: this.deepSubID
        }
      }).then(res => {
        console.log(res);
        if (res.status && res.data.length) {
          this.pageNum++;
          this.deepList = this.deepList.concat(res.data);
        } else {
          this.finished = true
          Toast('获取数据失败');
        }
        this.loading = false;
      });
    },
    goback() {
      this.$router.go(-1);
    },
    // 下拉刷新
    loadTop() {
      this.isLoading=false;
      this.finished = false;
      this.deepList=[]
      this.pageNum = 1;
      this.onLoad()
    },
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/style/global.scss";
.outlist {
  // font-size: rem(24px);
  .list {
    @include flex(row, space-between);
    .category {
      width: 25%;
      li {
        background: #fff;
        font-size: rem(36px);
        height: rem(100px);
        text-align: center;
        line-height: rem(100px);
        box-sizing: border-box;
        &.active {
          border-left: 5px solid orange;
          // background: palegreen;
        }
      }
    }
    .categorySub {
      width: 75%;
      .top {
        padding: rem(5px);
        display: flex;
        -webkit-overflow-scrolling: touch;
        overflow-x: scroll;
        height: rem(60px);
        overflow-y: hidden;
      span {
        font-size: rem(36px);
        white-space: nowrap;
        margin-right: rem(15px);
      }

      }
      .goodslist {
        // display: flex;
        // flex-direction: column;
        overflow-y: scroll;
        li {
          display: flex;
          padding-right: rem(20px);
          align-items: center;
          font-size: rem(24px);
          img {
            width: rem(200px);
            height: 100%;
          }
          .name {
            flex: 1;
            font-size: rem(36px);
            white-space: pre-wrap;
          }
          .price {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            span {
              font-size: rem(24px);
              white-space: nowrap;
            }
            span:last-child {
              font-size: rem(35px);
              color:#f55814
            }
          }
        }
      }
    }
  }
}
</style>