<template>
    <div class="register">
        <van-nav-bar
            title="用户注册"
            left-text="返回"
            left-arrow
            @click-left="goBack"
        />
        <van-form @submit="regist">
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
                立即注册
                </van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
import { Url } from '../serverApi.config'
    export default {
        name: 'register',
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