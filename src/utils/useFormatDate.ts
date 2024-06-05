export const useFormatDate = (dateString: Date) => {
  if (!dateString) {
    return ''
  }

  const date = new Date(dateString)

  const formattedDate = new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'short',
    timeStyle: 'short'
  }).format(date)

  return formattedDate
}
