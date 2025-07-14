<template>
    <div class="h-full flex flex-col" :class="{ 'justify-center': !chartOption }">
        <!-- 主内容区域 -->
        <transition name="chart-content" appear>
            <div v-if="chartOption" class="flex-1 flex h-0 px-2">
                <!-- 左侧代码区域 -->
                <transition name="slide-left" appear>
                    <div class="flex-1 w-0 p-4 border-r h-full box-border">
                        <div class="mb-4 text-base text-3c font-medium">配置预览</div>
                        <CodeBlock :code="showChartCode" :editcode="editCode" @edit-handle="editCodeHandle" />
                    </div>
                </transition>

                <!-- 右侧图表区域 -->
                <transition name="slide-right" appear>
                    <div class="flex-1 w-0 p-4 box-border">
                        <div class="mb-4 text-base text-3c font-medium">图表预览</div>
                        <ChartRenderer :option="chartOption" />
                    </div>
                </transition>
            </div>
        </transition>

        <!-- 底部输入区域 -->
        <transition name="form-slide" appear>
            <div class="p-6 border-t bg-white text-3c" :class="{ 'form-centered': !chartOption }">
                <div class="max-w-2xl mx-auto space-y-4">
                    <transition name="fade">
                        <div v-if="!chartOption" class="text-3xl text-center mb-8">{{ welcomeText }}</div>
                    </transition>

                    <div class="flex gap-4">
                        <n-tooltip trigger="hover">
                            <template #trigger>
                                <n-select
                                    v-model:value="chartType" :options="CHART_TYPE_OPTIONS" placeholder="图表类型"
                                    class="flex-1 h-10" :render-option="renderOption" />
                            </template>
                            选择你需要的图表类型
                        </n-tooltip>
                    </div>

                    <div class="flex gap-4">
                        <n-input
                            v-model:value="prompt" :loading="loading" type="textarea"
                            placeholder="给我说说你的图表需求☝️，例：六个月的代码量统计" :autosize="{
                                minRows: 4,
                                maxRows: 5,
                            }" class="flex-1 question_input" @keyup.enter="generateChart">
                            <template v-if="!loading" #suffix>
                                <n-icon size="20" color="#141414">
                                    <ArrowUpCircleSharp />
                                </n-icon>
                            </template>
                        </n-input>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { ref, watch, h, onMounted } from 'vue'
import { ArrowUpCircleSharp } from '@vicons/ionicons5'
import stringify from 'stringify-object'
import { CHART_TYPE_OPTIONS, WELCOME_MESSAGES } from '@/constant'
import { NTooltip } from 'naive-ui'
import { useChartAI } from '@/composables/useChartAI'
import ChartRenderer from '@/components/ChartRenderer.vue'
import CodeBlock from '@/components/CodeBlock.vue'

const prompt = ref('六个月代码量')
const chartOption = ref()
const showChartCode = ref()
const aiCodeStr = ref()
const chartType = ref('bar')
const loading = ref(false)
const editCode = ref('');
const isGeneratingChart = ref(false); // 标志位，防止循环触发

const welcomeText = ref('')

onMounted(() => {
    welcomeText.value = WELCOME_MESSAGES[Math.floor(Math.random() * WELCOME_MESSAGES.length)]
});

const renderOption = (params) => {
    const { node, option } = params
    return h(
        NTooltip,
        {
            placement: 'left', // 或 'top'
            trigger: 'hover',
            showArrow: false,
        },
        {
            trigger: () => node,
            default: () =>
                h('div', {}, [
                    h('div', {
                        style: 'font-weight: bold; margin-bottom: 8px;',
                        innerText: option.label,
                    }),
                    h('img', {
                        src: option.preview,
                        style: 'width: 270px; height: 200px; border-radius: 6px; margin-bottom: 8px;',
                    }),
                    h('div', { style: 'font-size: 12px; color: #999;' }, option.description),
                ]),
        }
    )
}

async function generateChart() {
    if (!prompt.value?.trim()) return

    loading.value = true
    isGeneratingChart.value = true; // 设置标志位
    const result = await useChartAI(prompt.value, 'echarts', chartType.value, aiCodeStr.value)
    loading.value = false

    editCode.value = result;

    let obj
    try {
        obj = (new Function(`return ${result}`))()
    } catch (e) {
        console.error('解析失败', e)
        obj = { option: {} }
    }

    chartOption.value = obj // 直接使用解析出的对象

    const formattedCode = stringify(chartOption.value, {
        indent: '  ',
        singleQuotes: false,
    })
    aiCodeStr.value = formattedCode // 回传AI生成的代码

    showChartCode.value = formattedCode; // 代码展示

    // 延迟重置标志位，确保 CodeBlock 组件的监听器执行完毕
    const timer = setTimeout(() => {
        clearTimeout(timer)
        isGeneratingChart.value = false;
    }, 5000);
}

watch(chartType, () => {
    prompt.value = '';
    aiCodeStr.value = undefined // 清空旧的 JSON 字符串
})

// 编辑代码
const editCodeHandle = (newValCode) => {
    console.log(isGeneratingChart.value);

    // 如果正在生成图表，忽略编辑器的变化事件
    if (isGeneratingChart.value) {
        console.log('正在生成图表，忽略编辑器变化');
        return;
    }

    let obj
    try {
        // 提取函数体内的对象部分，支持箭头函数格式
        const match = newValCode.match(/const\s+createOption\s*=\s*\(\)\s*=>\s*\(([\s\S]+)\)$/)
        if (match && match[1]) {
            // 直接解析对象字符串
            obj = (new Function(`return ${match[1]}`))();
        } else {
            // 如果匹配失败，尝试直接执行整个代码
            obj = (new Function(`return (${newValCode})()`))();
        }
    } catch (e) {
        console.error('解析失败', e)
        obj = { option: {} }
    }
    console.log(obj, '解析后-----');


    chartOption.value = obj // 直接使用解析出的对象

    const formattedCode = stringify(chartOption.value, {
        indent: '  ',
        singleQuotes: false,
    })
    aiCodeStr.value = formattedCode // 回传AI生成的代码

    showChartCode.value = formattedCode; // 代码展示
}
</script>

<style>
.question_input.n-input .n-input__suffix,
.n-input .n-input__prefix {
    align-items: flex-end;
    padding-bottom: 8px;
}

/* 图表内容区域动画 */
.chart-content-enter-active {
    transition: all 0.8s ease-out;
}

.chart-content-enter-from {
    opacity: 0;
    transform: translateY(-20px);
}

/* 左侧代码区域动画 */
.slide-left-enter-active {
    transition: all 0.6s ease-out 0.3s;
}

.slide-left-enter-from {
    opacity: 0;
    transform: translateX(-50px);
}

/* 右侧图表区域动画 */
.slide-right-enter-active {
    transition: all 0.6s ease-out 0.5s;
}

.slide-right-enter-from {
    opacity: 0;
    transform: translateX(50px);
}

/* 表单区域动画 */
.form-slide-enter-active {
    transition: all 0.5s ease-out;
}

.form-slide-enter-from {
    transform: translateY(20px);
}

/* 标题淡入动画 */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* 表单居中状态的额外样式 */
.form-centered {
    transition: all 0.5s ease-out;
}
</style>
