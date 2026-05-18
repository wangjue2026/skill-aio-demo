---
title: AIO Terminal Login/Online Notification Template
category: page-template
platform: desktop-client
component_name: OnlineNotification
base_code_path: aio-terminal-demo/reference/codes/online-notification-base.jsx
format_version: 1
---

# AIO Terminal Login/Online Notification Template

本文件用于描述 `OnlineNotification` 登录上线通知弹窗模板，基于 aTrust 规范化弹窗标准定义，旨在作为 1:1 还原的视觉与布局标准。

## 1. Overall Summary

- **组件类型**：`全局通知弹窗 / 状态通知`
- **主要框架**：`React + Tailwind CSS`
- **基础尺寸**：宽度 `400px`，高度自适应
- **视觉风格**：`Ant Design 风格衍生`、`圆角 (8px)`、`深色文字体系`、`标准化间距`
- **核心交互**：
  - 信息展示（登录用户、地址、时间等）
  - 按钮操作（知晓/关闭）
  - 顶部产品标识识别

## 2. Component Structure

```text
OnlineNotification Popup
├── 1. Header (Product Identity, 40px)
│   ├── Logo Area (Logo 16x16 + Name 13px)
│   └── Close Action (14x14)
├── 2. Content Area (Body)
│   ├── Illustration (36x44)
│   └── Text Body
│       ├── Title (16px, Medium)
│       └── Detail List (Label-Value pairs)
└── 3. Footer (Action Bar, 56px)
    └── Button Group (Right Aligned)
```

## 3. Visual Design Specifications

### 3.1 Container (Popup)
- **宽度**: `400px`
- **圆角**: `8px`
- **背景**: `#FFFFFF`
- **阴影**: 
  - `0 9px 28px 8px rgba(0, 0, 0, 0.05)`
  - `0 6px 16px 0 rgba(0, 0, 0, 0.08)`
- **字体**: `PingFang SC`, `-apple-system`, `BlinkMacSystemFont` 等系统默认字体

### 3.2 Header (01 产品标识规范)
- **高度**: `40px`
- **内边距**: `4px 20px`
- **产品名称**: `13px`, 颜色 `#6F7785`, 行高 `20px`
- **Logo 尺寸**: `16x16px`, `object-contain`
- **间距**: Logo 与名称间距 `5px`
- **关闭图标**: `14x14px`, 颜色 `#9CA3AF`, 1.5/2.0 stroke-width

### 3.3 Content (02 主体内容布局)
- **容器内边距**: `12px 20px 20px 20px`
- **插图 (Illustration)**: `36x44px`, 位于左侧
- **内容间距**: 插图与右侧文案间距 `12px`
- **标题 (Title)**: `16px`, `font-weight: 500`, 颜色 `#2F3540`, 行高 `24px`
- **详情列表 (Details)**:
  - **上边距**: 距离标题 `4px`
  - **行间距**: 各行之间 `8px` (gap-2)
  - **Label**: 宽度 `52px` (约 4 字符宽), 颜色 `#6F7785`, `13px`
  - **Value**: 颜色 `#2F3540`, `13px`, 左边距 (Margin Left) **严禁小于 16px**

### 3.4 Footer (03 底部操作栏)
- **高度**: `56px`
- **内边距**: `12px 20px 20px 20px`
- **对齐方式**: `flex-end` (靠右对齐)
- **按钮规范**:
  - **高度**: `32px`
  - **内边距**: `0 16px` (px-4)
  - **圆角**: `2px`
  - **字号**: `13px`
  - **次按钮 (Secondary)**: 背景 `#FFFFFF`, 文字 `#2F3540`, 边框 `1px solid #D3D7DE`

## 4. Asset Configuration

| Key | Usage | Local Path |
| :--- | :--- | :--- |
| `productLogo` | aTrust 产品 Logo | `../../assets/icons/icon-atrust-logo.png` |
| `statusIllustration`| 状态插图 (成功/上线) | `../../assets/icons/popup-success.png` |

## 5. Implementation Notes

- **对齐逻辑**: 详情列表的 Value 区域必须对齐，Label 宽度固定为 `52px` 以确保视觉整齐。
- **圆角差异**: 注意弹窗外框圆角为 `8px`，但内部按钮圆角为 `2px`。
- **状态扩展**: 该模板可扩展用于“注销通知”、“权限申请结果”等类似通知场景，只需更换 `Illustration` 和 `Title` 即可。

---
*Generated based on aTrust Popup Standard for AIO Terminal Project.*
