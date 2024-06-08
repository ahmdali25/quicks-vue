<script setup lang="ts">
import IconInbox from '@/assets/icons/IconInbox.vue'
import IconPerson from '@/assets/icons/IconPerson.vue'
import IconTask from '@/assets/icons/IconTask.vue'
import BaseDialog from '@/components/BaseDialog.vue'
import TheMessage from '@/components/TheMessage.vue'
import { reactive, ref } from 'vue'
import useMessages from '@/composables/useMessages'
import { useFormatDate } from '@/utils/useFormatDate'

const isTaskOpen = ref<boolean>(false)
const isInboxOpen = ref<boolean>(false)
const isShowMessage = ref<boolean>(false)

const { groupedMessages, fetchMessages, isLoading } = useMessages()
let selectedMessage = reactive<string[]>([])

const handleShowDialog = async (name: string) => {
  if (name == 'task') {
    isTaskOpen.value = !isTaskOpen.value
  }

  if (name == 'inbox') {
    isInboxOpen.value = !isInboxOpen.value
    await fetchMessages()
  }
}

const lastIndex = (index: string) => {
  if (groupedMessages.length - Number(index + 1) === 0) {
    return true
  } else {
    return false
  }
}

const handleShowMessage = (group: string[]) => {
  selectedMessage = group
  isShowMessage.value = true
}

const handleCloseMessage = () => {
  isShowMessage.value = false
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
      <v-container v-if="!isShowMessage" class="pt-0 container overflow-y-auto">
        <v-row justify="center">
          <v-col cols="12">
            <v-text-field
              append-inner-icon="$search"
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

        <div v-else v-for="(group, index) in groupedMessages" :key="index">
          <v-row class="cursor-pointer" @click="handleShowMessage(group)">
            <template v-if="group[0].isGroup === true">
              <v-col cols="1">
                <div class="wrapper">
                  <div class="circle filled position-absolute left-0">
                    <IconPerson :style="{ fill: '#676767', width: '12px' }" />
                  </div>
                  <div class="circle filled-blue position-absolute right-0">
                    <IconPerson :style="{ fill: 'white', width: '12px' }" />
                  </div>
                </div>
              </v-col>
              <v-col cols="11">
                <v-row justify="space-between">
                  <v-col class="ml-4">
                    <span class="text-primary-blue font-weight-bold"
                      >{{ group[0].groupName }}
                    </span>
                  </v-col>
                  <v-col>
                    <span class="text-body-2">{{
                      useFormatDate(group[group.length - 1].date, 'withHour')
                    }}</span>
                  </v-col>
                </v-row>
                <template v-for="(message, index) in group" :key="index">
                  <template v-if="index === group.length - 1">
                    <p class="font-weight-bold text-body-2 text-primary-dark-gray ml-4">
                      {{ message.first_name }} {{ message.last_name }}
                    </p>
                    <p class="ml-4 text-body-2">{{ message.message }}</p>
                  </template>
                </template>
              </v-col>
            </template>
            <template v-else>
              <template v-for="(message, index) in group" :key="index">
                <v-col cols="1" align-self="center">
                  <div class="circle filled-blue">
                    <IconPerson :style="{ fill: 'white', width: '12px' }" />
                  </div>
                </v-col>
                <v-col cols="11">
                  <v-row justify="space-between">
                    <v-col class="ml-4">
                      <span class="text-primary-blue font-weight-bold"
                        >{{ message.first_name }} {{ message.last_name }}
                      </span>
                    </v-col>
                    <v-col>
                      <span class="text-body-2">{{
                        useFormatDate(group[group.length - 1].date, 'withHour')
                      }}</span>
                    </v-col>
                  </v-row>
                  <p class="ml-4 text-body-2">{{ message.message }}</p>
                </v-col>
              </template>
            </template>
          </v-row>
          <v-row v-if="!isLoading && !lastIndex(index)" justify="center">
            <v-col>
              <v-divider class="border-sm bg-primary-gray mb-4"></v-divider>
            </v-col>
          </v-row>
        </div>
      </v-container>

      <TheMessage
        v-else
        :show="isShowMessage"
        @close="handleCloseMessage"
        :data="selectedMessage"
      />
    </BaseDialog>
  </main>
</template>

<style scoped>
.v-fab {
  position: fixed;
  bottom: 50px;
  right: 90px;
}

.wrapper {
  position: relative;
  width: 51px;
  display: flex;
}

.circle {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  line-height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.filled {
  background-color: #e0e0e0;
}

.filled-blue {
  background-color: #2f80ed;
}

.container::-webkit-scrollbar-track {
  border: 1px solid #bdbdbd;
  border-radius: 10px;
  padding: 2px 0;
  background-color: transparent;
  border: none;
}

.container::-webkit-scrollbar {
  width: 8px;
}

.container::-webkit-scrollbar-thumb {
  border-radius: 30px;
  background-color: #bdbdbd;
}
</style>
