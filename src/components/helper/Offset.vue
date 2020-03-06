<template>
  <div
    :style="styles"
    :class="classes"
    class="v-offset"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'HelperOffset'
})
export default class HelperOffset extends Vue {
  @Prop({ default: false }) readonly fullWidth!: boolean
  @Prop({ default: 0 }) readonly offset!: number | string
  get classes() {
    return {
      'v-offset--full-width': this.fullWidth
    }
  }

  get styles() {
    return {
      top: `-${this.offset}px`,
      marginBottom: `-${this.offset}px`
    }
  }
}
</script>

<style scoped>
  .v-offset {
    margin: 0 auto;
    max-width: calc(100% - 32px);
    position: relative;
    z-index: 1;
  }

  .v-offset--full-width {
    max-width: 100%;
  }
</style>
