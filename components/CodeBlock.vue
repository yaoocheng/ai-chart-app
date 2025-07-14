<template>
    <div class="relative group rounded-lg  h-[calc(100%-24px)]">
        <transition name="bounce-drop" mode="out-in">
            <div v-if="!isEditCode" key="view" class="overflow-auto bg-f7 box-border px-4 h-full">
                <n-code :code="code" :hljs="hljs" language="javascript" class="px-4 py-3 text-sm" />
            </div>

            <div v-else key="edit" class="w-full h-full box-border">
                <MonacoEditor
                    v-model="editorValue" lang="javascript" :options="editorOptions"
                    class="w-full h-full rounded-lg" />
            </div>
        </transition>

        <n-tooltip trigger="hover">
            <template #trigger>
                <n-icon
                    :color="isEditCode ? '#3c3c3c' : '#3c3c3c'" size="24"
                    class="cursor-pointer absolute right-8 -top-10 transition-all hover:scale-110"
                    @click="isEditCode = !isEditCode">
                    <SwapVertical />
                </n-icon>
            </template>
            {{ !isEditCode ? '切换到编辑配置' : '切换到查看配置' }}
        </n-tooltip>

        <n-tooltip trigger="hover">
            <template #trigger>
                <n-icon
                    :color="isEditCode ? '#3c3c3c' : '#3c3c3c'" size="24"
                    class="cursor-pointer absolute right-0 -top-10 transition-all hover:scale-110" @click="copyCode">
                    <Copy />
                </n-icon>
            </template>
            复制配置代码
        </n-tooltip>
    </div>
</template>

<script setup>
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import { Copy, SwapVertical } from '@vicons/ionicons5'
import { useMessage } from 'naive-ui'
import { ref, watch } from 'vue'

// 防抖函数
function debounce(func, delay) {
    let timeoutId
    return function (...args) {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => func.apply(this, args), delay)
    }
}

const message = useMessage();
const isEditCode = ref(false);

hljs.registerLanguage('javascript', javascript)

const emit = defineEmits(['editHandle'])

const props = defineProps({
    code: {
        type: String,
        required: true
    },
    editcode: {
        type: String,
        required: true
    }
})

const copyCode = async () => {
    await navigator.clipboard.writeText(props.code);
    message.success('复制成功')
}

// Monaco Editor 配置
const editorValue = ref(`const createOption = () => (${props.editcode})`)
const editorOptions = {
    theme: 'vs',
    // minimap: { enabled: false },
    scrollBeyondLastLine: false,
    fontSize: 14,
    lineNumbers: 'on',
    roundedSelection: false,
    automaticLayout: true,
    scrollbar: {
        vertical: 'auto',
        horizontal: 'auto'
    }
}

// 监听编辑模式切换，同步编辑器内容
// watch(isEditCode, (newVal) => {
//     if (newVal && !editorValue.value) {
//         // 只在编辑器为空时设置初始值，保持用户的编辑状态
//         editorValue.value = `const createOption = () => (${props.editcode})`;
//     }
// })
// 监听props变化，更新编辑器内容
watch(() => props.editcode, (newVal) => {
    console.log(newVal, '监听变化');
    editorValue.value = `const createOption = () => (${newVal})`
}, {
    immediate: true
})

// 创建防抖版本的emit函数
const debouncedEmit = debounce((value) => {
    emit('editHandle', value)
}, 1000)

// 监听编辑器内容变化
watch(editorValue, (newVal) => {
    debouncedEmit(newVal);
})
</script>

<style scoped>
/* 球体回弹动画效果 */
.bounce-drop-enter-active {
    animation: bounceDropIn 1.2s ease-out;
}

.bounce-drop-leave-active {
    animation: bounceDropOut 0.3s ease-in;
}

@keyframes bounceDropIn {
    0% {
        opacity: 0;
        transform: translateY(-200px);
    }

    15% {
        opacity: 1;
        transform: translateY(0);
    }

    25% {
        transform: translateY(-30px);
    }

    35% {
        transform: translateY(0);
    }

    45% {
        transform: translateY(-15px);
    }

    55% {
        transform: translateY(0);
    }

    65% {
        transform: translateY(-8px);
    }

    75% {
        transform: translateY(0);
    }

    85% {
        transform: translateY(-3px);
    }

    95% {
        transform: translateY(0);
    }

    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes bounceDropOut {
    0% {
        opacity: 1;
        transform: translateY(0) scale(1);
    }

    100% {
        opacity: 0;
        transform: translateY(-20px) scale(0.9);
    }
}
</style>
