<template>
  <div class="register-page">
    <div class="register">
      <div class="register-welcome">
        欢迎注册
      </div>
      <div class="register-form">
        <Form ref="registerInfo" :model="registerInfo" :rules="ruleValidate">
          <FormItem prop="email">
            <span slot="label" class="label">邮箱</span>
            <Input type="text" v-model="registerInfo.email" placeholder="请输入注册邮箱" autocomplete="on"/>
          </FormItem>
          <FormItem prop="username">
            <span slot="label" class="label">用户名</span>
            <Input type="text" v-model="registerInfo.username" placeholder="请输入用户名" autocomplete="on"/>
          </FormItem>
          <FormItem prop="password">
            <span slot="label" class="label">请输入密码</span>
            <Input type="password" v-model="registerInfo.password" placeholder="请输入密码" />
          </FormItem>
          <FormItem prop="password2" label="请确认密码">
            <span slot="label" class="label">请确认密码</span>
            <Input type="password" v-model="registerInfo.password2" placeholder="请确认密码" />
          </FormItem>
          <FormItem :label-width="0">
            <div class="action">
              <Button class="button" type="primary" @click.stop="register('registerInfo')">注册</Button>
              <span class="login-link">
                已有账号？
                <span @click.stop="$emit('login-link')" class="link">
                  点此登录
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

export default {
  data () {
    const validatePassCheck = (rule, value, callback) => {
      if (value !== this.registerInfo.password) {
        callback(new Error('两次密码输入不一致'))
      } else {
        callback()
      }
    }
    const validateUsername = (rue, value, callback) => {
      if (value.length < 2) {
        callback(new Error('用户名太短，请选择2～15个字符长度的用户名'))
      } else if (value.length > 15) {
        callback(new Error('用户名太长，请选择2～15个字符长度的用户名'))
      } else {
        callback()
      }
    }
    return {
      registerInfo: {
        email: '1401618872@qq.com',
        password: '123456',
        password2: '123456',
        username: '123456',
        url: 'http://' + window.location.host + '/#/confirm'
      },
      ruleValidate: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur'},
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        password2: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { validator: validatePassCheck, trigger: 'blur'}
        ],
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { validator: validateUsername, trigger: 'blur' }
        ]
      },
      registerSuccess: false
    }
  },
  methods: {
    register (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          console.table(this.registerInfo)
          userApi.register(this.registerInfo).then(res => {
            if (res.status === 200 && res.data.success) {
              this.$Message.success('注册成功！')
              this.$emit('success')
            }
          }).catch(error => {
            // this.$Message.error(error.response.data.message || '注册失败')
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
.register-page
  height 100%
  display flex
  .register
    margin auto
    background #F7F7F7
    border-radius 4px
    padding 1rem 2rem
    // box-shadow 0 0 5px 2px #A9A9A9
    .register-welcome
      font-size 1.5rem
    .register-form
      .label, .login-link
        font-size 1rem
      .login-link
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
