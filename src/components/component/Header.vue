<template>
    <div class="head">
        <van-search
          v-model="value"
          shape="round"
          background="#4fc08d"
          placeholder="请输入搜索关键词"
        />
    </div>
</template>

<script>

export default {
  name: 'Header',
  data() {
    return {
      value: ''
    }
  }
};
</script>

<style lang="scss" scoped>
// @import '../../assets/style/global.scss';
</style>
