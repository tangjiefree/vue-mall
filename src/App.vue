<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
  //   document.body.addEventListener(
  //   'touchmove',
  //   function(e) {
  //     if (e._isScroller) return
  //     // 阻止默认事件
  //     e.preventDefault()
  //   },
  //   {
  //     passive: false
  //   }
  // )
  }
};
</script>

<style>
@import url(./assets/style/global.scss);
</style>
