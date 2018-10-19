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
          <FormItem prop="password">
            <span slot="label" class="label">请输入密码</span>
            <Input type="password" v-model="registerInfo.password" placeholder="请输入密码" />
          </FormItem>
          <FormItem prop="password2" label="请确认密码">
            <span slot="label" class="label">请确认密码</span>
            <Input type="password" v-model="registerInfo.password2" placeholder="请确认密码" />
          </FormItem>
          <FormItem :label-width="0">
            <Button type="primary" @click.stop="register('registerInfo')">注册</Button>
            <div class="login-link">
              已有账号？
              <router-link :to="{name: 'Login'}">
                点此登录
              </router-link>
            </div>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    const validatePassCheck = (rule, value, callback) => {
      if (value !== this.registerInfo.password) {
        callback(new Error('两次密码输入不一致'))
      } else {
        callback()
      }
    }
    return {
      registerInfo: {
        email: '1@qq.com',
        password: '123',
        password2: ''
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
        ]
      }
    }
  },
  methods: {
    register (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          //
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
    width 100%
    max-width 25rem
    background #ECECEC
    border-radius 4px
    padding 1rem 2rem
    box-shadow 0 0 5px 2px #A9A9A9
    .register-welcome
      font-size 1.5rem
    .register-form
      .label, .login-link
        font-size 1rem
      .login-link
        margin-top .5rem
</style>
