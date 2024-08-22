export const useAveragePlaceHook = (places: number[]) => {
  if (places.length === 0) return 0

  const sumPlace = places.reduce((a, b) => a + b)

  return (sumPlace / places.length).toFixed(2)
}
