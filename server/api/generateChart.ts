import OpenAI from "openai"

export default defineEventHandler(async (event) => {

    const body = await readBody(event)
    const prompt = body.prompt;
    const chartLib = body.chartLib;
    const chartType = body.chartType;
    const aiCodeStr = body.aiCodeStr;

    const config = useRuntimeConfig();

    const openai = new OpenAI({
        apiKey: config.dashscopeApiKey,
        baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1"
    })

    const completion = await openai.chat.completions.create({
        model: "qwen-coder-plus",
        messages: [
            {
      role: "system",
      content: `
你是一个前端图表配置生成器，请严格根据用户需求，若已有图表配置，则在已有图表配置上进行最小必要改动，生成新的图表的配置 option。

# 要求：
- 图表库：${chartLib}
- 图表类型：${chartType}
${aiCodeStr ? '- 这是之前的图表配置：' + aiCodeStr + '，在已有配置的基础上继续修改' : ''}
- 严禁随意更换图表数据或结构。
- 仅根据用户新描述做必要调整。

# 输出格式（一个合法的 JavaScript 对象（不是 JSON）。允许包含函数，比如 symbolSize、formatter 等）：

🚫 严禁输出任何解释、注释、说明、Markdown代码块或格式化提示！

✅ 只输出纯 JS 对象，形如：

{ ...完整图表配置... }

      `.trim()
    },
            {
                role: "user",
                content: `用户需求：${prompt}`
            }
        ],
        temperature: 0.3
    })
    
    const result = completion.choices?.[0]?.message?.content ?? '{}'
    
    return result;
})
