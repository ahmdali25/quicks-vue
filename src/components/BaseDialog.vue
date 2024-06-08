<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'

interface PropsDialog {
  show: boolean
}

const props = defineProps<PropsDialog>()
const isExtraLargeView = ref<boolean>(false)

const handleResize = () => {
  isExtraLargeView.value = window.innerWidth >= 1440
}

onBeforeMount(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})
</script>

<template>
  <v-dialog
    :model-value="props.show"
    transition="dialog-bottom-transition"
    hide-overlay
    :width="isExtraLargeView ? '734px' : '500px'"
    :height="isExtraLargeView ? '734px' : '500px'"
  >
    <v-card
      :width="isExtraLargeView ? '734px' : '500px'"
      :height="isExtraLargeView ? '734px' : '500px'"
      class="pt-4"
    >
      <slot></slot>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.v-dialog {
  position: absolute;
  bottom: 15px;
  right: -51%;
}
</style>
