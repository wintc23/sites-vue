  <template>
  <div class="post-page">
    <div v-for="(post, idx) of postList" :key="idx" class="post">
      <div class="post-title">{{post.title}}</div>
      <div class="post-info">
        <div class="info-read">
          <Icon type="md-eye" class="icon" title="阅读次数"/>
          <span class="title">阅读</span>
          <span class="count">{{post.read_times}}</span>
        </div>
        <div class="info-like">
          <Icon type="md-heart" class="icon" title="点赞次数"/>
          <span class="title">喜欢</span>
          <span class="count">{{post.likes}}</span>
        </div>
        <div class="info-comment">
          <Icon type="md-text" class="icon" title="评论数量"/>
          <span class="title">评论</span>
          <span class="count">{{post.comment_times}}</span>
        </div>
        <div class="info-time">
          <Icon type="ios-time-outline" class="icon" title="发布时间"/>
          <span class="title">发布于</span>
          <span class="format">{{post.timestamp}}</span>
        </div>
      </div>
      <div class="post-abstract">{{post.abstract}}</div>
    </div>
  </div>
</template>

<script>
import postApi from '@/api/post'

export default {
  data () {
    return {
      content: '',
      postList: [],
      currentPage: 1,
    }
  },
  mounted () {
    this.getPostList()
  },
  methods: {
    getPostList () {
      postApi.getPosts(this.currentPage).then(res => {
        if (res.status === 200) {
          this.postList = res.data.list
        }
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.post-page
  display flex
  flex-direction column
  max-width 55rem
  margin auto
  padding 2rem
  .post
    padding 1rem
    // box-shadow 0 1px 5px 0 gray
    border-bottom 1px solid #B1B1B1
    display flex
    flex-direction column
    text-align left
    .post-title
      font-size 1.5rem
      font-weight blod
      cursor pointer
      align-self flex-start
      &:hover
        color #0593d3
        text-decoration underline
      &:active
        position relative
        left 1px
        top 1px
    .post-info
      padding .5rem
      padding-left 0
      display flex
      flex-wrap wrap
      .info-read, .info-like, .info-comment, .info-time
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
      .info-like .icon
        color #FF3939
    .post-abstract
      color #777777
</style>
