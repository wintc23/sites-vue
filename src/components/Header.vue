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
        <div class="login">登录</div> |
        <div class="register">注册</div>
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
  height 4rem
  padding 0 .5rem
  align-items center
  background #8CB2FB
  font-size 2rem
  .header-left
    .collapse
      display flex
      align-items center
      cursor pointer
  .header-fill
    flex auto
  .header-right
    .login-nav
      display flex
      align-items center
      color white
      .login, .register
        cursor pointer
        &:hover
          color blue
          text-decoration underline
      .login
        margin-right .5rem
      .register
        margin-left .5rem
</style>
