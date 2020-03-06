<template>
  <div class="errPage-container">
    <h2>没有权限</h2>
    <img
      :src="errGif"
      class="some-gif"
      width="313"
      height="428"
      alt="Girl has dropped her ice cream."
    >
    <button
      class="back-btn w-32 p-1 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
      type="button"
      @click.prevent="back"
    >
      返回
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import errGif from '@/assets/401-images/401.gif'

@Component({
  name: 'Page401'
})
export default class Page401 extends Vue {
  private errGif = errGif + '?' + +new Date()
  private dialogVisible = false

  private back() {
    if (this.$route.query.noGoBack) {
      this.$router.push({ path: '/account' })
    } else {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.errPage-container {
  @apply max-w-full;
  width: 800px;
  margin: 100px auto;

  .some-gif {
    @apply block;
    margin: 0 auto;
  }
}
</style>
