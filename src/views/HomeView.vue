<script setup lang="ts">
import IconInbox from '@/assets/icons/IconInbox.vue'
import IconTask from '@/assets/icons/IconTask.vue'
import { ref } from 'vue'

const isTaskOpen = ref<boolean>(false)
const isInboxOpen = ref<boolean>(false)

const handleShowDialog = (name: string) => {
  if (name === 'task') {
    isTaskOpen.value = !isTaskOpen.value
  }

  if (name === 'inbox') {
    isInboxOpen.value = !isInboxOpen.value
  }
}
</script>

<template>
  <main>
    <v-speed-dial location="left center" transition="slide-x-reverse-transition">
      <template v-slot:activator="{ props: activatorProps }">
        <v-fab v-bind="activatorProps" size="68" color="#2F80ED" icon>
          <img src="@/assets/icons/quicks.svg" width="18px" alt="Quicks Logo" />
        </v-fab>
      </template>

      <v-btn
        @click.stop="handleShowDialog('task')"
        key="1"
        size="60"
        color="#F2F2F2"
        class="ml-3 mr-2"
        icon
        :class="isTaskOpen ? 'bg-primary-blue' : ''"
        :style="{
          'box-shadow': isTaskOpen ? '-15px 0px #4F4F4F' : ''
        }"
      >
        <IconInbox :style="{ fill: isTaskOpen ? 'white' : '#8885FF' }" />
      </v-btn>

      <v-btn
        @click.stop="handleShowDialog('inbox')"
        key="2"
        size="60"
        color="#F2F2F2"
        icon
        :class="isInboxOpen ? 'bg-indicator-orange' : ''"
        :style="{ 'box-shadow': isInboxOpen ? '-15px 0px #4F4F4F' : '' }"
      >
        <IconTask :style="{ fill: isInboxOpen ? 'white' : '#F8B76B' }" />
      </v-btn>
    </v-speed-dial>
  </main>
</template>

<style scoped>
.v-fab {
  position: fixed;
  bottom: 50px;
  right: 90px;
}
</style>
