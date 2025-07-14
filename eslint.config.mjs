// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
    // Vue essential rules are already included in Nuxt's default config
    // Airbnb rules are partially covered by Nuxt's built-in rules
    {
        rules: {
            'linebreak-style': ['off', 'windows'],
            'import/extensions': 'off',
            'import/no-absolute-path': 'off',
            'import/no-extraneous-dependencies': 'off',
            'import/no-unresolved': 'off',
            'vue/no-multiple-template-root': 'off',
            'max-len': 'off',
            'consistent-return': 'off',
            'vue/no-v-model-argument': 'off',
            'no-plusplus': 'off',
            'no-param-reassign': 'off',
            'vue/no-use-v-if-with-v-for': 'off',
            'vue/multi-word-component-names': 'off',
            'vue/no-v-for-template-key': 'off',
            'camelcase': 'off',
            'indent': ['error', 4, { SwitchCase: 1 }], // 缩进
            'no-console': 'off', // 关闭 console 语句检查
            'vue/html-indent': ['error', 4], // Vue模板缩进
            'vue/script-indent': ['error', 4, { baseIndent: 0, switchCase: 1 }], // Vue脚本缩进
        },
    })
