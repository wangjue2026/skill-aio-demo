import React, { useState } from 'react';
import { Menu, X, Plus, Minus, Maximize, ChevronDown, List, Search, LayoutGrid } from 'lucide-react';

/**
 * WorkspaceViewer Components
 * 
 * Includes:
 * 1. WorkspacePanel: Side panel with glassmorphism and app grid.
 * 2. WordViewer: High-fidelity WPS-style document viewer.
 */

// --- 1. Workspace Panel (侧边办公空间) ---
export const WorkspacePanel = ({ isOpen, onClose, onOpenFile }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-[46px] w-[356px] h-[620px] my-auto z-[900] animate-in slide-in-from-right fade-in duration-300">
      <div className="w-full h-full bg-white/75 backdrop-blur-[30px] rounded-[6px] shadow-[0_4px_24px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden font-sans border border-white/20">
        {/* Header */}
        <div className="h-[48px] px-4 flex justify-between items-center border-b border-gray-200/50">
          <div className="flex items-center gap-2">
            <img src="../../aio-terminal-demo/assets/icons/ws-panel-title.png" className="w-[18px] h-[18px]" alt="ws" />
            <span className="text-[15px] font-bold text-[#2F3540]">办公空间</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-1 hover:bg-gray-200/50 rounded transition-colors text-[#6F7785]"><List size={16} /></button>
            <button className="p-1 hover:bg-gray-200/50 rounded transition-colors text-[#6F7785]"><Minus size={16} /></button>
            <button onClick={onClose} className="p-1 hover:bg-gray-200/50 rounded transition-colors text-[#6F7785]"><X size={16} /></button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4 custom-scrollbar">
          {/* App Grid */}
          <div className="grid grid-cols-4 gap-y-4 mb-8">
            {[
              { name: 'WPS', icon: '../../aio-terminal-demo/assets/icons/icon-wps.png' },
              { name: '文件管理', icon: '../../aio-terminal-demo/assets/icons/icon-file-mgr.png' },
              { name: '回收站', icon: '../../aio-terminal-demo/assets/icons/icon-trash.png' },
              { name: 'Chrome', icon: '../../aio-terminal-demo/assets/icons/icon-chrome.png' },
              { name: 'Excel', icon: '../../aio-terminal-demo/assets/icons/icon-excel.png' },
            ].map((app, i) => (
              <div key={i} className="flex flex-col items-center gap-1 group cursor-pointer">
                <div className="w-[48px] h-[48px] bg-transparent group-hover:bg-white/40 rounded-[6px] flex items-center justify-center transition-all duration-200">
                  <img src={app.icon} className="w-[40px] h-[40px] object-contain" alt={app.name} />
                </div>
                <span className="text-[11px] text-[#2F3540]">{app.name}</span>
              </div>
            ))}
          </div>

          {/* Recent Files */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-[13px] font-bold text-[#2F3540]">最近文件</span>
              <button className="text-[#1C6EFF] text-[11px]">查看更多</button>
            </div>
            <div className="space-y-0.5">
              {[
                { name: '2026年Q2业务规划.docx', time: '10分钟前' },
                { name: '深信服 aTrust 部署指南.docx', time: '1小时前' },
                { name: '项目周报_20260511.docx', time: '3小时前' }
              ].map((file, i) => (
                <div 
                  key={i} 
                  onClick={() => onOpenFile(file)}
                  className="flex items-center gap-3 p-2 hover:bg-white/50 rounded-md cursor-pointer transition-colors group"
                >
                  <img src="../../aio-terminal-demo/assets/icons/icon-file-word.png" className="w-[16px] h-[16px]" alt="word" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] text-[#2F3540] truncate leading-tight">{file.name}</p>
                    <p className="text-[11px] text-[#8D95A3] mt-0.5">{file.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 2. Word Viewer (WPS 风格) ---
export const WordViewer = ({ file, isOpen, onClose }) => {
  const [isMaximized, setIsMaximized] = useState(false);
  if (!isOpen || !file) return null;

  const containerClass = isMaximized
    ? "fixed inset-0 z-[2000] bg-[#F5F6F7] flex flex-col font-sans select-none animate-in zoom-in-95 duration-200"
    : "fixed top-[8%] left-[12%] right-[12%] bottom-[8%] rounded-[8px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.3)] border border-gray-300 z-[2000] bg-[#F5F6F7] flex flex-col font-sans select-none animate-in zoom-in-95 duration-200";

  return (
    <div className={containerClass}>
      {/* 顶部橙色装饰条 */}
      <div className="h-[8px] w-full bg-gradient-to-r from-[#FFC896] to-[#FA721B] shrink-0"></div>
      
      {/* 顶部标题栏 / 页签栏 */}
      <div className="h-[40px] bg-white flex items-center px-4 border-b border-gray-200 shrink-0">
        <div className="flex-1 flex items-center gap-2">
          <div className="flex items-center bg-[#F2F3F5] h-[34px] px-4 rounded-t-md border-x border-t border-gray-200 min-w-[200px] relative top-[4px]">
             <img src="../../aio-terminal-demo/assets/icons/icon-file-word.png" className="w-4 h-4 mr-2" alt="w" />
             <span className="text-[12px] text-gray-700 font-medium truncate">{file.name}</span>
             <X size={14} className="ml-4 text-gray-400 hover:text-gray-600 cursor-pointer" />
          </div>
          <div className="w-[30px] h-[30px] flex items-center justify-center hover:bg-gray-100 rounded cursor-pointer text-gray-400 ml-1">
             <Plus size={16} />
          </div>
        </div>
        <div className="flex items-center gap-4 text-gray-500">
          <div className="flex items-center gap-2 mr-4 border-r border-gray-200 pr-4">
             <span className="text-[12px]">张三</span>
             <div className="w-6 h-6 rounded-full bg-blue-500 text-white text-[10px] flex items-center justify-center font-bold">张</div>
             <ChevronDown size={14} />
          </div>
          <Minus size={16} className="cursor-pointer hover:text-gray-800" />
          <Maximize size={15} className="cursor-pointer hover:text-gray-800" onClick={() => setIsMaximized(!isMaximized)} />
          <X size={18} className="cursor-pointer hover:text-gray-800" onClick={onClose} />
        </div>
      </div>

      {/* 工具栏菜单 */}
      <div className="h-[36px] bg-[#F5F6F7] flex items-center px-4 border-b border-gray-200 shrink-0">
        {['文件', '开始', '插入', '页面布局', '引用', '邮件', '审阅', '视图', '章节', '特色应用'].map((menu, i) => (
          <div key={i} className={`px-4 h-full flex items-center text-[12px] cursor-pointer transition-colors ${menu === '开始' ? 'bg-white font-bold text-gray-800' : 'text-gray-600 hover:bg-gray-200'}`}>
            {menu}
          </div>
        ))}
      </div>

      {/* 虚拟 A4 文档编辑器 */}
      <div className="flex-1 overflow-auto bg-[#E1E4E8] flex justify-center py-10 relative custom-scrollbar">
        <div className="w-[794px] h-[1123px] bg-white shadow-lg relative shrink-0 p-[96px] flex flex-col gap-6">
          {/* A4 裁剪标记 (L-shape corner markers) */}
          <div className="absolute top-8 left-8 w-6 h-6 border-t-2 border-l-2 border-gray-200"></div>
          <div className="absolute top-8 right-8 w-6 h-6 border-t-2 border-r-2 border-gray-200"></div>
          <div className="absolute bottom-8 left-8 w-6 h-6 border-b-2 border-l-2 border-gray-200"></div>
          <div className="absolute bottom-8 right-8 w-6 h-6 border-b-2 border-r-2 border-gray-200"></div>

          {/* 模拟文档内容 */}
          <h1 className="text-3xl font-bold text-center mb-8">{file.name.replace('.docx', '')}</h1>
          <div className="space-y-4">
            <div className="h-4 bg-gray-50 rounded w-full"></div>
            <div className="h-4 bg-gray-50 rounded w-[95%]"></div>
            <div className="h-4 bg-gray-50 rounded w-[98%]"></div>
            <div className="h-4 bg-gray-50 rounded w-[92%]"></div>
            <div className="h-4 bg-gray-100 rounded w-1/3 mt-8"></div>
            <div className="h-4 bg-gray-50 rounded w-full"></div>
            <div className="h-4 bg-gray-50 rounded w-[96%]"></div>
          </div>
        </div>
      </div>

      {/* 底部状态栏 */}
      <div className="h-[24px] bg-[#F5F6F7] border-t border-gray-200 flex items-center px-4 justify-between text-[11px] text-gray-500 shrink-0">
        <div className="flex gap-4">
          <span>第 1 页，共 1 页</span>
          <span>0 个字</span>
          <span className="text-blue-500">拼写检查：开</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
             <Minus size={12} />
             <div className="w-20 h-1 bg-gray-300 rounded-full overflow-hidden">
                <div className="w-1/2 h-full bg-blue-400"></div>
             </div>
             <Plus size={12} />
             <span className="ml-1">100%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
