<template>
    <header class="bg-white border-b border-solid border-gray-100 box-border px-6 h-14 flex items-center justify-between">
        <!-- 左侧 Logo 和名称 -->
        <div class="flex items-center gap-1">
            <img class="w-6 h-6" src="../assets/img/logo.gif" alt="">
            <h1 class="text-xl font-semibold text-3c">Daxa</h1>
            <!-- <span class="text-sm text-gray-500"> - AI 驱动的智能图表工具</span> -->
        </div>

        <!-- 右侧用户头像 -->
        <!-- <div class="flex items-center space-x-4">
            <n-tooltip trigger="hover">
                <template #trigger>
                    <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow">
                        <span class="text-white font-medium text-sm">用户</span>
                    </div>
                </template>
用户中心
</n-tooltip>
</div> -->
    </header>
</template>

<script setup>
// AppHeader 组件逻辑
defineOptions({
    name: 'AppHeader'
})
</script>

<style scoped>
/* AppHeader 组件样式 */
</style>