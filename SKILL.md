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

## 2. 离线健壮性与代码正确性标准 (Anti-Black Screen)

为了彻底杜绝 Demo 黑屏、图标失效或交互异常，必须遵守以下铁律：

### 2.1 资源离线化
- **禁止外部依赖**：严禁使用 `lucide-react` 或任何 CDN 图标库。所有图标必须使用**纯内联 SVG**（已集成在基座代码中）。
- **资源本地化**：所有 `<img>` 的 `src` 必须指向 `../../aio-terminal-demo/assets/icons/` 下的本地物理文件。
- **全闭环运行**：Demo 必须包含本地 `./libs/` 目录。AI 创建项目时应从 `aio-terminal-demo/libs/` 自动同步，禁止生成代码中出现外部 CDN 链接。

### 2.2 React 代码结构铁律（防止整页黑屏）

> ⚠️ 本节为根据真实黑屏事故新增的核心约束，违反其中任意一条都会导致页面完全黑屏。

**【铁律 1】`ReactDOM.createRoot().render()` 必须在所有组件函数定义的外部**

正确写法：render 在所有组件之外，脚本最后一行：
```
function App() { ... }
function SubComp() { ... }
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);  // ← 脚本最后一行，绝不嵌套在任何函数内
```
致命错误：render 被嵌套在组件内，return 之后永远不执行 → 黑屏：
```
function App() {
  return ( ... );
  const root = ReactDOM.createRoot(...); // 死代码，永远不执行
  root.render(<App />);
}
```

**【铁律 2】跨组件使用的 state 必须提升至最近公共祖先（状态提升）**

跨多个组件共享的变量（如 `username`、`loggedIn`）必须在共同父组件中定义，通过 `props` 向下传递。禁止在子组件内定义状态却在父组件中直接引用——会产生 `ReferenceError` 导致渲染树崩溃黑屏：
```
// ✅ 正确：username 在父组件定义，props 向下传递
function Shell() {
  const [username, setUsername] = useState('张三');
  return <ClientPanel username={username} setUsername={setUsername} />;
}

// ❌ 错误：username 定义在子组件，父组件却直接引用 → 崩溃黑屏
function ClientPanel() { const [username] = useState('张三'); }
function Shell() { return <Notification userName={username} />; }
```

**【铁律 3】输出代码前必须执行作用域三连自检**

生成代码、写入文件前，对照以下清单心算验证：
- `ReactDOM.render()` 是否在所有组件定义**之外**？
- JSX 中引用的每个变量，是否在**同一作用域**内已有声明？
- 跨组件共享的状态，是否已提升到**最近公共祖先**？

### 2.3 效率约束（防止任务超时）
- **单次生成，一次到位**：AI 必须在充分理解需求后，一次性生成完整正确的 `index.html`，禁止「先写草稿→截图验证→再修改」的迭代模式。Babel 浏览器端编译大型 JSX 需要数秒，多轮 browser_subagent 截图会将任务放大至 10–20 分钟。
- **验证仅在最终产物上执行一次**：browser_subagent 截图确认只在文件完全写完后执行一次，不得在写码过程中反复截图。
- **整体一次写入**：`index.html` 必须通过 `write_to_file` 整体写入，禁止多次 `replace_file_content` 拼凑——分段拼凑是本次黑屏事故的直接诱因之一。

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
