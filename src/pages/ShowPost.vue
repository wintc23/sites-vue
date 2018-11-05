<template>
  <div class="post">
    <div class="post-title">{{postInfo.title}}</div>
    <div class="post-info">
      <div class="info-time">
        <div class="author"></div>
        发布于
        <div class="time">{{postInfo.timestamp}}</div>
      </div>
      <div class="info-read">
        阅读数：
        <div class="read-times">{{postInfo.read_times}}</div>
      </div>
    </div>
    <div class="post-content">{{postInfo.body}}</div>
    <div class="post-comments">
      <div></div>
      <div class="post-comment">
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
</style>
