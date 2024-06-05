<script setup lang="ts">
interface Props {
  show: boolean
}

const props = defineProps<Props>()
</script>

<template>
  <v-dialog
    :model-value="props.show"
    transition="dialog-bottom-transition"
    hide-overlay
    width="500px"
    height="500px"
  >
    <v-card width="500px" height="500px" class="pt-4 pr-2">
      <slot></slot>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.v-dialog {
  position: absolute;
  bottom: 40px;
  right: -650px;
}
</style>
