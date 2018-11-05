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
            <Input type="text" v-model="loginInfo.email" @on-enter="login('loginInfo')" placeholder="请输入邮箱" autocomplete="on"/>
          </FormItem>
          <FormItem prop="password">
            <span slot="label" class="label">密码</span>
            <Input type="password" v-model="loginInfo.password" @on-enter="login('loginInfo')" placeholder="请输入密码" />
          </FormItem>
          <FormItem :label-width="0">
            <div class="action">
              <Button class="button" type="primary" @click.stop="login('loginInfo')">登录</Button>
              <span class="register-link">
                没有账号？
                <span @click.stop="$emit('register-link')" class="link">
                  点此注册
                </span>
              </span>
            </div>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import userApi from '@/api/user'
import { setToken } from '@/libs/tool'

export default {
  data () {
    return {
      loginInfo: {
        email: '',
        password: ''
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
          userApi.login(this.loginInfo).then(res => {
            if (res.status === 200) {
              this.$Message.success('登录成功')
              let token = res.data.token
              setToken(token)
              this.$emit('success')
            }
          }).catch(error => {
            this.$Message.error('登录失败')
          })
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
    font-size 1rem
    background #F7F7F7
    border-radius 4px 
    // box-shadow 0 0 5px 2px #A9A9A9
    .login-welcome
      font-size 1.5rem
    .login-form
      .label, .register-link
        font-size 1rem
      .register-link
        margin-top .5rem
        .link
          cursor pointer
          color blue
          &:hover
            text-decoration underline
      .action
        display flex
        justify-content center
        align-items center
        .button
          padding 5px 1rem
          margin-right 1rem
</style>
