import React from 'react';
import { X } from 'lucide-react';

/**
 * ATrustTrayPopup Component
 * 
 * High-fidelity tray popup for notifications and actions.
 * Rule: Primary button is on the LEFT of the secondary button.
 * Rule: Items center alignment if no description/extra content.
 */
export const ATrustTrayPopup = ({
  isOpen,
  onClose,
  type = 'notice', // notice, warning, success, failure
  title = "检测到受信任的设备接入",
  desc = "",
  extraContent,
  showCheckbox = true,
  checkboxLabel = "不再提示",
  buttons = [
    { label: "查看详情", type: 'primary', onClick: () => {} },
    { label: "忽略", type: 'secondary', onClick: () => {} }
  ]
}) => {
  if (!isOpen) return null;

  const icons = {
    notice: '../../aio-terminal-demo/assets/icons/popup-notice.png',
    warning: '../../aio-terminal-demo/assets/icons/popup-warning.png',
    success: '../../aio-terminal-demo/assets/icons/popup-success.png',
    failure: '../../aio-terminal-demo/assets/icons/popup-failure.png'
  };

  const hasExtra = desc || extraContent;
  const alignmentClass = hasExtra ? 'items-start' : 'items-center';

  return (
    <div className="fixed bottom-6 right-6 z-[9999] animate-in slide-in-from-bottom-2 fade-in duration-300">
      <div className="w-[400px] bg-white rounded-[8px] shadow-[0_9px_28px_8px_rgba(0,0,0,0.05),0_6px_16px_0_rgba(0,0,0,0.08)] overflow-hidden font-sans border border-gray-100/50">
        {/* Header */}
        <div className="h-[40px] px-[20px] py-[4px] flex justify-between items-center bg-white">
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

        {/* Content */}
        <div className={`px-[20px] pt-[12px] flex ${alignmentClass}`}>
          <img 
            src={icons[type] || icons.notice} 
            alt="icon" 
            className="w-[36px] h-[44px] shrink-0" 
          />
          <div className="ml-[12px] flex-1">
            <h2 className="text-[16px] font-medium text-[#2F3540] leading-[24px]">{title}</h2>
            {desc && <p className="text-[13px] text-[#6F7785] leading-[20px] mt-1">{desc}</p>}
            {extraContent && <div className="mt-2">{extraContent}</div>}
          </div>
        </div>

        {/* Footer */}
        <div className="px-[20px] py-[12px] flex justify-between items-center h-[56px] mt-1">
          <div>
            {showCheckbox && (
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="w-4 h-4 rounded-[2px] border border-[#D3D7DE] flex items-center justify-center group-hover:border-[#1C6EFF] transition-colors">
                  <div className="w-2 h-2 bg-[#1C6EFF] rounded-[1px] opacity-0 group-hover:opacity-20"></div>
                </div>
                <span className="text-[12px] text-[#2F3540]">{checkboxLabel}</span>
              </label>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {buttons.map((btn, idx) => (
              <button
                key={idx}
                onClick={btn.onClick}
                className={`h-[32px] px-[16px] text-[13px] rounded-[2px] transition-all ${
                  btn.type === 'primary' 
                    ? 'bg-[#1C6EFF] text-white hover:bg-blue-600 shadow-sm' 
                    : 'bg-white border border-[#D3D7DE] text-[#2F3540] hover:bg-gray-50'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
