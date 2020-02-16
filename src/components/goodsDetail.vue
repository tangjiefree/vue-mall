<template>
    <div>
        <h1>商品详情页面</h1>
    </div>
</template>

<script>
import { Url } from '@/serverApi.config.js';
    export default {
        props: {
            goodsId: {
                type: String,
                required: true
            }
        },
        name: 'goodsdetail',
        data() {
            return {
                goodsId: '775e575ce28a4f89b1dfe2c99eb08ae7'
            }
        },
        mounted() {
            this.getDetail()
        },
        methods: {
            getDetail() {
                this.$http({
                    method: 'post',
                    url: Url.GoodsDetail,
                    data: {goodsId: this.goodsId}
                })
                .then(res => {
                    console.log(res)
                })
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>