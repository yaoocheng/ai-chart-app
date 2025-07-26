<template>
    <client-only>
        <div v-bind="containerProps" class="virtual-list-container relative">
            <div v-bind="wrapperProps">
                <div
                    v-for="{ data, index } in list"
                    :key="index"
                    class="list-item"
                    @click="onCodeClick(index+1)"
                >
                    <span class="line-number">{{ data.index + 1 }}</span>
                    <pre><code class="language-javascript" v-html="highlightCodeWithFragments(data.content, data.index+1)" /></pre>
                </div>
            </div>
        </div>
        <div class="scroll-controls">
            <button @click="scrollToLine(1000)">滚动到第 1000 行</button>
            <button @click="scrollToLine(2500)">滚动到第 2500 行</button>
            <button @click="scrollToLine(4900)">滚动到第 4900 行</button>
        </div>
    </client-only>
</template>

<script setup>
import { computed } from 'vue';
import { useVirtualList } from '@vueuse/core';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

const totalItems = 5000;
const itemHeight = 20; // 每行高度

// 真实的代码示例数据
const realCodeExamples = [
    "// Vue 3 Composition API 示例",
    "import { ref, computed, onMounted } from 'vue';",
    "import { useRouter } from 'vue-router';",
    "",
    "// 响应式数据",
    "const count = ref(0);",
    "const message = ref('Hello World');",
    "",
    "// 计算属性",
    "const doubleCount = computed(() => count.value * 2);",
    "",
    "// 方法定义",
    "const increment = () => {",
    "  count.value++;",
    "  console.log('Count incremented:', count.value);",
    "};",
    "",
    "// 异步函数",
    "const fetchData = async () => {",
    "  try {",
    "    const response = await fetch('/api/data');",
    "    const data = await response.json();",
    "    return data;",
    "  } catch (error) {",
    "    console.error('Error fetching data:', error);",
    "    throw error;",
    "  }",
    "};",
    "",
    "// 生命周期钩子",
    "onMounted(() => {",
    "  console.log('Component mounted');",
    "  fetchData();",
    "});",
    "",
    "// ES6 类定义",
    "class UserService {",
    "  constructor(apiUrl) {",
    "    this.apiUrl = apiUrl;",
    "    this.users = [];",
    "  }",
    "",
    "  async getUsers() {",
    "    const response = await fetch(`${this.apiUrl}/users`);",
    "    this.users = await response.json();",
    "    return this.users;",
    "  }",
    "",
    "  findUserById(id) {",
    "    return this.users.find(user => user.id === id);",
    "  }",
    "}",
    "",
    "// 数组操作",
    "const numbers = [1, 2, 3, 4, 5];",
    "const doubled = numbers.map(n => n * 2);",
    "const filtered = numbers.filter(n => n > 2);",
    "const sum = numbers.reduce((acc, n) => acc + n, 0);",
    "",
    "// 对象解构",
    "const user = { name: 'John', age: 30, city: 'New York' };",
    "const { name, age, ...rest } = user;",
    "",
    "// Promise 链式调用",
    "fetch('/api/users')",
    "  .then(response => response.json())",
    "  .then(users => {",
    "    console.log('Users loaded:', users.length);",
    "    return users.filter(user => user.active);",
    "  })",
    "  .then(activeUsers => {",
    "    console.log('Active users:', activeUsers);",
    "  })",
    "  .catch(error => {",
    "    console.error('Error:', error);",
    "  });",
    "",
    "// 模板字符串",
    "const greeting = `Hello, ${name}! You are ${age} years old.`;",
    "",
    "// 箭头函数",
    "const multiply = (a, b) => a * b;",
    "const square = x => x * x;",
    "",
    "// 条件渲染",
    "const renderUser = (user) => {",
    "  if (!user) {",
    "    return '<div>No user found</div>';",
    "  }",
    "  ",
    "  return `",
    "    <div class=\"user-card\">",
    "      <h3>${user.name}</h3>",
    "      <p>Age: ${user.age}</p>",
    "      <p>Email: ${user.email}</p>",
    "    </div>",
    "  `;",
    "};",
    "",
    "// 事件处理",
    "const handleClick = (event) => {",
    "  event.preventDefault();",
    "  console.log('Button clicked');",
    "};",
    "",
    "// 正则表达式",
    "const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;",
    "const isValidEmail = (email) => emailRegex.test(email);",
    "",
    "// 模块导出",
    "export { UserService, fetchData, increment };",
    "export default { count, message, doubleCount };"
];

