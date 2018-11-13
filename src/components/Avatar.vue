<template>
  <div class="avatar" :class="horizontal ? 'horizontal' : 'vertical'">
    <template v-if="loaded">
      <div class="avatar-img">
        <img :src="userinfo.avatar" alt="" :style="styleObject">
      </div>
      <div class="avatar-username">
        {{userinfo.username}}
      </div>
    </template>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  props: {
    userId: {
      type: Number,
      required: true
    },
    horizontal: {
      type: Boolean,
      default: false
    },
    styleObject: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      loaded: false,
    }
  },
  computed: {
    userinfo () {
      if (!this.loaded) return null
      return this.$store.state.user.info[this.userId]
    }
  },
  methods: {
    ...mapActions({
      getInfo: 'user/getInfo'
    }),
    refreshInfo () {
      if (this.userId) {
        this.getInfo({
          id: this.userId,
          callback: () => {
            this.loaded = true
          }
        })
      }
    }
  },
  created () {
    this.refreshInfo()
  },
  watch: {
    userId () {
      this.refreshInfo()
    }
  }
}
</script>

<style lang="stylus" scoped>
.avatar
  user-select none
  &.horizontal
    display flex
    align-items center
    .avatar-img
      display flex
      align-items center
    .avatar-username
      color blue
      cursor pointer
      &:hover
        text-decoration underline
</style>
