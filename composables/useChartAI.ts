export async function useChartAI(prompt: string, chartLib: string, chartType: string, aiCodeStr: string) {
  const res = await $fetch('/api/generateChart', {
    method: 'POST',
    body: { prompt, chartLib, chartType, aiCodeStr }
  })
  return res
}
