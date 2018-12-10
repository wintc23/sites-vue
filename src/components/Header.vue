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
          <!-- <div class="user-name menu-item">
            {{userInfo.username}}
          </div> -->
          <div class="write-post menu-item" v-if="userInfo.manager" @click.stop="editPost">
            写文章
          </div>
          <div class="write-post menu-item" v-if="userInfo.manager" @click.stop="manage">
            后台管理
          </div>
          <div class="profile-setting menu-item" @click.stop="setting">
            设置
          </div>
          <div class="log-out menu-item" @click.stop="logout">
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
            <Register v-else-if="rightDrawer===2" @login-link="rightDrawer=1" @success="registerSuccess"></Register>
          </div>
          <div class="fill"></div>
          <div class="fill"></div>
        </div>
    </Drawer>
    <Drawer
      v-model="showSetting"
      class-name="header-drawer-container"
      title="设置个人资料">
      <div class="draw-body">
        <div class="avatar">
          <div class="title">修改头像</div>
          <img
            :src="userInfo.avatar"
            alt="用户头像"
            @click.stop="clickAvatar"
            :style="{
              width: '8rem',
              height: '8rem',
              borderRadius: '50%'
            }"/>
            <form>
              <input type="file" :style="'display:none'" @change="checkAvatarUpload" accept="imag/png,image/jpeg" ref="avatarInput"/>
            </form>
            <div>点击图片更换头像</div>
        </div>
        <div class="change-passwd">
          <div class="title">修改密码</div>
          <Form ref="changePasswd" :model="changePasswd" :rules="ruleValidate">
            <FormItem prop="oldPasswd">
              <span slot="label" class="label">旧密码</span>
              <Input type="password" v-model="changePasswd.oldPasswd" placeholder="请输入旧密码" />
            </FormItem>
            <FormItem prop="newPasswd">
              <span slot="label" class="label">新密码</span>
              <Input type="password" v-model="changePasswd.newPasswd" placeholder="请输入新密码" />
            </FormItem>
            <FormItem prop="newPasswd2">
              <span slot="label" class="label">确认新密码</span>
              <Input type="password" v-model="changePasswd.newPasswd2" placeholder="请确认新密码" />
            </FormItem>
            <FormItem :label-width="0">
              <Button type="primary" @click.stop="changePassword('changePasswd')">确认修改密码</Button>
            </FormItem>
          </Form>
        </div>
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
    const validatePassCheck = (rule, value, callback) => {
      if (value !== this.changePasswd.newPasswd) {
        callback(new Error('两次密码输入不一致'))
      } else {
        callback()
      }
    }
    return {
      rightDrawer: 0, // 0-不显示 1-登录 2-注册
      showUserMenu: false,
      showSetting: false,
      changePasswd: {
        oldPasswd: '',
        newPasswd: '',
        newPasswd2: ''
      },
      ruleValidate: {
        oldPasswd: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        newPasswd: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        newPasswd2: [
          { required: true, message: '密码不能为空', trigger: 'blur'},
          { validator: validatePassCheck, trigger: 'blur'}
        ]
      }
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
      this.$router.push({ name: 'Index' })
      this.$emit('back-home')
    },
    showNavigation () {
      this.$emit('show-nav')
    },
    loginSuccess () {
      this.rightDrawer = 0
      this.getUserInfo()
    },
    logout () {
      this.hideMenu()
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
      this.hideMenu()
      this.$router.push({ name: 'PostEdit' })
    },
    manage () {
      this.hideMenu()
      this.$router.push({ name: 'Manage' })
    },
    setting () {
      this.hideMenu()
      this.showSetting = true
    },
    changePassword (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          userApi.changePasswd(this.changePasswd).then(res => {
            this.$Message.success('密码修改成功')
          })
        } else {
          this.$Message.error('请检查表单输入！')
        }
      })
    },
    clickAvatar () {
      this.$refs.avatarInput.click()
    },
    checkAvatarUpload (event) {
      console.log('change')
      let formData = new FormData()
      formData.append('image', event.target.files[0])
      userApi.changeAvatar(formData).then(res => {
        if (res.status === 200) {
          this.$store.dispatch('user/getInfo', {
            id: this.userInfo.id,
            force: true
          })
          this.$store.dispatch('userInfo/getUserInfo')
        } else {
          this.$Message.error('上传失败')
        }
      }).catch(error => {
        console.log(error)
        this.$Message.error('网络请求错误')
      })
      event.target.value = ''
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
    .avatar, .change-passwd
      margin-top .5rem
      .title
        margin-bottom .5rem
        font-size 1rem
        text-align left
        box-shadow 0 1px 1px -1px #3361D8
    .avatar
      img
        cursor pointer
</style>

