<template>
    <div class="login">
        <mt-header fixed title="用户登录">
            <mt-button @click="goBack" icon="back" slot="left">返回</mt-button>
        </mt-header>
        <div class="form">
            <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
            <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
            <mt-button class="login" @click="goLogin" type="primary" size="large">立即登录</mt-button>
        </div>
    </div>
</template>

<script>
import {Header, Button, Field} from 'mint-ui';
import { Url } from '@/serverApi.config.js';
    export default {
        name: 'login',
        components: {
            'mt-header': Header,
            'mt-button': Button,
            'mt-field': Field,
        },
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
                    this.$store.commit('setToken', res.msg);
                    if(this.$route.query.redirect) {
                        this.$router.replace({path: this.$route.query.redirect})
                    }
                    else {
                        this.$router.replace({path: '/'})
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
    .mint-header {
        display: flex;
    }
    .form {
        margin-top: rem(150px);
        padding: rem(20px);
        .login {
            margin-top: rem(100px);
        }
    }
}
</style>