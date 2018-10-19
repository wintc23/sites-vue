<template>
  <div class="login-page">
    <div class="login">
      <div class="login-welcome">
        欢迎登录
      </div>
      <div class="login-form">
        <Form ref="loginInfo" :model="loginInfo" :rules="ruleValidate">
          <FormItem prop="email">
            <span slot="label" class="label">邮箱</span>
            <Input type="text" v-model="loginInfo.email" placeholder="请输入邮箱" autocomplete="on"/>
          </FormItem>
          <FormItem prop="password">
            <span slot="label" class="label">密码</span>
            <Input type="password" v-model="loginInfo.password" placeholder="请输入密码" />
          </FormItem>
          <FormItem>
            <Button type="primary" @click.stop="login('loginInfo')">登录</Button>
            <div class="register-link">
              还没有帐号？
              <router-link :to="{name: 'Register'}">
                点此注册
              </router-link>
            </div>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import userApi from '@/api/user'

export default {
  data () {
    return {
      loginInfo: {
        email: '1@qq.com',
        password: '123'
      },
      ruleValidate: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur'},
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          userApi.login(this.loginInfo)
        } else {
          this.$Message.error('请检查账号密码输入')
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.login-page
  height 100%
  display flex
  .login
    margin auto
    flex-direction column
    padding 1rem 2rem
    width 100%
    max-width 25rem
    font-size 1rem
    background #ECECEC
    border-radius 4px 
    box-shadow 0 0 5px 2px #A9A9A9
    .login-welcome
      font-size 1.5rem
    .login-form
      .label, .register-link
        font-size 1rem
      .register-link
        margin-top .5rem
</style>
