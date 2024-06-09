export const useFormatDate = (dateString: string | Date, type?: string): string => {
  if (!dateString) {
    return ''
  }

  const date = new Date(dateString)
  let options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }

  if (type === 'withHour') {
    options = {
      dateStyle: 'short',
      timeStyle: 'short'
    }
  } else if (type === 'hourOnly') {
    options = {
      hour: '2-digit',
      minute: '2-digit'
    }
  } else if (type === 'short') {
    options = {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    }
  }

  const formattedDate = new Intl.DateTimeFormat('id-ID', options).format(date)

  return formattedDate
}
