<template>
  <div class="page-header">
    <div class="header-left">
      <div
        class="collapse"
        @click.stop="showNavigation">
        <Icon type="md-menu" />
      </div>
    </div>
    <div class="header-fill"></div>
    <div class="header-right">
      <div v-if="userInfo" class="userinfo"></div>
      <div v-else class="login-nav">
        <router-link class="login" :to="{ name: 'Login' }">
          登录
        </router-link>
        <span class="devide">|</span>
        <router-link class="register" :to="{name: 'Register'}">
          注册
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userInfo: null
    }
  },
  methods: {
    showNavigation () {
      this.$emit('show-nav')
    }
  }
}
</script>

<style lang="stylus" scoped>
.page-header
  display flex
  height 3rem
  padding 0 1rem
  align-items center
  background #0593d3
  font-size 1rem
  color white
  .header-left
    .collapse
      display flex
      align-items center
      cursor pointer
      font-size 2rem
  .header-fill
    flex auto
  .header-right
    .login-nav
      display flex
      align-items center
      .login, .register
        color white
        cursor pointer
        &:hover
          color blue
          text-decoration underline
      .devide
        margin 0 .5rem
</style>