// 生成足够的代码行数据
const allCodeLines = computed(() => {
    const lines = [];
    for (let i = 0; i < totalItems; i++) {
        const codeIndex = i % realCodeExamples.length;
        lines.push({
            index: i,
            content: realCodeExamples[codeIndex]
        });
    }
    return lines;
});

// 使用 useVirtualList
const { list,containerProps, wrapperProps  } = useVirtualList(allCodeLines, {
    itemHeight: itemHeight,       // 指定每行高度
    overscan: 50,                 // 预渲染的行数
});

// **新增：滚动定位函数**
const scrollToLine = (lineNumber) => {
    // 确保行号在有效范围内 (1 到 totalItems)
    const targetLine = Math.max(1, Math.min(lineNumber, totalItems));
    // 计算目标滚动位置 (行号 - 1) * 每行高度
    const targetScrollTop = (targetLine - 1) * itemHeight;

    // 获取滚动容器的 DOM 元素
    const containerElement = containerProps.ref.value;

    if (containerElement) {
        // 设置 scrollTop，实现滚动
        containerElement.scrollTop = targetScrollTop;
    }
};


// 代码高亮函数
const highlightCode = (code) => {
    try {
        return hljs.highlight(code, { language: 'javascript' }).value;
    } catch {
        return hljs.highlightAuto(code).value;
    }
};


// **新增：高亮结果缓存 Map**
const highlightCache = new Map();

// 带片段高亮的代码高亮函数
const highlightCodeWithFragments = (code, lineIndex) => {
    if (highlightCache.has(lineIndex)) {
        return highlightCache.get(lineIndex);
    }

    let highlightedCode = highlightCode(code);
    
    // 查找当前行是否在任何高亮片段范围内
    const fragment = highlightFragment.find(fragment => 
        lineIndex >= fragment.startLine && lineIndex <= fragment.endLine
    );
    
    // 如果当前行在高亮片段范围内，整行高亮
    if (fragment) {
        highlightedCode = `<span class="code-fragment" data-fragment-id="${fragment.id}" style="background-color: ${fragment.color}; cursor: pointer; display: block; width: 100%; height: 20px;">${highlightedCode}</span>`;
    }

    highlightCache.set(lineIndex, highlightedCode);
    
    return highlightedCode;
};

// 处理片段点击事件
const handleFragmentClick = (fragmentId) => {
    console.log('点击了代码片段:', fragmentId);
    const fragment = highlightFragment.find(f => f.id === fragmentId);
    if (fragment) {
        alert(`点击了片段 ${fragmentId}，位置: 第${fragment.startLine}行 - 第${fragment.endLine}行`);
    }
};

// 处理代码区域点击事件
const onCodeClick = (curLine) => {
    const curFragment = highlightFragment.find(item => item.startLine <= curLine && item.endLine >= curLine)
    if (curFragment) {
        handleFragmentClick(curFragment.id)
    }
};

const highlightFragment = Array.from({ length: 100 }, (_, index) => {
    const startLine = Math.floor(Math.random() * (totalItems - 10));
    const endLine = startLine + Math.floor(Math.random() * 8) + 2; // 每个片段2-10行
    return {
        startLine: startLine,
        endLine: Math.min(endLine, totalItems - 1),
        id: index,
        color: '#ADD8E6' // 浅蓝色
    }
})
</script>

<style scoped>
.virtual-list-container {
  height: 500px; /* 容器高度 */
  overflow-y: auto;
  border: 1px solid #ccc;
  font-family: 'Fira Code', monospace;
  font-size: 14px;
  line-height: 1.5;
  /* background-color: #282c34; */
  color: #abb2bf;
}

.list-item {
  width: 100%;
  box-sizing: border-box;
  padding-left: 10px;
  height: 20px;
  display: flex;
  align-items: flex-start;
}

.line-number {
  display: inline-block;
  width: 40px;
  text-align: right;
  margin-right: 10px;
  color: #666;
  font-size: 12px;
  user-select: none;
  flex-shrink: 0;
}

.list-item pre {
  margin: 0;
  padding: 0;
  flex: 1;
  /* overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-all; */
}

.code-fragment {
  border-radius: 2px;
  padding: 2px 4px;
  transition: background-color 0.2s ease;
  margin: -2px -4px;
}

.code-fragment:hover {
  opacity: 0.8;
}
</style>