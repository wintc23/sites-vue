<template>
  <div class="admin-page">
    <div class="header">
      <Header @show-nav="switchShowNav"></Header>
    </div>
    <router-view class="router-view"></router-view>
    <Drawer
      title="后台管理"
      v-model="showNav"
      :closeable="true"
      placement="left"
      :transfer="true"
      class-name="header-drawer-container">
      <div class="draw-body">
        <div
          v-for="(menu, index) of menuList"
          :key="index"
          @click.stop="menu.func"
          class="menu">
          {{menu.title}}
        </div>
      </div>
    </Drawer>
  </div>
</template>

<script>
import Header from '@/components/Header'

export default {
  components: {
    Header
  },
  data () {
    return {
      showNav: false,
      menuList: [
        {
          title: '写文章',
          func: () => {
            this.showNav = false
            this.$router.push({ name: 'PostEdit' })
          }
        },
        {
          title: '标签管理',
          func: () => {
            this.showNav = false
            this.$router.push({ name: 'Manage' })
          }
        }
      ]
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
.admin-page
  display flex
  flex-direction column
  height 100%
  .router-view
    flex auto
    overflow auto
.draw-body
  display flex
  flex-direction column
  .menu
    padding .5rem
    cursor pointer
    border-radius 2px
    &:hover
      background linear-gradient(to right, rgba(101, 146, 249, 1), rgba(101, 146, 249, 0.2), rgba(101, 146, 249, 0.2), rgba(101, 146, 249, 1))
</style>

