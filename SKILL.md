---
name: aio-terminal-demo
description: AIO 终端高保真 DEMO 构建技能。核心原则：基座优先（Base-First）、离线健壮（Anti-Black Screen）、自动化初始化（Auto-Init）。
---

# AIO Terminal Demo Skill

## 0. 交互反问逻辑 (Interrogation Logic)

当用户输入的指令模糊、缺失关键信息（如平台或具体页面）或难以直接执行时，**禁止盲目猜测**。必须主动发起反问，引导用户补齐需求。

**建议反问话术：**
> “我可以帮你完成 Windows 或 Mac 端的 AIO 客户端 Demo，涵盖从登录页、客户端主面板、托盘弹窗、沙箱环境（办公空间）、到注销登录等完整交互流程。请告诉我您想在哪个系统平台（Windows/Mac）实现什么样的用户旅程？”

## 1. 核心工作模式：基座优先 (Base-First)

当接收到构建 Demo 的请求时，必须遵循以下优先级：

1. **识别场景**：判断是构建“桌面壳子”、“客户端窗口”还是“特定业务页面”。
2. **查找基座**：优先在 `reference/codes/` 目录下查找对应的 `*-base.jsx` 文件。
3. **1:1 还原**：将查找到的基座代码作为**唯一事实来源**进行复刻。仅修改其中的 **Data (数据)** 和 **Assets (路径)**，严禁自创 UI 结构或路由逻辑。
4. **发挥原则**：仅当完全不存在对应基座时，才基于项目现有风格（如 `client-panel-base.jsx`）进行逻辑补全。

### 核心基座索引
- `mac-desktop-base.jsx`: macOS 桌面环境（Menubar, Dock, 蓝色文件夹）。
- `client-panel-base.jsx`: 客户端主面板（登录、首页、工作台、设置、侧滑详情、窗口控制）。
- `online-notification-base.jsx`: 登录成功通知。
- `tray-popup-base.jsx`: 托盘/通知中心弹窗。
- `workspace-viewer-base.jsx`: 办公空间面板与 WPS 高保真编辑器。

## 1.5. 新项目自动化初始化 (Auto-Init)

当用户要求“新建一个 Demo”或“开始一个新旅程”时，AI 必须自动执行以下操作，无需用户手动干预：

1. **创建目录结构**：在 `Demos/` 目录下创建以需求命名的文件夹（如 `atrust-new-journey`）。
2. **同步库文件 (Sync Libs)**：自动将 `aio-terminal-demo/libs/` 目录下的所有文件（React, Babel, Tailwind）复制到新 Demo 的 `libs/` 文件夹中。
3. **注入基础代码**：根据平台（Mac/Win）自动选择基座并生成 `index.html`。
4. **资源引用**：统一使用相对路径 `../../aio-terminal-demo/assets/icons/` 引用图标资源。

**用户体验目标：用户只需输入需求描述，AI 负责从 0 到 1 构建出可直接运行的完整文件夹环境。**

## 2. 离线健壮性标准 (Anti-Black Screen)

为了彻底杜绝 Demo 在无网络环境下出现“黑屏”或“图标失效”，必须遵守以下铁律：

- **禁止外部依赖**：严禁使用 `lucide-react` 或任何 CDN 图标库。所有图标必须使用 **纯内联 SVG**（已集成在基座代码中）。
- **资源本地化**：所有 `<img>` 标签的 `src` 必须指向 `../../aio-terminal-demo/assets/icons/` 下的本地物理文件。
- **变量完整性（防止 JS 崩溃）**：
  - **ReferenceError 预防**：在修改 UI 逻辑（如新增 Workspace 分类、Favorite 状态）时，必须**第一时间**在组件顶部（`useState` 区域）声明对应的状态变量。使用未定义的变量（如 `activeCategory`）会导致 React 渲染树崩溃，表现为整个窗口黑屏。
  - **逻辑自检**：输出代码前，必须检查 JSX 中引用的所有 `state`、`props`、`helper functions` 是否已在代码块中完整定义。
- **全闭环运行**：Demo 必须包含本地 `./libs/` 目录。AI 在创建项目时应从 `aio-terminal-demo/libs/` 自动同步。禁止在生成代码中出现外部 CDN 链接。

## 3. 平台规范区分

- **macOS**:
  - **禁止**在桌面上放置应用快捷方式（应在 Dock 栏）。
  - **文件夹**必须是蓝色矩形风格（使用 `SvgFolder` 组件）。
  - 图标排列从右上角开始。
- **Windows**:
  - 任务栏在底部，包含开始菜单和托盘。
  - 文件夹为黄色风格。
  - 窗口控制按钮在右上角（最小化、最大化、关闭）。

## 4. 开发流程
1. **理解意图** -> 2. **匹配基座** -> 3. **核对资产** -> 4. **1:1 复刻** -> 5. **本地验证**。

---
*注：本文件已根据 ATrust 项目实践完成瘦身，去除了冗余的理论描述，强化了代码基座的强制复用要求。*
