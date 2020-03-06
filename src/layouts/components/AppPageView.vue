<template>
  <router-view />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'AppPageView'
})
export default class AppPageView extends Vue {
}
</script>
