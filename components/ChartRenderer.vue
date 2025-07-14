<template>
    <div class="w-full h-[490px]">
        <div ref="chartRef" class="w-full h-full" />
    </div>
</template>

<script setup>
import { onMounted, watch, onUnmounted, ref, nextTick } from 'vue'

const chartRef = ref(null)
let chartInstance = null

const props = defineProps({
    option: { type: Object, required: true }
})

const renderChart = async () => {
    await nextTick()

    // 防御：容器未挂载
    if (!chartRef.value) return

    // 清除旧图表
    if (chartInstance?.dispose) {
        chartInstance.dispose()
    }

    // 清空 div 内容
    chartRef.value.innerHTML = ''

    // 初始化 ECharts
    const echarts = await import('echarts')
    chartInstance = echarts.init(chartRef.value)
    chartInstance.setOption(props.option)
}

onMounted(() => {
    renderChart()
    window.addEventListener('resize', resizeChart)
})

onUnmounted(() => {
    if (chartInstance?.dispose) {
        chartInstance.dispose()
    }
    window.removeEventListener('resize', resizeChart)
})

watch(() => props.option, () => {
    renderChart()
}, { deep: true })

// ECharts resize 处理
const resizeChart = () => {
    if (chartInstance?.resize) {
        chartInstance.resize()
    }
}
</script>
