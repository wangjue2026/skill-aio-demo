import React from 'react';
import { X } from 'lucide-react';

/**
 * ATrustOnlineNotification Component
 * 
 * 1:1 reproduction of the aTrust login notification popup.
 * Fixed Width: 400px
 * Corner Radius: 8px
 * Asset paths assume Demos/ folder location.
 */
export const ATrustOnlineNotification = ({ 
  isOpen, 
  onClose, 
  userName = "张三", 
  userId = "12897",
  loginAddress = "https://sdpc.sangfor.com:6440",
  loginTime = "2026-05-11 09:30:24"
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[9999] bg-black/5 animate-in fade-in duration-300">
      <div className="w-[400px] bg-white rounded-[8px] shadow-[0_9px_28px_8px_rgba(0,0,0,0.05),0_6px_16px_0_rgba(0,0,0,0.08)] overflow-hidden font-sans">
        {/* 01 产品标识规范 (高度 40px) */}
        <div className="h-[40px] px-[20px] py-[4px] flex justify-between items-center bg-white border-b border-transparent">
          <div className="flex items-center gap-[5px]">
            <img 
              src="../../aio-terminal-demo/assets/icons/icon-atrust-logo.png" 
              alt="logo" 
              className="w-[16px] h-[16px] object-contain" 
            />
            <span className="text-[13px] text-[#6F7785] leading-[20px]">aTrust</span>
          </div>
          <button 
            onClick={onClose}
            className="text-[#9CA3AF] hover:text-[#2F3540] transition-colors"
          >
            <X className="w-3.5 h-3.5" strokeWidth={2.5} />
          </button>
        </div>

        {/* 02 主体内容布局 */}
        <div className="px-[20px] pt-[12px] pb-[20px] flex items-start">
          {/* 插图 */}
          <img 
            src="../../aio-terminal-demo/assets/icons/popup-success.png" 
            alt="success" 
            className="w-[36px] h-[44px] shrink-0" 
          />
          
          {/* 文案区 */}
          <div className="ml-[12px] flex-1">
            <h2 className="text-[16px] font-medium text-[#2F3540] leading-[24px] mb-[4px]">
              aTrust 登录上线通知
            </h2>
            
            {/* 详情列表 */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center text-[13px]">
                <span className="w-[52px] text-[#6F7785] shrink-0">登录用户</span>
                <span className="ml-[16px] text-[#2F3540]">{userName} ({userId})</span>
              </div>
              <div className="flex items-start text-[13px]">
                <span className="w-[52px] text-[#6F7785] shrink-0">登录地址</span>
                <span className="ml-[16px] text-[#2F3540] break-all leading-tight">{loginAddress}</span>
              </div>
              <div className="flex items-center text-[13px]">
                <span className="w-[52px] text-[#6F7785] shrink-0">登录时间</span>
                <span className="ml-[16px] text-[#2F3540]">{loginTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 03 底部操作栏 (高度 56px) */}
        <div className="px-[20px] py-[12px] flex justify-end items-center bg-white border-t border-transparent">
          <button 
            onClick={onClose}
            className="h-[32px] px-[16px] bg-[#1C6EFF] text-white text-[13px] rounded-[2px] hover:bg-blue-600 transition-colors shadow-sm"
          >
            我知道了
          </button>
        </div>
      </div>
    </div>
  );
};
