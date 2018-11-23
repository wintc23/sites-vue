<template>
  <div class="confirm-page">
    <div class="header">
      <Header></Header>
    </div>
    <div v-if="!confirmed">
      正在激活账号，请稍等...
    </div>
    <div v-else-if="confirmed & 2">
      激活失败，请重新注册
    </div>
  </div>
</template>

<script>
import userApi from '@/api/user'
import Header from '@/components/Header'

export default {
  components: {
    Header
  },
  data () {
    return {
      confirmed: 0
    }
  },
  mounted () {
    let params = {
      token: this.$route.query.token,
      email: this.$route.query.email
    }
    userApi.confirmAccount(params).then(res => {
      if (res.status === 200) {
        this.confirmed = 1
        this.$router.push({ name: 'Index' })
      }
    }).catch(error => {
      this.confirmed |= 2
    })
  }
}
</script>

<style>

</style>
