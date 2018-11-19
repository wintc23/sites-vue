<template>
  <div class="home-page">
    <div class="header">
      <Header @show-nav="switchShowNav" @back-home="selectMenu(0)"></Header>
    </div>
    <div class="content" ref="content">
      <div class="navigation">
        <!-- <div class="nav-placeholder"></div> -->
        <div class="nav-content">
          <div class="nav-header">
            <div class="avatar">
              <avatar :userId="managerId">
                <div slot-scope="{ userinfo }" class="avatar-slot">
                  <img :src="userinfo.avatar" class="avatar-img" alt="">
                  <div class="avatar-username">{{ userinfo.username }}</div>
                </div>
              </avatar>
            </div>
          </div>
          <div class="nav-items">
            <div
              class="nav-item"
              v-for="(menu, idx) of menuList"
              :class="menuIndex===idx ? 'current-menu': ''"
              @click.stop="selectMenu(idx)"
              :key="idx">
              <Icon class="icon" :type="menu.icon" />
              <div class="title">{{menu.title}}</div>
            </div>
          </div>
        </div>
      </div>
      <router-view class="router-view" transition-mode="out-in"></router-view>
    </div>
  </div>
</template>

<script>
import CanvasNest from 'canvas-nest.js'
import Header from '@/components/Header'
import _ from 'lodash'
import userApi from '@/api/user'

export default {
  components: {
    Header
  },
  data () {
    return {
      showNav: true,
      canvasNest: null,
      scrollTop: 0,
      managerId: 0,
      menuIndex: 0,
      menuList: [
        {
          type: 'blog',
          title: '博客',
          icon: 'ios-bookmarks',
          name: 'Index'
        },
        {
          icon: 'logo-tux',
          type: 'openSource',
          title: '开源项目',
          name: 'OpenSource'
        },
        // {
        //   type: 'works',
        //   title: '作品'
        // },
        {
          type: 'book',
          title: '读书笔记',
          icon: 'ios-book',
          name: 'Index'
        },
        {
          type: 'life',
          title: '生活',
          icon: 'ios-images',
          name: 'Life'
        },
        {
          type: 'personal',
          title: '关于我',
          icon: 'md-contact',
          name: 'AboutMe'
        }
      ],
      contentScroll: _.debounce(() => {
        this.scrollTop = this.$refs.content.scrollTop
      }, 200)
    }
  },
  mounted () {
    if (!this.$route.query.type) {
      this.selectMenu(0)
    }
    this.$nextTick(() => {
      this.$refs.content.addEventListener('scroll', this.contentScroll)
    })
    userApi.getManagerId().then(res => {
      if (res.status === 200) {
        this.managerId = res.data.id
      }
    }).catch(error => {
      console.log(error)
    })
    if (!this.canvasNest && this.$isPC) {
      this.canvasNest = new CanvasNest(this.$refs.content, {
        color: '72,120,246',
        count: 88,
        opacity: 1,
        zIndex: 0
      })
    }
  },
  beforeDestroy() {
    if (this.canvasNest) {
      this.canvasNest.destroy()
      this.canvasNest = null
    }
    this.$refs.content.removeEventListener('scroll', this.contentScroll)
  },
  methods: {
    switchShowNav () {
      this.showNav = !this.showNav
    },
    selectMenu (idx) {
      this.menuIndex = idx
      this.$router.push({
        name: this.menuList[idx].name,
        query: { type: this.menuList[idx].type }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.home-page
  display flex
  flex-direction column
  height 100%
  background #FAFBFC
  .content
    flex auto
    background #ECF5FD
    display flex
    height 100%
    position relative
    transition left .1s ease-in
    left calc(100vw - 100%)
    .router-view
      flex auto
      overflow-x auto
      overflow-y scroll
    .navigation
      flex auto
      flex-shrink 1
      // text-align right
      .nav-content
        float right
        height 100%
        border-radius 2px
        z-index 1
        width 15rem
        background rgba(101, 146, 249, .8)
        border-radius 2px
        position relative
        .nav-header
          color white
          height 10rem
          background rgba(51, 97, 216, .8)
          display flex
          align-items center
          justify-content center
          border-radius 2px
          margin-bottom 1rem
          box-shadow 0 1px 3px 1px #A1BFFC
          .avatar
            margin-bottom .5rem
            .avatar-slot
              user-select none
              .avatar-img
                width 6rem
                height 6rem
                border-radius 3rem
        .nav-items
          font-size 20px
          // align-self center
          user-select none
          .nav-item
            padding 2px .5rem
            text-align left
            cursor pointer
            border-bottom 1px solid rgba(0, 0, 0, 0)
            display flex
            align-items center
            padding-left 4rem
            .icon
              margin-right .5rem
            .title
              // text-shadow 5px 5px 10px black
            &:hover .title
              // color #4878F6
              text-shadow none
            &:active .title
              position relative
              top 1px
              left 1px
            &.current-menu
              // border-radius 4px
              background linear-gradient(to right, rgba(51, 97, 216, .2), rgba(51, 97, 216, 1), rgba(51, 97, 216, .2))
              // box-shadow 0 0 2px 0 white
              color #FFC82C
              &:hover .title
                color #FFC82C
</style>

<style lang="stylus">
.router-view
  & > .main-content
    max-width 55rem
    width 55rem
    background white
    position relative
    z-index 1
    min-height 100%
    padding 1rem
</style>

