<template>
  <div class="manager-page">
    <div class="manager-item">
      <div class="title">文章分类</div>
      <div class="items">
        <div class="item">
          <div class="item-left">类别</div>
          <div class="item-right">别名</div>
        </div>
        <div class="item" v-for="(type, idx) of typeList" :key="idx">
          <Input class="item-left" v-model="type.name" />
          <Input class="item-right" v-model="type.alias" />
        </div>
        <Button type="primary" @click.stop="tryAddType" class="menu-button">添加</Button>
        <Button type="primary" @click.stop="updatePostType" class="menu-button">保存</Button>
      </div>
    </div>
    <div class="manager-item">
      <div class="title">文章标签</div>
      <div class="items">
        <div class="item">
          <div class="item-left">标签名</div>
          <div class="item-right">别名</div>
        </div>
        <div class="item" v-for="(type, idx) of tagList" :key="idx">
          <Input class="item-left" v-model="type.name" />
          <Input class="item-right" v-model="type.alias" />
        </div>
        <Button type="primary" @click.stop="tryAddTag" class="menu-button">添加</Button>
        <Button type="primary" @click.stop="updatePostTag" class="menu-button">保存</Button>
      </div>
    </div>
  </div>
</template>

<script>
import postApi from '@/api/post'
import { mapActions } from 'vuex'
import _ from 'lodash'

export default {
  data () {
    return {
      // 设置信息
      typeList: _.cloneDeep(this.$store.state.post.typeList),
      tagList: _.cloneDeep(this.$store.state.tagList)
    }
  },
  watch: {
    '$store.state.post.typeList': function () {
      this.typeList = _.cloneDeep(this.$store.state.post.typeList)
    },
    '$store.state.post.tagList': function () {
      this.tagList = _.cloneDeep(this.$store.state.post.tagList)
    }
  },
  mounted () {
    this.getTypeList()
    this.getTagList()
  },
  methods: {
    ...mapActions({
      getTypeList: 'post/getTypeList',
      getTagList: 'post/getTagList',
      updateType: 'post/updateType',
      updateTag: 'post/updateTag'
    }),
    tryAddType () {
      this.typeList.push({ name: '', alias: '' })
    },
    tryAddTag () {
      this.tagList.push({ name: '', alias: '' })
    },
    updatePostType () {
      this.updateType({ list: this.typeList, notify: true })
    },
    updatePostTag () {
      this.updateTag({ list: this.tagList, notify: true })
    }
  }
}
</script>

<style lang="stylus" scoped>
.manager-page
  display flex
  flex-direction column
  text-align left
  .manager-item
    border-bottom 1px solid #B1B1B1
    margin-bottom 1rem
    padding 1rem
    .title
      margin .5rem
    .items
      padding 1rem
      .item
        margin-bottom .5rem
        display flex
        .item-left, .item-right
          flex auto
          margin-right 1rem
      .menu-button
        margin-right 1rem
</style>

