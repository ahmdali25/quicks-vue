<script setup lang="ts">
interface PropsDialog {
  show: boolean
}

const props = defineProps<PropsDialog>()
</script>

<template>
  <v-dialog
    :model-value="props.show"
    transition="dialog-bottom-transition"
    hide-overlay
    width="500px"
    height="500px"
  >
    <v-card width="500px" height="500px" class="pt-4">
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
