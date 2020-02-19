<template>
    <div class="center">
        <header>
            <h3>我的</h3>
            <div class="header">
                <van-image
                    round
                    width="80"
                    height="80"
                    src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1441588315,1666293982&fm=26&gp=0.jpg"
                />
                <div class="detail">
                    <span class="member" v-if="memberName">尊贵的会员{{memberName.userName}}，欢迎回来</span>
                    <van-button v-else @click="goLogin" type="primary">前往登陆</van-button>
                </div>
            </div>
        </header>
        <section class="list">
            <van-cell-group>
                <van-cell :title="item"  v-for="(item, index) in list" :key="index" @click="action(index)"/>
            </van-cell-group>
        </section>
    </div>
</template>

<script>
import { mapState } from 'vuex';
    export default {
        name: 'center',
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
        background: #8d81e7;
        h3 {
            text-align: center;
            color: #fff;
            font-weight: bold;
            font-size: rem(48px);
            padding: rem(30px) 0;
        }
        .header {
            display: flex;
            padding: 0 rem(20px);
            padding-bottom: rem(20px);
            .detail {
                text-align: center;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 50%;
                .member {
                    color:#fff;
                    font-size: rem(36px);
                    margin-left: rem(100px);
                    white-space: nowrap;
                }
            }
        }
    }
}
</style>