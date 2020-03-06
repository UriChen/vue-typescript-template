<template>
  <div class="app-page-layout h-full">
    <app-page-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { AppPageView } from './components'

@Component({
  name: 'PageLayout',
  components: {
    AppPageView
  }
})
export default class PageLayout extends Vue {
}
</script>

