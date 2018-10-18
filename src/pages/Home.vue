<template>
  <div class="home-page">
    <div class="header">
      <Header @show-nav="switchShowNav"></Header>
    </div>
    <div class="content">
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
import Header from '@/components/Header'
import Navigation from '@/components/Navigation'

export default {
  components: {
    Header,
    Navigation
  },
  data () {
    return {
      showNav: true
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
  .content
    flex auto
    display flex
    .router-view
      flex auto
      overflow auto
</style>
