import barChart from '@/assets/img/chart-exp/bar.webp'
import lineChart from '@/assets/img/chart-exp/line.webp'
import pieChart from '@/assets/img/chart-exp/pie.webp'
import radarChart from '@/assets/img/chart-exp/radar.webp'
import scatterChart from '@/assets/img/chart-exp/scatter.webp'
import funnelChart from '@/assets/img/chart-exp/funnel.webp'
import gaugeChart from '@/assets/img/chart-exp/gauge.webp'
import candlestickChart from '@/assets/img/chart-exp/candlestick.webp'
import heatmapChart from '@/assets/img/chart-exp/heatmap.webp'
import graphChart from '@/assets/img/chart-exp/graph.webp'
import treeChart from '@/assets/img/chart-exp/tree.webp'
import sunburstChart from '@/assets/img/chart-exp/sunburst.webp'
import sankeyChart from '@/assets/img/chart-exp/sankey.webp'
import aggregateChart from '@/assets/img/chart-exp/aggregate.webp'

export const CHART_TYPE_MAP = {
    bar: barChart,
    line: lineChart,
    pie: pieChart,
    radar: radarChart,
    scatter: scatterChart,
    funnel: funnelChart,
    gauge: gaugeChart,
    candlestick: candlestickChart,
    heatmap: heatmapChart,
    graph: graphChart,
    tree: treeChart,
    sunburst: sunburstChart,
    sankey: sankeyChart,
    aggregate: aggregateChart,
}
 
export const WELCOME_MESSAGES = [
  "今天想生成什么样的图表呢？🤔",
  "告诉我你的数据需求，图表我来搞定！📊",
  "灵感来了？试试用 AI 自动生成图表吧 🚀",
  "需要可视化你的想法？从一句话开始吧 ✨",
  "写一句描述，我来帮你绘制图表 🎨",
  "输入你的需求，秒生成图表！⏱️",
  "别怕图表配置太难，这里一句话就够！🧠",
  "不确定用什么图？我来给你推荐 🧭",
  "让我们一起把数据变得更生动 📊",
  "只要你说得清，我就能画得漂亮 💬➡️📊",
  "描述你的场景，我来生成最合适的图 💡"
]


export const CHART_TYPE_OPTIONS = [
    { label: '柱状图', value: 'bar', description: '对比不同类别的数据，适合展示分类数量', preview: CHART_TYPE_MAP.bar },
    { label: '折线图', value: 'line', description: '显示数据随时间或顺序的趋势变化', preview: CHART_TYPE_MAP.line },
    { label: '饼图', value: 'pie', description: '展示各部分在整体中所占的比例', preview: CHART_TYPE_MAP.pie },
    { label: '雷达图', value: 'radar', description: '多维数据对比，适合综合评分等场景', preview: CHART_TYPE_MAP.radar },
    { label: '散点图', value: 'scatter', description: '展示两个变量之间的分布与关系', preview: CHART_TYPE_MAP.scatter },
    { label: '盒须图', value: 'aggregate', description: '分析数据分布、中位数与异常值', preview: CHART_TYPE_MAP.aggregate },
    { label: '漏斗图', value: 'funnel', description: '展示流程中各阶段的转化或流失', preview: CHART_TYPE_MAP.funnel },
    { label: '仪表盘', value: 'gauge', description: '显示单个指标的实时状态或进度', preview: CHART_TYPE_MAP.gauge },
    { label: 'K线图', value: 'candlestick', description: '用于展示股票等金融数据的走势', preview: CHART_TYPE_MAP.candlestick },
    { label: '热力图', value: 'heatmap', description: '通过颜色深浅表示数据强度或密度', preview: CHART_TYPE_MAP.heatmap },
    { label: '关系图', value: 'graph', description: '展示节点之间的连接关系，如社交网络', preview: CHART_TYPE_MAP.graph },
    { label: '树图', value: 'tree', description: '以树状结构展示分层数据，如组织结构', preview: CHART_TYPE_MAP.tree },
    { label: '旭日图', value: 'sunburst', description: '层级饼图，展示嵌套结构的占比关系', preview: CHART_TYPE_MAP.sunburst },
    { label: '桑基图', value: 'sankey', description: '展示数据流向与占比，线越宽表示值越大', preview: CHART_TYPE_MAP.sankey },
]