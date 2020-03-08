<template>
  <div class="dashboard">
    <h1 class="dashboard-title">首页</h1>
    <p class="dashboard-body">
      测试文本
    </p>
    <button
      class="back-btn w-32 p-1 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
      type="button"
      @click.prevent="handleUserLogout"
    >
      退出登录
    </button>
    <button
      class="back-btn w-32 p-1 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
      type="button"
      @click.prevent="$confirm('测试Confirm').catch(e => {})"
    >
      测试Confirm
    </button>
    <button
      class="back-btn w-32 p-1 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
      type="button"
      @click.prevent="$toast('测试toast')"
    >
      测试toast
    </button>
    <button
      class="back-btn w-32 p-1 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
      type="button"
      @click.prevent="testLoading"
    >
      测试loading
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Action } from 'vuex-class'
import to from 'await-to-js'

@Component({
  name: 'Dashboard'
})
export default class Dashboard extends Vue {
  @Action('user/UserLogout') private UserLogout!: () => Promise<any>
  /**
   * 退出登录
   */
  private async handleUserLogout() {
    const [failed] = await to(this.UserLogout())
    if (failed) {
      return
    }
    this.$router.push(`/account/login?redirect=${this.$route.fullPath}`)
  }

  private testLoading() {
    this.$loading.show('测试loading')
    setTimeout(this.$loading.hide, 2000)
  }
}
</script>

<style lang="scss" scoped>
  .dashboard {
    @apply h-full w-full p-4;
    &-title {
      @apply text-4xl;
    }
    &-body {
      @apply pl-6 text-2xl text-blue-500;
    }
  }
</style>
