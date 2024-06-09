<script setup lang="ts">
import { reactive, ref, onBeforeMount } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { useFormatDate } from '@/utils/useFormatDate'

const panel = ref<number[]>([])

const tasks = reactive([
  {
    id: 1,
    title: 'Close off Case #012920- RODRIGUES, Amiguel',
    date: new Date(),
    content:
      ' Closing off this case since this application has been cancelled.No one really understand how this case could possibly be cancelled. The options and the documents within this document were totally a guaranteed for a success!',
    done: false
  },
  {
    id: 2,
    title:
      'Set up documentation report for several Cases : Case 145443, Case 192829 and Case 182203',
    date: new Date(),
    content:
      ' All Cases must include all payment transactions, all documents and forms filled. All conversations in comments and messages in channels and emails should be provided as well in.',
    done: false
  },
  {
    id: 3,
    title: 'Set up appointment with Dr Blake',
    date: new Date(),
    content: '',
    done: false
  }
])

onBeforeMount(() => {
  tasks.forEach((task) => {
    if (!task.done) {
      panel.value.push(task.id)
    }
  })
})
</script>

<template>
  <div>
    <v-expansion-panels
      v-model="panel"
      variant="accordion"
      v-for="(task, index) in tasks"
      :key="index"
    >
      <v-expansion-panel :value="task.id">
        <v-expansion-panel-title class="px-2 py-2">
          <v-row>
            <v-col cols="6" :style="{ 'text-decoration': task.done ? 'line-through' : 'none' }">
              <v-checkbox v-model="task.done" :label="task.title" />
            </v-col>
            <v-col cols="3">
              <span class="text-indicator-red">2 days left</span>
            </v-col>
            <v-col cols="3">
              <span>{{ useFormatDate(task.date, 'short') }}</span>
            </v-col>
          </v-row>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-row>
            <v-col cols="1" align-self="center">
              <v-icon icon="$clock" class="text-primary-blue"></v-icon>
            </v-col>
            <v-col cols="6">
              <VueDatePicker v-model="task.date" teleport-center format="dd/MM/yyyy" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="1">
              <v-icon icon="$pencil" class="text-primary-blue"></v-icon>
            </v-col>
            <v-col>
              <p v-if="task.content">
                {{ task.content }}
              </p>

              <p v-else>No Description</p>
            </v-col>
          </v-row>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
