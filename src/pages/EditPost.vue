<template>
  <div class="editor-page" v-show="show">
    <div class="post-title">
      <Input placeholder="输入文章标题" />
    </div>
    <div class="post-content">
      <mavon-editor class="editor" v-model="content"/>
    </div>
    <div class="post-info">
    </div>
    <div class="post-menu">
      <Button type="primary">文章设置</Button>
      <Button type="primary">保存</Button>
    </div>
    <Modal v-model="showSetting">
      <div class="post-type">
        <div class="title">文章分类</div>
        <Select></Select>
      </div>
      <div class="post-tags">
        <div class="title">文章标签</div>
        <CheckboxGroup></CheckboxGroup>
      </div>
    </Modal>
  </div>
</template>

<script>

export default {
  data () {
    return {
      loaded: '',
      showSetting: false,
      postInfo: {
        title: '',
        content: '',
        type: '',
        tags: []
      }
    }
  },
  computed: {
    isNew () {
      return this.$route.query.id === undefined
    },
    show () {
      if (this.isNew) return true
      if (this.loaded) return true
      return false
    }
  }
}
</script>

<style lang="stylus" scoped>
.editor-page
  max-width 100%!important
  background #ECF5FD!important
  display flex
  flex-direction column
  .post-title
    margin-bottom .5rem
  .post-content
    flex auto
    position relative
  .editor
    position absolute
    top 0
    bottom 0
    left 0
    right 0
  .post-menu
    margin-top .5rem
    text-align left
</style>
