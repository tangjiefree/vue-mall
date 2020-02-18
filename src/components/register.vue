<template>
    <div class="register">
        <mt-header fixed title="用户注册">
            <mt-button @click="goBack" icon="back" slot="left">返回</mt-button>
        </mt-header>
        <div class="form">
            <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
            <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
            <mt-button class="rigist" @click="regist" type="primary" size="large">立即注册</mt-button>
        </div>
    </div>
</template>

<script>
import {Header, Button, Field, Toast} from 'mint-ui'
import { Url } from '../serverApi.config'
    export default {
        name: 'register',
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
        methods: {
            goBack() {
                this.$router.go(-1);
            },
            regist() {
                this.$http({
                    url: Url.regist,
                    method: 'post',
                    data: {
                        userName: this.username,
                        password: this.password
                    }
                })
                .then(res => {
                    if(res.status) {
                        Toast({
                        message: res.msg,
                        iconClass: 'icon icon-success'
                        });
                        this.$router.push('/');
                    }
                    else {
                        Toast({
                            message: res.msg,
                            iconClass: 'icon icon-faild'
                        })
                    }
                })

            }
        }
    }
</script>

<style lang="scss" scoped>
@import '../assets/style/global.scss';
.register {
    .mint-header {
        display: flex;
    }
    .form {
        margin-top: rem(150px);
        padding: rem(20px);
        .rigist {
            margin-top: rem(100px);
        }
    }
}
</style>