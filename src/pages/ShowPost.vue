<template>
  <div>
    <div class="post main-content">
      <div class="post-title">{{postInfo.title}}</div>
      <div class="post-info">
        <div class="post-tags" v-if="postInfo.tags">
          <div class="post-tag" v-for="(tag, idx) in postInfo.tags" :key="idx">
            {{tagList[tag].name}}
          </div>
        </div>
        <div class="placeholder"></div>
        <div class="author" v-if="postInfo.author_id">
          <avatar :userId="postInfo.author_id" class="avatar">
            <div slot-scope="{ userinfo }" class="avatar-slot">
              <img
                :src="userinfo.avatar"
                alt=""
                class="avatar-img"
                :style="{
                  width: '1rem',
                  height: '1rem',
                  borderRadius: '.5rem'
                }">
                <span class="avatar-username">{{userinfo.username}}</span>
            </div>
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
      <div class="post-content">
        <div v-html="content"></div>
      </div>
      <div class="post-link">
        <div class="last" v-if="postInfo.before" @click.stop="showPost('before')">
          上一篇: <span class="title">{{ postInfo.before.title }}</span>
        </div>
        <div class="placeholder"></div>
        <div class="next" v-if="postInfo.after" @click.stop="showPost('after')">
          下一篇：<span class="title">{{ postInfo.after.title }}</span>
        </div>
      </div>
      <div class="post-comments">
        <div class="comment-title">评论({{commentNum}})</div>
        <div class="add-comment">
          <Input  v-model="comment" type="textarea" />
          <Button type="primary" class="submit" @click.stop="addComment(comment)">提交</Button>
        </div>
        <div class="post-comment-tree">
          <simple-tree
            class="tree"
            :expand="false"
            :treeData="commentTree">
            <div slot-scope="{ parentData, data }">
              <avatar :userId="data.author_id" class="comment-avatar">
                <div slot-scope="{ userinfo }" class="avatar-slot">
                  <img :src="userinfo.avatar" class="avatar-img"/>
                  <span class="avatar-username">{{ userinfo.username }}</span>
                  {{data.timestamp}} {{typeof data.timestamp}}
                  <span class="reply-comment reply" v-if="data.response_id">
                    回复
                    <avatar
                      :userId="commentInfo[data.response_id.author_id]"
                      class="reply-avatar">
                      <div class="avatar-slot" slot-scope="{ userinfo }">
                        <img :src="userinfo.avatar" />
                        <span>{{userinfo.username}}</span>
                      </div>
                    </avatar>
                  </span>
                  <span class="reply-post reply">评论：</span>
                </div>
              </avatar>
              <div class="comment-body">
                {{ data.body }}
              </div>
              <div class="comment-menu">
                <div class="comment-like">
                  <Icon class="like" type="md-thumbs-up" />
                  <span class="like-times">23 </span>
                </div>
                <div class="reply">
                  <Icon @click.stop="setComment(data)" class="reply-icon" type="ios-undo" />
                </div>
              </div>
              <div class="reply-edit" v-if="data.commentEdit">
                <Input class="reply-input" type="textarea" :rows="2" :autosize="true" v-model="data.comment" />
                <Button type="success" @click.stop="addComment(data.comment, data.id)">提交评论</Button>
              </div>
            </div>
          </simple-tree>
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
      postInfo: {},
      commentTree: [],
      comment: '',
      commentNum: 0,
      commentInfo: {}
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
    },
    userInfo () {
      return this.$store.state.userInfo
    }
  },
  watch: {
    '$route': function () {
      this.refreshPage()
    }
  },
  mounted () {
    this.refreshPage()
  },
  methods: {
    refreshPage() {
      this.getPostInfo()
      this.getComments()
    },
    getPostInfo () {
      let postId = this.$route.query.id
      let postType = this.$route.query.type
      if (!postId) return
      postApi.getPost({
        postId,
        postType
      }).then(res => {
        if (res.status === 200) {
          this.postInfo = res.data
        } 
      }).catch (error => {
        console.log(error)
        this.$Message.error('获取文章失败')
      })
    },
    getComments () {
      postApi.getComments(this.$route.query.id).then(res => {
        if (res.status === 200) {
          this.generateCommentInfo(res.data)
        }
      }).catch(error => {
        console.log(error)
        this.$Message.error('加载评论失败')
      })
    },
    editPost () {
      this.$router.push({
        name: 'PostEdit',
        query: {
          id: this.postInfo.id
        }
      })
    },
    showPost (type) {
      let query = {
        type: this.$route.query.type,
        id: this.postInfo[type].id
      }
      this.$router.push({ name: 'Post', query })
    },
    generateCommentInfo (comments) {
      this.commentNum = comments.length
      // 回复评论通常围绕相主题，所以评论树分为两层即可
      comments.sort((a, b) => a.timestamp > b.timestamp ? 1 : -1)
      let info = {} // 已安排的记录
      let list = []
      for (let comment of comments) {
        this.commentInfo[comment.id] = comment
        if (comment.response_id) {
          if (!info[comment.response_id]) continue
          info[comment.response_id].push(comment)
          info[comment.id] = info[comment.response_id]
        } else {
          comment.children = []
          info[comment.id] = comment.children
          list.push(comment)
        }
      }
      list.sort((a, b) => a.timestamp < b.timestamp ? 1 : -1)
      this.commentTree = list
    },
    setComment (data) {
      this.$set(data, 'commentEdit', !data.commentEdit)
      if (!data.comment) {
        this.$set(data, 'comment', '')
      }
    },
    addComment (comment, response) {
      let params = {
        body: comment,
        postId: this.$route.query.id,
      }
      if (response) {
        params.responseId = response
      }
      postApi.addComment(params).then(res => {
        if (res.status === 200) {
          this.$Message.success('评论成功')
          this.getComments()
          this.comment = ''
        }
      }).catch(error => {
        this.$Message.error('评论失败')
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.post
  text-align left
  padding .5rem
  .post-title
    margin-bottom 1rem
    text-align left
    font-size 1.5rem
    padding-bottom .5rem
    border-bottom 2px solid rgba(51, 97, 216, .5)
  .post-info
    padding 0 1rem
    display flex
    margin .5rem 0
    align-items center
    // justify-content center
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
    .placeholder
      flex auto
    .post-tags
      margin .5rem 0
      display flex
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
    .author
      .avatar
        .avatar-slot
          display flex
          align-items center
          .avatar-username
            color blue
            cursor pointer
            &:hover
              text-decoration underline
            &:active
              position relative
              top 1px
              left 1px
  .post-content
    margin-top 1rem
    box-shadow 0 0 3px 1px #DFDFDF
    border-radius 2px
    padding 1rem
  .post-link
    display flex
    flex-wrap wrap
    margin 1rem 0
    cursor pointer
    user-select none
    .last, .next
      color blue
      &:hover
        text-decoration underline
      &:active
        position relative
        top 1px
        left 1px
    .placeholder
      flex auto

  .post-comments
    .comment-title
      border-bottom 1px solid #c9c9c9
      margin-bottom .5rem
      opadding-bnottom 4px
    .add-comment
      overflow hidden
      .submit
        margin-top .5rem
        float right
    .post-comment-tree
      border-top 1px solid #b2b2b2
      margin .5rem 0
      padding .5rem
      .comment-avatar
        padding 4px
        .avatar-slot
          display flex
          align-items center
          .avatar-img
            width 2rem
            height 2rem
            border-radius 1rem
          .avatar-username
            margin 0 .5rem
      .comment-body, .reply-edit, .comment-menu
        margin-left 2.5rem
      .comment-menu
        margin-top .5rem
        display flex
        align-items center
        .comment-like .like, .reply .reply-icon
          cursor pointer
          font-size 16px
          // width 1rem
          // height 1rem
          display inline-flex
          justify-content center
          color #0593d3
          &:active
            position relative
            left 1px
            top 1px
        .reply
          margin 0 .5rem
        .comment-like
          display flex
          align-items center
          .like-times
            // font-size 1rem
      .reply-edit
        .reply-input
          margin .5rem 0
</style>
