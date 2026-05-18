---
title: AIO Terminal Client Tray Template
category: page-template
platform: desktop-client
component_name: ClientTray
format_version: 1
---

# AIO Terminal Client Tray Template

本文件用于描述 `ClientTray` 客户端托盘菜单页面模板，内容从给定 React 代码中提炼，旨在作为 1:1 还原的视觉与逻辑标准。

## 1. Overall Summary

- **组件类型**：`桌面客户端系统托盘菜单`
- **主要框架**：`React + Tailwind CSS`
- **基础尺寸**：宽度 `200px`，基础高度 `224px`（高度随场景 3 动态自适应）
- **视觉风格**：`简约现代`、`直角微圆 (2px)`、`通透投影`
- **核心交互**：
  - 登录/未登录状态切换
  - 业务场景动态菜单（场景 1/2/3）
  - 二级菜单悬浮展开（支持左右自适应避让）
  - 分割线逻辑

## 2. Core State Model

### 2.1 UI States
- `isLoggedIn`: **boolean** - 控制用户头部样式及“办公访问”子菜单权限。
- `scenario`: **number (1 | 2 | 3)** - 业务场景控制：
  - `1`: 仅零信任。
  - `2`: 零信任 + 空间。
  - `3`: 安全 + 零信任 + 空间（增加“安全”菜单项）。
- `activeMenuId`: **string | null** - 当前悬浮触发二级菜单的菜单项 ID。
- `subMenuPos`: **'left' | 'right'** - 二级菜单展开方向，默认为 `right`。

## 3. Component Structure

```text
ClientTray Container
├── 1. User Header (64px)
│   ├── Avatar (36x36)
│   └── User Info (Name + Status Tag)
├── 2. Menu List (py-1)
│   ├── Menu Item (Icon + Label + [SubIndicator/Action])
│   ├── Divider (1px)
│   └── ...
└── 3. Floating Sub-menu (Conditional)
    └── Sub-menu Items
```

## 4. Visual Design Specifications

### 4.1 Container
- **宽度**: `200px`
- **最小高度**: `224px`
- **圆角**: `2px`
- **背景**: `#FFFFFF`
- **边框**: `1px solid #E1E5EB`
- **阴影**: `0px 4px 16px 0px rgba(30, 35, 43, 0.14)`

### 4.2 User Header
- **高度**: `64px`
- **内边距**: `0 12px`
- **背景图**: 
  - 已登录: `ASSETS.bgLoggedIn` (蓝色渐变意向)
  - 未登录: `ASSETS.bgLoggedOut` (灰色渐变意向)
- **头像**: `36x36px`, `rounded-full`, `bg-white`, `shadow-sm`
- **姓名**: `14px`, `font-medium`, `text-gray-900`
- **状态标签**: `10px`, `font-medium`, `px-1`, `py-0.5`, `rounded-[2px]`
  - 已连接: `bg-[#e5edff]`, `text-[#3366ff]`
  - 未连接: `bg-[#f0f1f3]`, `text-[#86909c]`

### 4.3 Menu Item
- **容器**: `px-[12px]`, `py-[6px]`, `hover:bg-[#f2f3f5]`, `cursor-pointer`
- **图标**: `16x16px`, `opacity-80`, `object-contain`
- **文本**: `12px`, `text-gray-700`, `whitespace-nowrap`
- **右侧元素**:
  - 子菜单标识: `ChevronRight` 图标 (14x14, stroke-width 1.5, `text-gray-400`)
  - 未登录登录入口: `12px`, `text-[#3366ff]`, `hover:underline`

### 4.4 Divider
- **高度**: `1px`
- **背景色**: `#E1E5EB`
- **边距**: `my-1`, `mx-3 (12px)`

### 4.5 Sub-menu (Secondary)
- **宽度**: `144px` (w-36)
- **样式**: 同主容器（白底、微圆角、投影、边框）
- **位置**: `top-0`, 距离触发项 `102%` (left 或 right)
- **子项内边距**: `px-3`, `py-1.5`
- **子项文本**: `12px`, `text-gray-700`, `hover:bg-[#f2f3f5]`

## 5. Interaction Logic

### 5.1 Hover & Sub-menu
- 鼠标移入带有 `hasSub` 的项时，触发 `activeMenuId`。
- **碰撞检测**:
  - 计算触发项相对于视口的 `left` 和 `right`。
  - 若左侧空间不足 `144px + 10px`，强制向右展开。
  - 若右侧空间不足 `144px + 10px`，强制向左展开。
  - 默认向右。

### 5.2 Dynamic Menu Logic (Scenario Based)
- **办公访问**:
  - 场景 1: `['打开工作台', '-', '关闭组件']`
  - 场景 2/3: `['打开工作台', '工作空间', '文件审批中心', '-', '关闭组件']`
  - 未登录: 右侧显示“登录”链接，无子菜单。
- **安全**: 仅在 `scenario === 3` 时显示，位于“办公访问”下方。
- **诊断与日志工具**: 始终存在，带子菜单。
- **关于 / 退出**: 始终存在，无子菜单。

## 6. Asset Configuration

| Key | Usage | Local Path |
| :--- | :--- | :--- |
| `avatarLoggedIn` | 已登录用户头像 | `../../assets/icons/tray-avatar-login.png` |
| `avatarLoggedOut` | 未登录占位头像 | `../../assets/icons/tray-avatar-logout.png` |
| `bgLoggedIn` | 头部已登录背景 | `../../assets/icons/tray-bg-login.png` |
| `bgLoggedOut` | 头部未登录背景 | `../../assets/icons/tray-bg-logout.png` |
| `icon-office` | 办公访问图标 | `../../assets/icons/tray-icon-office.png` |
| `icon-diag` | 诊断修复图标 | `../../assets/icons/tray-icon-diag.png` |
| `icon-security` | 安全中心图标 | `../../assets/icons/tray-icon-security.png` |
| `icon-about` | 关于图标 | `../../assets/icons/tray-icon-about.png` |
| `icon-exit` | 退出图标 | `../../assets/icons/tray-icon-exit.png` |

> [!NOTE]
> 所有资产已完成本地化下载，存放于 `/assets/icons` 目录。

## 7. Implementation Notes

- **字体**: 优先使用 `font-sans` 或系统默认 UI 字体。
- **阴影强度**: 确保阴影色值为 `rgba(30, 35, 43, 0.14)`，以维持通透感。
- **对齐**: 菜单项中的图标与文字需垂直居中对齐，Gap 保持 `8px` (gap-2)。
- **高度控制**: 托盘菜单在场景 3 下因内容较多，高度应设为 `auto` 以防内容截断，但最小高度需锚定在 `224px`。

---
*Generated based on source React demo for AIO Terminal Project.*
