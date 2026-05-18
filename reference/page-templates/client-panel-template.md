---
title: ATrust Client Panel Template
category: page-template
platform: desktop-client
component_name: ATrustClient
format_version: 1
---

# ATrust Client Panel Template

> [!IMPORTANT]
> **开发要求**：此页面已有标准底座代码。在生成演示 Demo 时，请务必直接引用并填充以下文件作为框架，严禁删减 UI 元素。
> **代码底座路径**：[client-panel-base.jsx](file:///Users/wj/Desktop/%E9%A1%B9%E7%9B%AE%E6%96%87%E4%BB%B6/AIO%E7%BB%88%E7%AB%AFDEMO/aio-terminal-demo/reference/codes/client-panel-base.jsx)

本文件用于描述 `ATrustClient` 客户端面板页面模板，内容从给定 React 代码中提炼，优先面向 AI 读取、页面复刻与后续组件拆分。

## 1. Overall Summary

- 页面类型：`桌面客户端面板`
- 主要框架：`React`
- 图标来源：`lucide-react` + 远程图片资源
- 视觉风格：`Windows 客户端风格 + 浅色工作台界面`
- 主窗口尺寸：`920 x 570`
- 主窗口容器：白底、圆角、阴影、左右分栏
- 主状态：
  - `未登录态`
  - `已登录态`
- 主路由：
  - `home`
  - `workspace`
  - `settings`
  - `terminal`
  - `profile`
  - `permissions`
  - `store`

## 2. Core State Model

### 2.1 Login / Route

- `isLoggedIn`: 是否已登录
- `isLoggingIn`: 是否处于登录中
- `currentRoute`: 当前页面路由

### 2.2 Popup / Menu

- `showMoreMenu`: 已登录左侧底部更多菜单
- `showLogoutModal`: 注销确认弹窗
- `showDetailDrawer`: 首页网络详情抽屉
- `activeDetailTab`: 详情抽屉标签，值为 `office` / `internet`
- `showLoginMoreMenu`: 登录页底部更多操作栏
- `showWorkspaceMoreMenu`: 工作台页底部更多操作栏

### 2.3 Form State

- `agreeProtocol`: 是否勾选协议

## 3. Window Structure

```text
ATrust Client Window
├── Sidebar
│   ├── 未登录导航
│   └── 已登录导航 + 更多菜单
├── Main Content
│   ├── Login View
│   ├── Home View
│   ├── Workspace View
│   ├── Software Store View
│   ├── Terminal Management View
│   ├── Permissions View
│   ├── Settings View
│   └── Profile View
├── Global Drawer
│   └── Network Detail Drawer
└── Global Modal
    └── Logout Confirmation Modal
```

## 4. Shared Layout Rules

- 整体外层：全屏居中，背景灰色 `#E5E7EB`
- 主窗体：`920x570`，白底，圆角，投影，`overflow-hidden`
- 左侧导航宽度：`64px`
- 主内容区域背景：根据页面切换为白色、浅灰色或带背景图的区域
- 顶部窗口控制按钮：靠右上角绝对定位
- 底部扩展操作栏：用于登录页和工作台页的“更多”入口

## 5. Sidebar Template

### 5.1 Logged Out Sidebar

- 背景色：`#37405B`
- 顶部头像区：未登录头像 + `未登录` 文案
- 菜单项：
  - 首页：激活态
  - 设置：禁用态
- 底部区域：仅占位，无菜单

### 5.2 Logged In Sidebar

- 顶部：用户头像圆形块，右下角在线状态点
- 导航菜单：
  - 首页
  - 工作台
  - 设置
- 底部更多菜单项：
  - 个人信息
  - 申请权限
  - 终端管理
  - 注销登录

## 6. Window Controls Component

- 组件名：`WindowControls`
- 风格：Windows 窗口控制按钮
- 固定包含：
  - 最小化
  - 最大化
  - 关闭
- 可选包含：
  - 切换按钮 `showSwitch=true`
- 使用场景：
  - 登录页：显示切换按钮
  - 登录后页面：显示标准三键

## 7. Login View Template

## 7.1 Layout

- 左右双栏布局
- 左栏宽度：`420px`
- 左栏内容：登录插画 + 温馨提示卡片
- 右栏内容：登录表单

## 7.2 Login Form

- 标题：`账号登录`
- 副标题：`请使用公司统一配发的账号/密码登录`
- 输入项：
  - 用户名
  - 密码
- 协议勾选：
  - 用户使用协议
  - 用户信息保护政策
- 主按钮：`立即登录`
- 登录中状态：圆形 loading 动画

## 7.3 Login Interaction

- 未勾选协议时点击登录：弹出提示 `请先勾选同意《用户协议》`
- 已勾选协议时：
  - `isLoggingIn = true`
  - 延时约 `1200ms`
  - 切换为已登录态

## 7.4 Login Bottom Action Bar

- 触发方式：右下角汉堡按钮
- 展开后显示：
  - 网络诊断
  - 日志收集

## 8. Home View Template

### 8.1 Overall

- 背景图页面
- 顶部欢迎区
- 网络连接状态卡
- 左右两个功能卡片
- 右侧悬浮 3D WiFi 插图

### 8.2 Header Content

- 标题：`欢迎使用工作台`
- 互联网安全访问状态 pill：`互联网安全访问已连接`

### 8.3 Main Status Area

- 主状态标题：`办公网络已连接`
- 数据条目：
  - 上传速率
  - 下载速率
- 操作：`详情`
- 点击详情后打开右侧抽屉

### 8.4 Common Apps Card

- 卡片标题：`常用应用`
- 布局：3 列图标宫格
- 默认应用：
  - `w3-WEB资源`
  - `IT部应用系统`
  - `销售易-营销`
  - `研发效能平台`
- 附加入口：`添加常用应用`
- 悬浮提示：引导用户前往工作台添加应用

### 8.5 Shortcuts Card

- 卡片标题：`快捷入口`
- 入口：
  - `软件商城` -> route `store`
  - `申请权限` -> route `permissions`
  - `诊断修复`
  - `日志收集`

## 9. Detail Drawer Template

- 位置：右侧滑出
- 宽度：`460px`
- 标题：`详情`
- 标签页：
  - `办公网络接入详情`
  - `互联网接入详情`

### 9.1 Office Tab

展示字段：
- 接入点 IP
- 接入时间
- 流速情况
- 流量统计
- 查看更多链接

### 9.2 Internet Tab

展示字段：
- 接入点 IP
- 网络类型
- 接入时间
- 在线时长
- 流速情况

## 10. Software Store View Template

- 页面标题：`软件商城`
- 顶部包含：
  - 返回按钮
  - 刷新按钮
  - 搜索框
- 左侧为分类导航
- 右侧为软件卡片列表

### 10.1 Category Examples

- 办公应用
- 编程
- 设计工具
- 分享协作
- 资源中心管理
- 自定义远程

### 10.2 Card Pattern

每个软件卡片包含：
- 图标
- 名称
- 版本号
- 简短描述
- 操作按钮

按钮状态示例：
- `下载`
- `下载39%`
- `打开文件夹`

## 11. Workspace View Template

- 页面标题：`欢迎使用工作台`
- 顶部工具区：
  - 列表 / 宫格切换
  - 搜索框
  - 刷新按钮
- 主体按分组展示应用图标

### 11.1 Group Sections

- 收藏或置顶入口
- `IT部应用系统-测试`
- `IT部应用系统-生产`

### 11.2 App Tile Pattern

每个图标项包含：
- 圆角白底图标容器
- 2x2 蓝色方块构成的通用应用标识
- 下方名称，支持两行文本
- hover 时上浮

### 11.3 Workspace Bottom Action Bar

- 触发按钮位于右下角
- 展开后显示：
  - 用户协议
  - 诊断修复
  - 日志收集

## 12. Terminal Management View Template

- 页面标题：`终端管理`
- 分组标题：`授信终端`
- 副说明：授信终端可免二次认证或一键上线

### 12.1 Terminal Card Fields

每个终端项包含：
- 设备图标：`Monitor` 或 `Laptop`
- 设备名称
- 当前设备 / 在线 / 离线状态
- 设备类型
- MAC 地址
- 地点 + IP
- 时间
- 资产类型
- 右侧操作按钮：`移除授权终端`

### 12.2 Sample Terminals

- `cyf的iMac`
- `陈宇凤的MacBook Pro`
- `cyf的MacBook Pro`
- `DESKTOP-G3UFC7D`

## 13. Permissions View Template

- 页面标题：`申请权限`
- 顶部右侧：搜索框
- 标签切换：
  - 全部
  - 即将过期
  - 已过期
- 左侧：系统分类列表
- 右侧：可申请权限列表

### 13.1 Example Categories

- `aTrust升级ZTA`
- `EP部门`
- `IT部应用系统-测试`
- `IT部应用系统-生产`

### 13.2 Permission Row Pattern

- 左侧：小型 2x2 方块图标 + 应用名
- 右侧：`申请权限`

## 14. Settings View Template

- 页面标题：`设置`
- 分为：
  - `基本设置`
  - `关于`

### 14.1 Basic Settings Fields

- 接入地址
- 企业名称
- 启动设置
  - 开机自启动
  - 登录成功后最小化客户端
- 语言设置

### 14.2 About Fields

- 当前版本
- 检查更新
- 隐私保护 / 用户协议

## 15. Profile View Template

- 页面标题：`个人信息`
- 顶部：头像、姓名、有效期标识
- 信息项：
  - 账号
  - 用户目录唯一标识
  - 电子邮箱
  - 手机号码

## 16. Logout Modal Template

- 类型：全局确认弹窗
- 文案：`确定注销登录账号吗？`
- 按钮：
  - `退出`
  - `取消`
- 退出行为：
  - `isLoggedIn = false`
  - `showLogoutModal = false`
  - `currentRoute = home`

## 17. Remote Assets Mentioned in Source

为了保证 AI 能够 1:1 还原页面，以下是从源代码中提取的所有关键远程图片资源索引。

### 17.1 Navigation & Branding
| Key | Usage | Source URL |
| :--- | :--- | :--- |
| `avatarUnlogged` | 侧边栏未登录头像 | `../../assets/icons/panel-avatar-unlogged.png` |
| `navHome` | 导航栏“首页”图标 | `../../assets/icons/panel-nav-home.png` |
| `navWorkspace` | 导航栏“工作台”图标 | `../../assets/icons/panel-nav-workspace.png` |
| `navSettings` | 导航栏“设置”图标 | `../../assets/icons/panel-nav-settings.png` |
| `navSettingsDisabled` | 导航栏“设置”图标 (禁用态) | `../../assets/icons/panel-nav-settings-disabled.png` |

### 17.2 Illustrations & Status
| Key | Usage | Source URL |
| :--- | :--- | :--- |
| `loginIllustration` | 登录页左侧主插画 | `../../assets/icons/panel-login-illus.png` |
| `wifiIllustration3D` | 首页右侧悬浮 3D WiFi 插图 | `../../assets/icons/panel-home-3dwifi.png` |
| `connectedStatusPill` | 顶部状态栏“已连接”小图标 | `../../assets/icons/panel-status-pill.png` |
| `uploadIcon` | 网络速率“上传”图标 | `../../assets/icons/panel-speed-up.png` |
| `downloadIcon` | 网络速率“下载”图标 | `../../assets/icons/panel-speed-down.png` |

### 17.3 App & Shortcut Icons
| Key | Usage | Source URL |
| :--- | :--- | :--- |
| `appWebResource` | “w3-WEB资源”应用图标 | `../../assets/icons/app-web.png` |
| `appITSystem` | “IT部应用系统”应用图标 | `../../assets/icons/app-it.png` |
| `appSales` | “销售易-营销”应用图标 | `../../assets/icons/app-sales.png` |
| `shortcutStore` | 快捷入口“软件商城” | `../../assets/icons/sc-store.png` |
| `shortcutPerms` | 快捷入口“申请权限” | `../../assets/icons/sc-perms.png` |
| `shortcutDiag` | 快捷入口“诊断修复” | `../../assets/icons/sc-diag.png` |
| `shortcutLogs` | 快捷入口“日志收集” | `../../assets/icons/sc-logs.png` |

### 17.4 Backgrounds
| Key | Usage | Source URL |
| :--- | :--- | :--- |
| `commonAppsCardBg` | “常用应用”卡片纹理背景 | `../../assets/icons/panel-card-common-bg.png` |
| `shortcutsCardBg` | “快捷入口”卡片纹理背景 | `../../assets/icons/panel-card-shortcut-bg.png` |
| `workspaceBg` | 工作台页面全屏背景纹理 | `../../assets/icons/panel-workspace-bg.png` |
| `bgLoggedIn` | 首页/头图已登录背景 (对齐托盘规范) | `../../assets/icons/tray-bg-login.png` |
| `bgLoggedOut` | 登录页/头图未登录背景 (对齐托盘规范) | `../../assets/icons/tray-bg-logout.png` |

> [!NOTE]
> 所有资产已完成本地化下载，存放于 `/assets/icons` 目录。

## 18. Reuse Guidance

当 AI 基于此模板继续生成页面时，建议遵循：

- 先复用统一外框：`920x570` 客户端窗口
- 再复用左侧导航和窗口控制区
- 页面主体按 route 独立拆分
- 抽屉、弹窗、底部操作栏作为共享浮层组件处理
- 所有图标宫格、应用卡片、信息行优先抽象为可复用子组件

## 19. Suggested Component Split

推荐拆分为：

- `ClientShell`
- `SidebarLoggedOut`
- `SidebarLoggedIn`
- `WindowControls`
- `LoginPanel`
- `HomeDashboard`
- `CommonAppsCard`
- `ShortcutsCard`
- `DetailDrawer`
- `SoftwareStorePage`
- `WorkspacePage`
- `TerminalManagementPage`
- `PermissionsPage`
- `SettingsPage`
- `ProfilePage`
- `LogoutConfirmModal`

## 20. Notes

- 原始内容为完整 React Demo 代码；本文件已转换为适合 AI 读取的页面模板说明。
- 若后续需要，可再补充对应的资源清单、交互流程图或组件树文档。
