<template>
  <div class="login-page">
    <div class="login-welcome">
      欢迎登录
    </div>
    <div class="login-form">
      <div class="error-message" v-if="error">帐号或密码错误</div>
      <div class="login-email">
       <div class="title">邮箱</div> 
       <Input></Input>
       <div class="action">
         <Button type="primary">登录</Button>
         <div class="register">
           还没有帐号？
           <view-router :to="{name: 'Register'}">
             点此注册
           </view-router>
          </div>
       </div>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      login_info: {
        email: '',
        password: '',
        error: false
      }
    }
  }
}
</script>
