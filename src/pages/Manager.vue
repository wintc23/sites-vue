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
        <Button type="primary" @click.stop="updateTag" class="menu-button">保存</Button>
      </div>
    </div>
  </div>
</template>

<script>
import postApi from '@/api/post'

export default {
  data () {
    return {
      // 设置信息
      typeList: [],
      tagList: []
    }
  },
  mounted () {
    this.getPostType()
    this.getTagList()
  },
  methods: {
    tryAddType () {
      this.typeList.push({ name: '', alias: '' })
    },
    tryAddTag () {
      this.tagList.push({ name: '', alias: '' })
    },
    getPostType () {
      postApi.getPostType().then(res => {
        if (res.status === 200) {
          this.typeList = res.data.list
        }
      }).catch(error => {
        console.log(error)
      })
    },
    updatePostType () {
      postApi.updateType({ list: this.typeList }).then(res => {
        if (res.status === 200) {
          this.$Message.success('保存成功')
          this.getPostType()
        }
      }).catch(error => {
        this.$Message.error('保存失败')
      })
    },
    getTagList () {
      let res = postApi.getTagList().then(res => {
        if (res.status === 200) {
          this.tagList = res.data.list
        }
      }).catch(error => {
        console.log(error)
      })
    },
    updateTag () {
      postApi.updateTag({ list: this.tagList }).then(res => {
        if (res.status === 200) {
          this.$Message.success('保存成功')
          this.getTagList()
        }
      }).catch(error => {
        this.$Message.error('保存失败')
      })
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

