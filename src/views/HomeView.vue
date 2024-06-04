<script setup lang="ts">
import IconInbox from '@/assets/icons/IconInbox.vue'
import IconTask from '@/assets/icons/IconTask.vue'
import BaseDialog from '@/components/BaseDialog.vue'
import { ref } from 'vue'

const isTaskOpen = ref<boolean>(false)
const isInboxOpen = ref<boolean>(false)
const isLoading = ref<boolean>(true)

const handleShowDialog = (name: string) => {
  if (name == 'task') {
    isTaskOpen.value = !isTaskOpen.value
  }

  if (name == 'inbox') {
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
        @click.stop="handleShowDialog('inbox')"
        key="2"
        size="60"
        color="#F2F2F2"
        icon
        :class="isInboxOpen ? 'bg-indicator-orange' : ''"
        :style="{ 'box-shadow': isInboxOpen ? '-15px 0px #4F4F4F' : '' }"
      >
        <IconInbox :style="{ fill: isInboxOpen ? 'white' : '#F8B76B' }" />
      </v-btn>

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
        <IconTask :style="{ fill: isTaskOpen ? 'white' : '#8885FF' }" />
      </v-btn>
    </v-speed-dial>

    <BaseDialog :show="isInboxOpen">
      <v-container class="pt-0 px-0">
        <v-row justify="center">
          <v-col cols="11">
            <v-text-field
              append-inner-icon="mdi-magnify"
              label="Search"
              variant="outlined"
              density="compact"
              single-line
            ></v-text-field>
          </v-col>
        </v-row>
        <div v-if="isLoading" class="text-center pa-16">
          <v-progress-circular
            indeterminate
            :size="50"
            :width="7"
            color="#C4C4C4"
            class="mt-16"
          ></v-progress-circular>
          <p class="mt-4">Loading Chats ...</p>
        </div>
      </v-container>
    </BaseDialog>
  </main>
</template>

<style scoped>
.v-fab {
  position: fixed;
  bottom: 50px;
  right: 90px;
}
</style>
