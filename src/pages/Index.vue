<template>
  <div class="editor-page">
    <mavon-editor class="editor" v-model="content"/>
    1234
  </div>
</template>

<script>


export default {
  data () {
    return {
      content: ''
    }
  }
}
</script>

<style lang="stylus" scoped>
.editor-page
  height 100%
  .editor
    height 100%
    width 100%
</style>
