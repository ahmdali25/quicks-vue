<script setup lang="ts">
import { useFormatDate } from '@/utils/useFormatDate'
import { ref } from 'vue'

interface Message {
  id: number
  isGroup: Boolean
  email: string
  groupName: string
  first_name: string
  last_name: string
  date: Date
  message: string
  isEdited: Boolean
}

interface PropsMessage {
  data: Message[]
}

const props = defineProps<PropsMessage>()
const messages = ref<Message[]>(props.data)
const inputMessage = ref<string>('')
const messageToEdit = ref<Message>()
const refInputMessage = ref<HTMLInputElement | null>(null)
const isEdit = ref<boolean>(false)
const isMessageLoading = ref<boolean>(false)

const emit = defineEmits<{
  (e: 'close', id: boolean): void
}>()

const closeMessage = () => {
  emit('close', false)
}

const shouldDisplayDate = (message: Message, index: number) => {
  if (index === 0) {
    return true
  }
  const previousMessage = props.data[index - 1]
  return useFormatDate(message.date) !== useFormatDate(previousMessage.date)
}

const handleAddMessage = () => {
  isMessageLoading.value = true

  messages.value.push({
    id: messages.value[messages.value.length - 1].id + 1,
    isGroup: false,
    groupName: '',
    email: 'you@email.com',
    first_name: 'You',
    last_name: '',
    date: new Date(),
    message: inputMessage.value,
    isEdited: false
  })

  inputMessage.value = ''
}

const handleSelectMessage = (message: Message) => {
  const filteredMessage = messages.value.filter((msg: Message) => msg.id === message.id)

  messageToEdit.value = filteredMessage[0]

  if (refInputMessage.value !== null) {
    refInputMessage.value.focus()
  }

  inputMessage.value = filteredMessage[0].message
  isEdit.value = true
}

const handleEditMessage = () => {
  isMessageLoading.value = true

  if (messageToEdit.value) {
    const index = messages.value.findIndex((item: Message) => item.id === messageToEdit.value?.id)

    if (index !== -1) {
      const updatedMessage: Message = {
        ...messages.value[index],
        message: inputMessage.value,
        date: new Date(),
        isEdited: true
      }

      messages.value[index] = updatedMessage
    }

    inputMessage.value = ''

    if (isEdit.value) {
      isEdit.value = false
    }
  }
}

const handleSendMessage = () => {
  if (!isEdit.value) {
    handleAddMessage()
  } else {
    handleEditMessage()
  }

  setTimeout(() => {
    isMessageLoading.value = false
  }, 3000)
}

const handleDeleteMessage = (message: Message) => {
  messages.value = messages.value.filter((msg: Message) => msg.id !== message.id)

  if (inputMessage.value) {
    inputMessage.value = ''
  }
}
</script>

<template>
  <v-card flat class="mt-n4">
    <v-toolbar color="transparent" density="comfortable" :elevation="1">
      <template v-slot:prepend>
        <v-btn icon="$arrowLeft" @click="closeMessage"></v-btn>
      </template>

      <v-toolbar-title class="text-body-1">
        <template v-if="messages[0].groupName">
          <p class="text-primary-blue">{{ messages[0].groupName }}</p>
          <p class="font-weight-regular mt-n2">
            {{ messages.length }} Participant<span v-if="messages.length > 1">s</span>
          </p>
        </template>
        <template v-else>
          <p class="text-primary-blue">{{ messages[0].first_name }} {{ messages[0].last_name }}</p>
        </template>
      </v-toolbar-title>

      <template v-slot:append>
        <v-btn icon="$close" @click="closeMessage"></v-btn>
      </template>
    </v-toolbar>

    <v-card-text
      class="message overflow-y-auto position-relative"
      style="height: 90%; padding-bottom: 100px"
    >
      <template v-for="(message, index) in messages" :key="index">
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
        <p
          class="mt-1 font-weight-medium"
          :class="message.first_name === 'You' ? 'text-right' : 'text-left'"
        >
          {{ message.first_name }} {{ message.last_name }}
        </p>
        <v-row>
          <template v-if="message.first_name === 'You'">
            <v-col cols="4"></v-col>
            <v-col cols="8">
              <v-row>
                <v-col cols="1">
                  <v-menu transition="slide-y-transition" content-class="menu">
                    <template v-slot:activator="{ props }">
                      <v-icon icon="$dots" class="cursor-pointer" v-bind="props"></v-icon>
                    </template>

                    <v-list density="compact">
                      <v-list-item
                        @click="handleSelectMessage(message)"
                        class="text-primary-blue cursor-pointer"
                      >
                        <v-list-item-title>Edit</v-list-item-title>
                      </v-list-item>
                      <v-divider></v-divider>
                      <v-list-item
                        @click="handleDeleteMessage(message)"
                        class="text-indicator-red cursor-pointer"
                      >
                        <v-list-item-title> Delete </v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-col>
                <v-col>
                  <div class="bg-chat-light-purple rounded px-3 py-2 mt-1" style="width: 100%">
                    {{ message.message }}
                    <p class="mt-1">
                      <span v-if="message.isEdited">Diedit</span>
                      {{ useFormatDate(message.date, 'hourOnly') }}
                    </p>
                  </div>
                </v-col>
              </v-row>
            </v-col>
          </template>

          <template v-else>
            <v-col sm="5" md="10" lg="7">
              <div class="bg-chat-cream rounded px-3 py-2 mt-1" style="width: 100%">
                {{ message.message }}
                <p class="mt-1">{{ useFormatDate(message.date, 'hourOnly') }}</p>
              </div>
            </v-col>
            <v-col>
              <v-menu transition="slide-y-transition" content-class="menu">
                <template v-slot:activator="{ props }">
                  <v-icon icon="$dots" class="cursor-pointer" v-bind="props"></v-icon>
                </template>

                <v-list density="compact">
                  <v-list-item
                    @click="handleDeleteMessage(message)"
                    class="text-indicator-red cursor-pointer"
                  >
                    <v-list-item-title> Delete </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-col>
          </template>
        </v-row>
      </template>

      <div class="position-fixed w-100 bottom-0 right-0 bg-white px-3">
        <form @submit.prevent="handleSendMessage">
          <v-row>
            <v-col cols="10">
              <v-text-field
                v-model="inputMessage"
                ref="refInputMessage"
                label="Type a new message"
                variant="outlined"
                density="compact"
                class="mt-4"
                single-line
                style="width: 103%"
              ></v-text-field>
            </v-col>
            <v-col cols="2" align-self="center">
              <v-btn
                type="submit"
                class="bg-primary-blue text-capitalize font-weight-bold mt-n2"
                block
                >Send</v-btn
              >
            </v-col>
          </v-row>
        </form>
      </div>

      <div v-if="isMessageLoading" class="position-fixed w-100 right-0 px-6" style="bottom: 85px">
        <v-row class="bg-sticker-light-blue" justify="center">
          <v-col cols="1" align-self="center">
            <v-progress-circular
              class="text-primary-blue"
              :size="28"
              indeterminate
            ></v-progress-circular>
          </v-col>
          <v-col align-self="center">
            <p>Please wait while we connect you with one of our team ...</p>
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

.menu .v-list {
  box-shadow: none;
  border-style: solid;
  border-width: 1px;
  border-color: #bdbdbd;
  padding: 0;
  width: 100px;
}
</style>
