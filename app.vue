<template>
    <n-message-provider>
        <n-config-provider>
            <div class="h-[100vh] flex flex-col">
                <Header />
                <main class="flex-1 h-0">
                    <NuxtPage />
                </main>
            </div>
        </n-config-provider>
    </n-message-provider>
</template>
