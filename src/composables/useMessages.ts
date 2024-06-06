import { computed, ref } from 'vue'
import axios, { type AxiosResponse } from 'axios'

const generateRandomDate = (start: Date, end: Date): Date => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

const startDate = new Date(2024, 5, 3)
const endDate = new Date()

export default function useMessages() {
  const messages = ref<any>([])
  const isLoading = ref<boolean>(false)

  const fetchMessages = async () => {
    isLoading.value = true
    try {
      const response: AxiosResponse<any> = await axios.get(
        'https://reqres.in/api/users?per_page=12'
      )
      response.data.data.forEach((user: any) => {
        messages.value.push({
          ...user,
          groupName: `Group ${Math.floor(Math.random() * 4) + 1}`,
          message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          date: generateRandomDate(startDate, endDate)
        })
      })
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      isLoading.value = false
    }
  }

  const sortedMessages = computed(() => {
    return messages.value.slice().sort((a: { date: Date }, b: { date: Date }) => {
      const dateA = new Date(a.date)
      const dateB = new Date(b.date)
      return dateA.getTime() - dateB.getTime()
    })
  })

  const groupedMessages = computed(() => {
    const groups: Record<string, any[]> = {}
    sortedMessages.value.forEach((message: { groupName: string }) => {
      if (!groups[message.groupName]) {
        groups[message.groupName] = []
      }
      groups[message.groupName].push(message)
    })
    return groups
  })

  return { groupedMessages, fetchMessages, isLoading }
}
