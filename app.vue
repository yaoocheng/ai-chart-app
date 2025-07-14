<template>
    <n-config-provider :theme-overrides="themeOverrides">
        <n-message-provider>
            <div class="h-[100vh] flex flex-col">
                <Header />
                <main class="flex-1 h-0">
                    <NuxtPage />
                </main>
            </div>
        </n-message-provider>
    </n-config-provider>
</template>

<script setup lang="ts">
const themeOverrides = {
    common: {
        primaryColor: "#141414",              // 主色：深黑
        primaryColorHover: "#1f1f1f",         // Hover：略浅一点的黑
        primaryColorPressed: "#000000",       // Pressed：更深一点，接近纯黑
        primaryColorSuppl: "#2b2b2b",         // 辅助黑，用于对比

        // borderColor: "#333333",               // 边框色：深灰边框，不突兀
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.45)",  // 阴影效果：深色柔和阴影
    }
}
</script>
