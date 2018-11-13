<template>
  <div class="editor-page" v-show="show">
    <div class="post-title">
      <Input placeholder="输入文章标题" v-model="postInfo.title" />
    </div>
    <div class="post-content">
      <mavon-editor class="editor" v-model="postInfo.body"/>
    </div>
    <div class="post-info">
    </div>
    <div class="post-menu">
      <Button type="primary" class="button" @click="showSetting=true">文章设置</Button>
      <Button type="primary" class="button" @click="save">保存</Button>
    </div>
    <Modal v-model="showSetting" title="文章设置">
      <div class="post-setting">
        <div class="post-type">
          <div class="title">文章分类</div>
          <Select v-model="postInfo.type">
            <Option
              v-for="(item, idx) of types"
              :value="item.id"
              :label="item.name"
              :key="idx">
            </Option>
          </Select>
        </div>
        <div class="post-tags">
          <div class="title">文章标签</div>
          <CheckboxGroup v-model="postInfo.tags">
            <Checkbox v-for="(tag, idx) of tags" :label="tag.id" :key="idx">
              {{ tag.name }}
            </Checkbox>
          </CheckboxGroup>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import postApi from '@/api/post'

export default {
  data () {
    return {
      loaded: false,
      showSetting: false,
      postInfo: {
        title: '',
        body: '',
        type: 0,
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
    },
    tags () {
      return this.$store.state.post.tagList
    },
    types () {
      return this.$store.state.post.typeList
    }
  },
  mounted () {
    this.getPostInfo()
  },
  methods: {
    save () {
      postApi.savePost(this.postInfo).then(res => {
        if (res.status == 200) {
          this.$Message.success('保存成功')
          this.$router.push({
            name: 'PostEdit',
            query: {
              id: this.$route.query.id
            }
          })
          this.$router.push({
            name: 'Post',
            query: {
              id: res.data.id
            }
          })
        }
      }).catch(error => {
        console.log(error)
      })
    },
    getPostInfo () {
      let postId = this.$route.query.id
      if (!postId) return
      postApi.getPost(postId).then(res => {
        if (res.status === 200) {
          this.postInfo = res.data
          this.loaded = true
        } 
      }).catch (error => {
        console.log(error)
        this.$Message.error('获取文章失败')
      })
    },
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
    z-index 1
  .post-menu
    margin-top .5rem
    text-align right
    .button
      margin .5rem

.post-setting
  .post-type, .post-tags
    margin-bottom 1rem
    .title
      margin-bottom .5rem
</style>
