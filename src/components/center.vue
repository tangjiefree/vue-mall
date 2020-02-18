<template>
    <div class="center">
        <header>
            <span v-if="memberName">尊贵的会员{{memberName.userName}}，欢迎回来</span>
            <mt-button v-else @click="goLogin" type="primary">前往登陆</mt-button>
        </header>
        <section class="list">
            <ul>
                <li v-for="(item, index) in list" :key="index" @click="action(index)">
                    {{item}}
                </li>
            </ul>
        </section>
    </div>
</template>

<script>
import { Button } from 'mint-ui';
import { mapState } from 'vuex';
    export default {
        name: 'center',
        components: {
            'mt-button': Button
        },
        data() {
            return {
                list: ['地址管理', '我的订单', '联系我们', '注销登陆', '注测用户']
            }
        },
        computed: {
            ...mapState({
                memberName: 'token'
            })
        },
        methods: {
            goLogin() {
                this.$router.push({path: '/login'})
            },
            action(index) {
                switch(index) {
                    case 3:
                        this.$store.commit('removeToken');
                        this.$router.push({path: '/'})
                        break;
                    case 4:
                        this.$router.push({path: 'register'});
                        break;
                    default: 
                        return;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
@import '../assets/style/global.scss';
.center {
    header {
        text-align: center;
        line-height: rem(300px);
        height: rem(300px);
        background: #b87c23;
        color:#fff;
        font-size: rem(36px);
        font-weight: bold;
    }
    .list {
        li {
            height: rem(80px);
            padding: rem(20px);
        }
    }
}
</style>