<template>
  <div>
    <div class="post main-content">
      <div class="post-title">{{postInfo.title}}</div>
      <div class="post-info">
        <div class="author" v-if="postInfo.author_id">
          <avatar
            :userId="postInfo.author_id"
            :horizontal="true"
            :styleObject="{
              width: '24px',
              height: '24px',
              borderRadius: '1rem'
            }">
          </avatar>
        </div>
        <div class="info-time">
          <span class="title">发布于</span>
          <Icon type="ios-time-outline" class="icon" title="发布时间"/>
          <span class="format">{{postInfo.timestamp}}</span>
        </div>
        <div class="info-read">
          <Icon type="md-eye" class="icon" title="阅读次数"/>
          <span class="title">阅读</span>
          <span class="count">{{postInfo.read_times}}</span>
        </div>
        <div class="menu-edit" v-if="postInfo.author_id && userinfo.id === postInfo.author_id">
          <Button type="primary" size='small' @click.stop="editPost">编辑</Button>
        </div>
      </div>
      <div class="post-tags" v-if="postInfo.tags">
        <div class="post-tag" v-for="(tag, idx) in postInfo.tags" :key="idx">
          {{tagList[tag].name}}
        </div>
      </div>
      <div class="post-content">
        <div v-html="content"></div>
      </div>
      <div class="post-comments">
        <div></div>
        <div class="post-comment">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import postApi from '@/api/post'

export default {
  data () {
    return {
      postInfo: {}
    }
  },
  computed: {
    content () {
      if (this.postInfo.body) {
        return this.$converter.makeHtml(this.postInfo.body)
      }
      return ''
    },
    userinfo () {
      return this.$store.state.userInfo
    },
    typeList () {
      let data = {}
      this.$store.state.post.typeList.forEach(item => {
        data[item.id] = item
      })
      return data
    },
    tagList () {
      let data = {}
      this.$store.state.post.tagList.forEach(item => {
        data[item.id] = item
      })
      return data
    }
  },
  mounted () {
    this.getPostInfo()
  },
  methods: {
    getPostInfo () {
      let postId = this.$route.query.id
      if (!postId) return
      postApi.getPost(postId).then(res => {
        if (res.status === 200) {
          this.postInfo = res.data
        } 
      }).catch (error => {
        console.log(error)
        this.$Message.error('获取文章失败')
      })
    },
    editPost () {
      this.$router.push({
        name: 'PostEdit',
        query: {
          id: this.postInfo.id
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.post
  text-align left
  .post-title
    text-align center
    font-size 1.5rem
    padding .5rem
  .post-info
    display flex
    padding .5rem
    justify-content center
    // font-size 1rem
    .info-time, .info-read
      display flex
      margin-right 1rem
      display flex
      align-items center
      .icon
        font-size 1rem
        font-weight bloder
        cursor pointer
        color #0593d3
      .title
        margin 0 2px
  .post-tags
    display flex
    padding .5rem
    user-select none
    .post-tag
      background #ECF2FC
      color #0593d3
      margin-right .5rem
      padding 4px .5rem
      border-radius 4px
      cursor pointer
      font-weight 700
      &:hover
        background #0593d3
        color white
      &:active
        position relative
        left 1px
        top 1px
</style>
