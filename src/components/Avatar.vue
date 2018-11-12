<template>
  <div class="avatar">
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
    user_id: {
      type: Number,
      required: true
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
      return this.$store.state.user.info[this.user_id]
    }
  },
  methods: {
    ...mapActions({
      getInfo: 'user/getInfo'
    })
  },
  created () {
  },
  watch: {
    user_id () {
      if (this.user_id) {
        this.getInfo({
          id: this.user_id,
          callback: () => {
            this.loaded = true
          }
        })
      }
    } 
  }
}
</script>

