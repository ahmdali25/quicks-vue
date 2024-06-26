export const useGenerateRandomDate = (start: Date, end: Date): Date => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}
