<template>
  <div class="page-header">
    <div class="header-left">
      <div class="back-home" @click.stop="backHome">
        <Icon type="ios-home" />
      </div>
      <div
        class="collapse"
        @click.stop="showNavigation">
        <Icon type="md-menu" />
      </div>
    </div>
    <div class="header-fill"></div>
    <div class="header-right">
      <div v-if="userInfo.username" class="user-info" v-click-outside="hideMenu">
        <div class="avatar" @click="showMenu">
          <img :src="userInfo.avatar" class="avatar-img" alt="头像" />
        </div>
        <div class="menu" v-show="showUserMenu">
          <div class="user-name menu-item">
            {{userInfo.username}}
          </div>
          <div class="write-post menu-item" v-if="userInfo.manager" @click.stop="editPost">
            写文章
          </div>
          <div class="write-post menu-item" v-if="userInfo.manager" @click.stop="manage">
            后台管理
          </div>
          <div class="log-out menu-item" @click.stop="loginOut">
            退出
          </div>
        </div>
      </div>
      <div v-else class="login-nav">
        <div class="login" @click="rightDrawer=1">登录</div>
        <span class="devide">|</span>
        <div class="login" @click="rightDrawer=2">注册</div>
      </div>
    </div>
    <Drawer
      :title="rightDrawer===1 ? '登录': '创建账户'"
      :closeable="true"
      :value="rightDrawer!==0"
      @on-close="rightDrawer=0"
      class-name="header-drawer-container">
        <div class="draw-body">
          <div class="fill"></div>
          <div class="content">
            <Login v-if="rightDrawer===1" @register-link="rightDrawer=2" @success="loginSuccess" ></Login>
            <Register v-else @login-link="rightDrawer=1" @success="registerSuccess"></Register>
          </div>
          <div class="fill"></div>
          <div class="fill"></div>
        </div>
    </Drawer>
  </div>
</template>

<script>
import Login from './Login'
import Register from './Register'
import userApi from '@/api/user'
import { getToken, clearToken } from '@/libs/tool'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      rightDrawer: 0, // 0-不显示 1-登录 2-注册
      showUserMenu: false
    }
  },
  computed: {
    showRightDrawer () {
      return this.rightDrawer !== 0
    },
    userInfo () {
      return this.$store.state.userInfo
    }
  },
  components: {
    Login,
    Register
  },
  created () {
    this.getUserInfo()
  },
  beforeDestroy() {
  },
  methods: {
    ...mapActions({
      getUserInfo: 'userInfo/getUserInfo'
    }),
    backHome () {
      this.$emit('back-home')
    },
    showNavigation () {
      this.$emit('show-nav')
    },
    loginSuccess () {
      this.rightDrawer = 0
      this.getUserInfo()
    },
    loginOut () {
      clearToken()
      this.$store.commit('userInfo/clearInfo')
    },
    registerSuccess () {
      this.rightDrawer = 2
    },
    showMenu () {
      this.showUserMenu = true
    },
    hideMenu () {
      this.showUserMenu = false
    },
    editPost () {
      this.$router.push({ name: 'PostEdit' })
    },
    manage () {
      this.$router.push({ name: 'Manage' })
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
  background rgba(51, 97, 216, 0.9)
  font-size 1rem
  border-bottom 2px solid white
  .header-left
    display flex
    align-items center
    font-size 2rem
    .collapse, .back-home
      display flex
      align-items center
      cursor pointer
      color white
      margin-right .5rem
      &:active
        position relative
        top 1px
        left 1px
  .header-fill
    flex auto
  .header-right
    margin auto 0
    display flex
    .user-info
      margin-right 2rem
      position relative
      .avatar
        display flex
        align-items center
        cursor pointer
        .avatar-img
          width 2.5rem
          height 2.5rem
          border-radius 1.5rem
      .menu
        color #3F536E
        position absolute
        z-index 2
        display flex
        flex-direction column
        width 6rem
        box-shadow 0 0 5px 1px #9B9B9B
        transform translate(-50%, 0)
        left 50%
        border-radius 4px
        opacity 1
        background white
        .menu-item
          cursor pointer
          padding 2px
          &:hover
            background #D2D2D2
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

<style lang="stylus">
.header-drawer-container > div
  width 25rem!important
  max-width 100%
  .draw-body
    height 100%
    display flex
    flex-direction column
    text-align center
    .fill
      flex auto
</style>

