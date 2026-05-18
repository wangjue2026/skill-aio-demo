---
title: AIO Terminal Client Tray Popup Component Specification
category: component-spec
platform: desktop-client
component_name: TrayPopup
base_code_path: aio-terminal-demo/reference/codes/tray-popup-base.jsx
format_version: 1
---

# AIO Terminal Client Tray Popup Component Specification

本文件定义了 `TrayPopup` 客户端托盘弹窗组件的视觉与交互规范。该组件用于操作系统托盘区域（Windows 右下角 / macOS 右上角）的通知、告警及交互确认场景。

## 1. Visual Standards (基础视觉)

- **基础容器**:
  - **宽度**: `400px`
  - **圆角**: `8px`
  - **背景**: `#FFFFFF`
  - **阴影**: `0 9px 28px 8px rgba(0, 0, 0, 0.05), 0 6px 16px 0 rgba(0, 0, 0, 0.08)`
  - **边框**: 无需边框，依靠投影区分。

- **配色体系 (Tokens)**:
  - **品牌蓝 (Brand Blue)**: `#1C6EFF`
  - **主文字 (Text Main)**: `#2F3540`
  - **次文字 (Text Sub)**: `#6F7785`
  - **分割线/边框 (Border)**: `#D3D7DE`
  - **成功色**: `#7b0rUcQ` (基于图片参考)
  - **告警背景**: `#FFF5E6`, **文字**: `#D97706`

## 2. Component Structure (组件结构)

### 2.1 Header (产品标识)
- **高度**: `40px`
- **内边距**: `4px 20px`
- **Logo**: `16x16px`, 与名称间距 `5px`
- **产品名称**: `13px`, 颜色 `#6F7785`, 行高 `20px`
- **关闭按钮**: `14x14px`, 颜色 `#9CA3AF`, 悬浮颜色 `#2F3540`

### 2.2 Main Content (主体内容)
- **内边距**: `12px 20px 0 20px`
- **插图 (Illustration)**: `36x44px`, 位于左侧。
- **标题 (Title)**: `16px`, `font-weight: 500`, 颜色 `#2F3540`, 行高 `24px`
- **辅助描述 (Description)**: `13px`, 颜色 `#6F7785`, 行高 `20px`, 距离标题 `4px`
- **布局规则 (Alignment)**:
  - **默认**: 顶部对齐 (`items-start`)，插图与文字间距 `12px`。
  - **特殊情况**: 若仅有插图和标题（无描述和额外内容），需垂直居中对齐 (`items-center`)。

### 2.3 Extra Content (扩展内容)
- **卡片样式**: 背景 `#F7F9FC`, 圆角 `4px`, 内边距 `12px`。
- **信息列表**: `Grid` 布局，Label 宽度 `60px`, 间距 `12px`, 字号 `13px`。
- **输入框**: 高度 `32px`, 边框 `#D3D7DE`, 圆角 `2px`。
- **单选组**: 纵向间距 `12px`。单选框 `16px` 外圈，`8px` 内点，选中色为品牌蓝。

### 2.4 Footer (底部操作栏)
- **高度**: `56px`
- **内边距**: `12px 20px`
- **复选框 (不再询问)**:
  - **字号**: `12px`, 颜色 `#2F3540`
  - **容器**: 圆角 `2px`, 尺寸 `16px`, 选中背景品牌蓝，内含白色勾选图标。
- **按钮组**:
  - **按钮规格**: 高度 `32px`, 圆角 `2px`, 字号 `13px`。
  - **排序规则 (重要)**: **主按钮 (Primary) 必须放在次按钮的左边**。
  - **间距**: 按钮之间 `8px`。

## 3. Position and Animation (定位与动画)

- **Windows**: 位于屏幕右下角，距离边缘 `24px`。
- **macOS**: 位于屏幕右上角，距离边缘 `24px`。
- **入场动画**: 透明度 `0 -> 1`，位移 `translateY(10px) -> 0`，持续时间 `0.3s`。

## 4. Assets

| Key | Usage | Local Path |
| :--- | :--- | :--- |
| `popup-notice` | 通知类插图 | `../../assets/icons/popup-notice.png` |
| `popup-warning` | 警告类插图 | `../../assets/icons/popup-warning.png` |
| `popup-success` | 成功类插图 | `../../assets/icons/popup-success.png` |
| `popup-failure` | 失败类插图 | `../../assets/icons/popup-failure.png` |

---
*Generated based on aTrust Tray Popup Specification for AIO Terminal Project.*
