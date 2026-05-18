import React from 'react';
import { X } from 'lucide-react';

/**
 * ATrustModal Component
 * 
 * Standard modal for the client panel.
 * Overlay: 40% Black
 * Corner Radius: 4px
 * Animation: zoom-in-95 (200ms)
 */
export const ATrustModal = ({
  isOpen,
  onClose,
  type = 'info', // info, warning, success, error
  title = "确定执行此操作吗？",
  desc = "",
  extraContent,
  buttons = [
    { label: "确认", type: 'primary', onClick: () => {} },
    { label: "取消", type: 'secondary', onClick: () => {} }
  ]
}) => {
  if (!isOpen) return null;

  const icons = {
    info: '../../aio-terminal-demo/assets/icons/modal-info.png',
    warning: '../../aio-terminal-demo/assets/icons/modal-warning.png',
    success: '../../aio-terminal-demo/assets/icons/modal-success.png',
    error: '../../aio-terminal-demo/assets/icons/modal-error.png'
  };

  const hasExtra = desc || extraContent;
  const alignmentClass = hasExtra ? 'items-start' : 'items-center';

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/40 transition-opacity animate-in fade-in duration-200" 
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="bg-white rounded-[4px] shadow-2xl w-[400px] max-h-[560px] flex flex-col relative z-10 animate-in fade-in zoom-in-95 duration-200 overflow-hidden font-sans">
        {/* Header (Height 40px) */}
        <div className="h-[40px] flex justify-end items-center px-[16px] shrink-0">
          <button 
            onClick={onClose} 
            className="w-[16px] h-[16px] text-[#8D95A3] hover:text-[#2F3540] flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" strokeWidth={2.5} />
          </button>
        </div>

        {/* Content Area */}
        <div className="px-[32px] pb-[16px] overflow-auto">
          <div className={`flex ${alignmentClass}`}>
            <img 
              src={icons[type] || icons.info} 
              alt="status" 
              className="w-[40px] h-[48px] shrink-0" 
            />
            <div className="ml-[16px] flex-1 min-w-0">
              <h2 className="text-[16px] font-medium text-[#2F3540] leading-[24px]">
                {title}
              </h2>
              {desc && (
                <p className="text-[13px] text-[#6F7785] leading-[20px] mt-[4px]">
                  {desc}
                </p>
              )}
              {extraContent && (
                <div className="mt-[8px]">
                  {extraContent}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer (Height 56px) */}
        <div className="h-[56px] px-[20px] py-[12px] flex justify-end items-center mt-auto shrink-0">
          {buttons.map((btn, idx) => (
            <button
              key={idx}
              onClick={btn.onClick}
              className={`h-[32px] px-[16px] text-[13px] rounded-[2px] ml-[8px] transition-all flex items-center justify-center min-w-[72px] ${
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
  );
};
