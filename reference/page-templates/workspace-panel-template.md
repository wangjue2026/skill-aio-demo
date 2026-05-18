---
title: AIO Terminal Workspace Panel Template
category: page-template
platform: desktop-client
component_name: WorkspacePanel
base_code_path: aio-terminal-demo/reference/codes/workspace-viewer-base.jsx
format_version: 1
---

# AIO Terminal Workspace Panel Template

本文件用于描述 `WorkspacePanel`（办公空间）及其配套的 `WordViewer`（文档查看器）页面模板规范，旨在作为 1:1 还原的视觉与逻辑标准。

## 1. Workspace Panel (侧边办公空间)

### 1.1 触发器 (Trigger Tab)
- **位置**: 屏幕右边缘垂直居中。
- **尺寸**: 高度 `100px`，静默宽度 `10px`，悬浮宽度 `39px`。
- **视觉**: 
  - 左侧 9px 渐变条: `linear-gradient(180deg, #FFC896 0%, #FA721B 100%)`。
  - 右侧文字区: `rgba(247, 249, 252, 0.7)`，文字“工作空间”垂直排列。

### 1.2 面板容器 (Panel Container)
- **尺寸**: 宽度 `356px`，高度 `620px`。
- **定位**: 距离右边缘 `46px` (悬浮触发后显示)。
- **背景**: 毛玻璃效果 (`rgba(255, 255, 255, 0.75)`, `blur(30px)`)。
- **圆角**: `6px`。
- **投影**: `0 4px 24px rgba(0, 0, 0, 0.15)`。

### 1.3 布局内容
- **Header**: 包含标题“办公空间” (15px, Bold) 及窗口控制按钮（列表、最小化、关闭）。
- **应用网格 (App Grid)**: 
  - 4 列布局。
  - 图标容器: `48x48px`，圆角 `6px`，悬浮背景 `white/40`。
  - 图标尺寸: `40x40px`。
  - 文字: `11px`，居中对齐。
- **文件列表 (File List)**:
  - 项高度: 约 `36px`。
  - 图标: `16x16px` (带有蓝条装饰的 W 标识)。
  - 文本: `13px`, 颜色 `#2F3540`。

---

## 2. Word Viewer (文档查看器 - WPS 风格)

### 2.1 窗口模式
- **浮窗模式**: 距离四周边缘约 `8% - 12%`，圆角 `8px`，阴影强烈 (`0 20px 60px rgba(0,0,0,0.3)`)。
- **全屏模式**: 占据整个视口。

### 2.2 视觉分区
- **顶部装饰条**: 高度 `8px`，渐变色 `#FFC896` -> `#FA721B`。
- **页签栏 (Header)**: 高度 `40px`，白色背景。
  - 文档页签: 高度 `34px`，宽度最大 `240px`，左侧有蓝色 W 图标。
- **工具栏 (Toolbar)**: 高度 `36px`，背景色 `#F5F6F7`。
  - 菜单项: 文件、开始（选中态）、插入、页面、引用等。
- **可视区 (Editor Area)**: 
  - 背景色: `#E1E4E8`。
  - **A4 纸张**: 尺寸 `794px x 1123px`，白色背景，带有裁剪标记和 A4 纸张投影。

---

## 3. Asset Configuration

| Key | Usage | Local Path |
| :--- | :--- | :--- |
| `ws-panel-icon` | 面板标题图标 | `../../assets/icons/ws-panel-title.png` |
| `wps-logo` | WPS 应用 Logo | `../../assets/icons/icon-wps.png` |
| `app-file-mgr` | 文件管理器图标 | `../../assets/icons/icon-file-mgr.png` |
| `app-trash` | 回收站图标 | `../../assets/icons/icon-trash.png` |
| `app-chrome` | Chrome 浏览器图标 | `../../assets/icons/icon-chrome.png` |
| `app-excel` | Excel 图标 | `../../assets/icons/icon-excel.png` |

## 4. Interaction Logic

- **最大化切换**: 点击 `WordViewer` 右上角的方块图标可切换全屏/窗口模式。
- **文件拉起**: 点击办公空间面板中的文件项，应直接覆盖弹出 `WordViewer` 组件。
- **入场动画**: 面板入场采用 `fade-in` + `slide-in-from-right` 组合。

---
*Generated based on Workspace React reference for AIO Terminal Project.*
