<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'app',
  mounted () {
    this.getTypeList()
    this.getTagList()
  },
  methods: {
    ...mapActions({
      getTypeList: 'post/getTypeList',
      getTagList: 'post/getTagList',
    })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
html, body {
  overflow: hidden;
}
</style>
