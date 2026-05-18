---
title: AIO Terminal Client Panel Modal Component Specification
category: component-spec
platform: desktop-client
component_name: ClientPanelModal
base_code_path: aio-terminal-demo/reference/codes/client-panel-modal-base.jsx
format_version: 1
---

# AIO Terminal Client Panel Modal Component Specification

本文件定义了 `ClientPanelModal` 客户端面板弹窗组件的视觉与交互规范。该组件用于客户端主体界面内的业务确认、信息提示及复杂操作交互（如注销密码输入）。

## 1. Visual Standards (基础视觉)

- **全局蒙层 (Overlay)**:
  - **背景**: 纯黑 (#000000)
  - **不透明度**: `40%`
  - **对齐**: 居中对齐

- **弹窗容器 (Container)**:
  - **宽度**: `400px`
  - **最大高度**: `560px`
  - **圆角**: `4px`
  - **背景**: `#FFFFFF`
  - **阴影**: `shadow-2xl` (Ant Design 风格深色投影)
  - **动画**: 进入时透明度从 0 到 1，缩放从 95% 到 100%，持续时间 `200ms`。

## 2. Component Structure (组件结构)

### 2.1 Header (顶部操作区)
- **高度**: `40px`
- **关闭按钮**: 位于右上角，尺寸 `16x16px`，右间距 `16px`。
- **关闭按钮颜色**: 默认 `#8F959E`，悬浮颜色 `#2F3540`。

### 2.2 Main Content (主体内容)
- **内边距**: 左右 `32px`，底部 `20px`。
- **插图 (Illustration)**: 尺寸 `40x48px`，位于文字左侧，右间距 `16px`。
- **文本主体**:
  - **标题 (Title)**: `16px`, `font-weight: 500`, 颜色 `#2F3540`, 行高 `24px`。
  - **辅助描述 (Description)**: `13px`, 颜色 `#6F7785`, 行高 `20px`, 距离标题 `4px`。
  - **额外内容 (Extra)**: 距离上方元素 `4px` 或 `8px`（视内容复杂度定）。
- **布局规则 (Alignment)**:
  - **默认**: 顶部对齐 (`items-start`)。
  - **例外**: 当**既没有**描述文案**也没有**额外扩展内容时，插图与标题需垂直居中对齐 (`items-center`)。

### 2.3 Footer (底部操作栏)
- **高度**: `56px`
- **内边距**: `12px 20px`
- **按钮规范**:
  - **高度**: `32px`
  - **内边距**: `0 16px`
  - **圆角**: `2px`
  - **字号**: `13px`
  - **主按钮 (Primary)**: 背景 `#1C6EFF`, 文字白色。
  - **次按钮 (Secondary)**: 背景 `#FFFFFF`, 文字 `#2F3540`, 边框 `1px solid #D3D7DE`。
  - **间距**: 按钮之间 `8px`。

## 3. Tech Stack Reference (技术参考)

- **React + Tailwind 实现**:
  ```jsx
  <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40">
    <div className="bg-white w-[400px] max-h-[560px] rounded-[4px] shadow-2xl animate-in fade-in zoom-in-95 duration-200">
      {/* 结构实现... */}
    </div>
  </div>
  ```

## 4. Assets

| Key | Usage | Local Path |
| :--- | :--- | :--- |
| `modal-info` | 信息提示插图 | `../../assets/icons/modal-info.png` |
| `modal-warning` | 警告/二次确认插图 | `../../assets/icons/modal-warning.png` |
| `modal-success` | 操作成功插图 | `../../assets/icons/modal-success.png` |
| `modal-error` | 操作失败/错误插图 | `../../assets/icons/modal-error.png` |

---
*Generated based on React Modal Reference for AIO Terminal Project.*
