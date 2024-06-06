<script setup lang="ts">
import { useFormatDate } from '@/utils/useFormatDate'

interface Message {
  groupName: string
  first_name: string
  last_name: string
  date: string
  message: string
}

interface PropsMessage {
  data: Message[]
}

const props = defineProps<PropsMessage>()

const emit = defineEmits<{
  (e: 'close', id: boolean): void
}>()

const closeMessage = () => {
  emit('close', false)
}

const shouldDisplayDate = (message: { date: string }, index: number) => {
  if (index === 0) {
    return true
  }
  const previousMessage = props.data[index - 1]
  return useFormatDate(message.date) !== useFormatDate(previousMessage.date)
}
</script>

<template>
  <v-card flat class="mt-n4">
    <v-toolbar color="transparent" density="comfortable" :elevation="1">
      <template v-slot:prepend>
        <v-btn icon="$arrowLeft" @click="closeMessage"></v-btn>
      </template>

      <v-toolbar-title class="text-body-1">
        <p class="text-primary-blue">{{ props.data[0].groupName }}</p>
        <p class="font-weight-regular mt-n2">
          {{ props.data.length }} Participant<span v-if="props.data.length > 1">s</span>
        </p>
      </v-toolbar-title>

      <template v-slot:append>
        <v-btn icon="$close" @click="closeMessage"></v-btn>
      </template>
    </v-toolbar>

    <v-card-text class="message overflow-y-auto" style="height: 90%; padding-bottom: 100px">
      <template v-for="(message, index) in props.data" :key="index">
        <v-row v-if="shouldDisplayDate(message, index)" justify="center">
          <v-col align-self="center">
            <v-divider class="border-sm bg-primary-gray" />
          </v-col>
          <v-col cols="4">
            <div class="font-weight-bold text-center">
              {{ useFormatDate(message.date) === useFormatDate(new Date()) ? 'Today' : '' }}
              {{ useFormatDate(message.date) }}
            </div>
          </v-col>
          <v-col align-self="center">
            <v-divider class="border-sm bg-primary-gray" />
          </v-col>
        </v-row>
        <p class="mt-1 font-weight-medium">{{ message.first_name }} {{ message.last_name }}</p>
        <v-row>
          <v-col cols="10">
            <div class="bg-chat-cream rounded px-3 py-2 mt-1" style="width: max-content">
              {{ message.message }}
              <p class="mt-1">{{ useFormatDate(message.date, 'hourOnly') }}</p>
            </div>
          </v-col>
          <v-col class="ml-n7">
            <v-icon icon="$dots" class="cursor-pointer"></v-icon>
          </v-col>
        </v-row>
      </template>

      <div class="position-fixed w-100 bottom-0 right-0 bg-white px-3">
        <v-row>
          <v-col cols="10">
            <v-text-field
              label="Type a new message"
              variant="outlined"
              density="compact"
              class="mt-4"
              single-line
            ></v-text-field>
          </v-col>
          <v-col cols="2" align-self="center">
            <v-btn class="bg-primary-blue text-capitalize font-weight-bold mt-n2 ml-n3">Send</v-btn>
          </v-col>
        </v-row>
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.message::-webkit-scrollbar-track {
  border: 1px solid #bdbdbd;
  border-radius: 10px;
  padding: 2px 0;
  background-color: transparent;
  border: none;
}

.message::-webkit-scrollbar {
  width: 8px;
}

.message::-webkit-scrollbar-thumb {
  border-radius: 30px;
  background-color: #bdbdbd;
}
</style>
