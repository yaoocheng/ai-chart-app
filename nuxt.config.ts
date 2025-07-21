// https://nuxt.com/docs/api/configuration/nuxt-config
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

export default defineNuxtConfig({
    modules: ['@nuxt/eslint', '@nuxtjs/tailwindcss', 'nuxt-monaco-editor', '@vueuse/nuxt'],
    css: ['highlight.js/styles/github.css'],
    runtimeConfig: {
        dashscopeApiKey: process.env.DASHSCOPE_API_KEY,
    },
    app: {
        head: {
            title: 'Daxa',
            meta: [
                { name: 'description', content: 'AI 图表生成器' },
            ],
            link: [
                { rel: 'icon', type: 'image/svg', href: '/logo.svg' },
            ]
        }
    },
    vite: {
        plugins: [
            //   AutoImport({
            //     imports: [
            //       {
            //         'naive-ui': [
            //           'useDialog',
            //           'useMessage',
            //           'useNotification',
            //           'useLoadingBar'
            //         ]
            //       }
            //     ]
            //   }),
            Components({
                resolvers: [NaiveUiResolver()]
            })
        ],
        ssr: {
            noExternal: ['naive-ui', '@css-render/vue3-ssr', '@juggle/resize-observer']
        }
    }
})