<template>
  <div class="home-page">
    <div class="header">
      <Header @show-nav="switchShowNav"></Header>
    </div>
    <div class="content" ref="content">
      <div class="navigation" v-show="showNav">
        <Navigation></Navigation>
      </div>
      <div class="router-view">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import CanvasNest from 'canvas-nest.js'
import Header from '@/components/Header'
import Navigation from '@/components/Navigation'

export default {
  components: {
    Header,
    Navigation
  },
  data () {
    return {
      showNav: true,
      canvasNest: null
    }
  },
  mounted () {
    if (!this.canvasNest) {
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
      this.canvasNest.destory()
      this.canvasNest = null
    }
  },
  methods: {
    switchShowNav () {
      this.showNav = !this.showNav
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
    display flex
    .router-view
      flex auto
      overflow auto
    .navigation, .router-view
      position relative
      z-index 1
</style>
