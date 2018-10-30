  <template>
  <div class="post-page">
    <div v-for="(post, idx) of postList" :key="idx">
      {{post.body}}
    </div>
    <!-- <div>{{postList}}</div>
    <div class="post-title">
      <div class="title-content">这是标题</div>
      <div>标签1</div>
      <div>标签2</div>
      <div>标签3</div>
      <div>标签4</div>
    </div>
    <div class="post-content">
      这是文章内容
    </div>
    <div class="post-info">
      <div>阅读数量</div>
      <div>点赞数量</div>
      <div>评论数量</div>
    </div> -->
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
          this.$Message.success('获取成功')
          this.postList = res.data.list
        }
      })
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
