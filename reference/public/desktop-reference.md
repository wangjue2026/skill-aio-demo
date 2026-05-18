---
title: AIO Terminal Demo Desktop Reference
scope: desktop
platforms:
  - windows
  - macos
format_version: 1.1
---

# Desktop Reference

本文件定义 AIO 终端 DEMO 所需的电脑桌面参考信息，优先面向 AI 读取与页面生成使用。

## Shared Wallpaper

- wallpaper_url: `../../assets/icons/wallpaper.png`

---

## Windows

### Overview

- platform: `windows`
- desktop_icons_present: `true`
- taskbar_present: `true`
- top_menu_bar_present: `false`

### Desktop Icons Order
桌面图标从左上角开始排序：
1. `此电脑` (`icon-this-pc.png`)
2. `回收站` (`icon-recycle-bin-windows.png`)
3. `atrust` (`icon-atrust.png`)
4. `用户文件夹` (`icon-user-folder.png` - 黄色风格)

---

## macOS

### Overview

- platform: `macos`
- desktop_icons_present: `true` (仅限文件夹)
- dock_present: `true`
- top_menu_bar_present: `true`

### ⚠️ IMPORTANT: macOS Conventions
- **禁止放置应用快捷方式**：macOS 桌面习惯上不放置应用程序的快捷方式（.alias/shortcut）。应用程序应统一从底部的 **Dock** 栏启动。
- **文件夹样式**：macOS 文件夹必须使用 **蓝色矩形** 样式，严禁使用 Windows 的黄色风格。

### Desktop Folders (Right Aligned)
macOS 桌面图标默认从 **右上角** 开始向下垂直排列：
1. `RP 文件`
2. `素材类` (常带云端状态图标 ☁️)
3. `图片`
4. `过程文件`

### Dock Icons Order
1. `访达` (`icon-finder-macos.png`)
2. `启动台` (`icon-launchpad-macos.png`)
3. `atrust` (`icon-atrust.png`)
4. `Chrome` (`icon-chrome.png`)
5. `回收站` (`icon-recycle-bin-macos.png`)

---

## Normalized Asset Index

- `wallpaper.default`: `../../assets/icons/wallpaper.png`
- `icon.atrust`: `../../assets/icons/icon-atrust.png`
- `icon.user-folder.windows`: `../../assets/icons/icon-user-folder.png` (黄色)
- `icon.folder.macos`: (建议使用内联 SVG 实现以保证 1:1 还原)
- `icon.finder.macos`: `../../assets/icons/icon-finder-macos.png`
- `icon.launchpad.macos`: `../../assets/icons/icon-launchpad-macos.png`
- `icon.recycle-bin.macos`: `../../assets/icons/icon-recycle-bin-macos.png`
- `icon.recycle-bin.windows`: `../../assets/icons/icon-recycle-bin-windows.png`

## Notes
- 在构建 macOS Demo 时，若涉及桌面文件夹，应优先使用 `mac-desktop-base.jsx` 中的 `SvgFolder` 组件。
