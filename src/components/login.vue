<template>
    <div class="login">
        <van-nav-bar
            title="用户登录"
            left-text="返回"
            left-arrow
            @click-left="goBack"
        />
        <van-form @submit="goLogin">
            <van-field
                v-model="username"
                name="用户名"
                label="用户名"
                placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
                v-model="password"
                type="password"
                name="密码"
                label="密码"
                placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]"
            />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">
                立即登录
                </van-button>
            </div>
            <router-link class="toregist" :to="{name: 'register'}">还没有账号？</router-link>
        </van-form>
    </div>
</template>

<script>
import { Url } from '@/serverApi.config.js';
import { Toast } from 'vant';
    export default {
        name: 'login',
        data() {
            return {
                username: '',
                password: ''
            }
        },
        mounted() {
            console.log(this.$route)
        },
        methods: {
            goLogin() {
                this.$http({
                    method: 'post',
                    url: Url.login,
                    data: {
                        userName: this.username,
                        password: this.password
                    }
                })
                .then(res => {
                    if(res.status && res.msg !== null) {
                        this.$store.commit('setToken', res.msg);
                        if(this.$route.query.redirect) {
                            this.$router.replace({path: this.$route.query.redirect})
                        }
                        else {
                            this.$router.replace({path: '/'})
                        }
                    }
                    else {
                        Toast('请核实用户名和密码')
                    }
                })
            },
            goBack() {
                this.$router.go(-1);
            }
        }
    }
</script>

<style lang="scss" scoped>
@import '../assets/style/global.scss';
.login {
    .toregist {
        float: right;
        font-size: rem(24px);
        color: blue;
    }
}
</style>