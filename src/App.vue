<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Action } from 'vuex-class'

@Component({
  name: 'App'
})
export default class App extends Vue {
  @Action('app/SetClientWidth') private SetClientWidth!: (width: number) => void
  @Action('app/SetClientHeight') private SetClientHeight!: (height: number) => void

  mounted() {
    this.resetDocumentClient()
    window.addEventListener('resize', this.resetDocumentClient)
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.resetDocumentClient)
  }

  /**
   * 重置窗口可视范围
   */
  private resetDocumentClient() {
    this.SetClientWidth(document.documentElement['clientWidth'])
    this.SetClientHeight(document.documentElement['clientHeight'])
  }
}
</script>

<style lang="scss" scoped>
  #app {
    @apply h-screen min-h-screen;
  }
</style>
