<template>
    <div class="head">
        <img :src="require('@/assets/images/icon-location.png')" alt="">
        <input type="text">
        <mt-button type="primary">查找</mt-button>
    </div>
</template>

<script>
import { Button } from 'mint-ui';

export default {
  name: 'Header',
  components: {
    'mt-button': Button,
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/style/global.scss';
.head {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: pink;
    img {
        width: rem(48px);
        height: rem(48px)
    }
}
</style>
