<template>
  <div>
    <div class="post main-content">
      <div class="post-title">{{postInfo.title}}</div>
      <div class="post-info">
        <div class="info-time">
          <Icon type="ios-time-outline" class="icon" title="发布时间"/>
          <span class="title">发布于</span>
          <span class="format">{{postInfo.timestamp}}</span>
        </div>
        <div class="info-read">
          <Icon type="md-eye" class="icon" title="阅读次数"/>
          <span class="title">阅读</span>
          <span class="count">{{postInfo.read_times}}</span>
        </div>
      </div>
      <div class="post-content">{{postInfo.body}}</div>
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
  mounted () {
    this.getPostInfo()
  },
  methods: {
    async getPostInfo () {
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
</style>
