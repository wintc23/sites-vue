<template>
  <div class="home-page">
    <div class="header">
      <Header @show-nav="switchShowNav"></Header>
    </div>
    <div class="content" ref="content">
      <div class="navigation">
        <!-- <div class="nav-placeholder"></div> -->
        <div class="nav-content">
          <div class="nav-top"></div>
          <div class="avatar">
            <avatar
              :userId="managerId"
              :styleObject="{
                width: '6rem',
                height: '6rem',
                borderRadius: '3rem'
              }">
            </avatar>
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
          <div class="nav-bottom"></div>
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
          icon: 'ios-bookmarks'
        },
        {
          icon: 'logo-tux',
          type: 'openSource',
          title: '开源项目'
        },
        // {
        //   type: 'works',
        //   title: '作品'
        // },
        {
          type: 'book',
          title: '读书笔记',
          icon: 'ios-book'
        },
        {
          type: 'life',
          title: '生活',
          icon: 'ios-images'
        },
        {
          type: 'personal',
          title: '关于我',
          icon: 'md-contact'
        }
      ],
      contentScroll: _.debounce(() => {
        this.scrollTop = this.$refs.content.scrollTop
      }, 200)
    }
  },
  mounted () {
    if (!this.canvasNest && this.$isPC) {
      this.canvasNest = new CanvasNest(this.$refs.content, {
        color: '72,120,246',
        count: 88,
        opacity: 1,
        zIndex: 0
      })
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
    .router-view
      flex auto
      overflow auto
    .navigation
      flex auto
      flex-shrink 1
      display flex
      justify-content flex-end
      .nav-content
        border-radius 2px
        position relative
        z-index 1
        width 15rem
        flex-shrink 0
        box-shadow 0 0 7px 0 white
        background linear-gradient(to bottom, rgba(101, 146, 249, 0.2), rgba(101, 146, 249, 1), rgba(255, 255, 255, 1)),
        no-repeat center/cover url(/static/img/blue_sky.jpg)
        display flex
        flex-direction column
        color white
        .nav-top
          flex-grow 1
        .nav-bottom
          flex-grow 2
        .avatar
          margin-bottom .5rem
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
              text-shadow 5px 5px 10px black
            &:hover .title
              // color #4878F6
              text-shadow none
            &:active .title
              position relative
              top 1px
              left 1px
            &.current-menu
              // border-radius 4px
              background linear-gradient(to right, rgba(51, 97, 216, 1), rgba(51, 97, 216, .2), rgba(51, 97, 216, 1))
              box-shadow 0 0 2px 0 white
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

