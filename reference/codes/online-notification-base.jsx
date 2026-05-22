import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

/**
 * ATrustOnlineNotification Component
 * 
 * macOS 右上角 Toast 通知，不阻断桌面交互。
 * 定位：fixed top-[40px] right-[16px]（顶部菜单栏正下方）
 * Width: 360px | Corner Radius: 12px
 * 自动 6 秒后消失。
 * Asset paths assume Demos/ folder location.
 * 
 * ⚠️ 注意：不要使用 `fixed inset-0 flex items-center justify-center`，
 * 那会变成居中全屏模态框，不符合 macOS 系统通知规范。
 */
export const ATrustOnlineNotification = ({ 
  isOpen, 
  onClose, 
  userName = "张三", 
  userId = "12897",
  loginAddress = "https://sdpc.sangfor.com:6440",
  loginTime = "2026-05-11 09:30:24"
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setShow(true), 80);
      const t = setTimeout(() => { setShow(false); setTimeout(onClose, 300); }, 6000);
      return () => clearTimeout(t);
    } else {
      setShow(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    // ✅ macOS 右上角 Toast 定位 —— pointer-events-none 外壳不阻断桌面
    <div
      style={{
        position: 'fixed',
        top: '40px',
        right: '16px',
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          width: '360px',
          background: 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.10)',
          border: '1px solid rgba(0,0,0,0.08)',
          overflow: 'hidden',
          pointerEvents: 'auto',
          transform: show ? 'translateX(0) scale(1)' : 'translateX(110%) scale(0.96)',
          opacity: show ? 1 : 0,
          transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1), opacity 0.25s ease',
        }}
      >
        {/* 01 产品标识规范 (高度 40px) */}
        <div style={{ height: '40px', padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <img
              src="../../aio-terminal-demo/assets/icons/icon-atrust-logo.png"
              alt="logo"
              style={{ width: '16px', height: '16px', objectFit: 'contain' }}
            />
            <span style={{ fontSize: '12px', color: '#8a8a8e', fontWeight: 500 }}>aTrust</span>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8a8a8e', lineHeight: 1, padding: '2px' }}
          >
            <X size={13} strokeWidth={2.5} />
          </button>
        </div>

        {/* 02 主体内容布局 */}
        <div style={{ padding: '14px 16px 16px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <img
            src="../../aio-terminal-demo/assets/icons/popup-success.png"
            alt="success"
            style={{ width: '34px', height: '42px', flexShrink: 0, objectFit: 'contain' }}
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#1d1d1f', marginBottom: '8px', lineHeight: '20px' }}>
              aTrust 登录上线通知
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', fontSize: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ width: '52px', color: '#8a8a8e', flexShrink: 0 }}>登录用户</span>
                <span style={{ marginLeft: '12px', color: '#1d1d1f' }}>{userName} ({userId})</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <span style={{ width: '52px', color: '#8a8a8e', flexShrink: 0 }}>登录地址</span>
                <span style={{ marginLeft: '12px', color: '#1d1d1f', fontFamily: 'monospace', fontSize: '11px', wordBreak: 'break-all', lineHeight: '16px' }}>{loginAddress}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ width: '52px', color: '#8a8a8e', flexShrink: 0 }}>登录时间</span>
                <span style={{ marginLeft: '12px', color: '#1d1d1f', fontFamily: 'monospace', fontSize: '11px' }}>{loginTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 03 底部操作栏 */}
        <div style={{ padding: '10px 16px', display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
          <button
            onClick={onClose}
            style={{ height: '28px', padding: '0 16px', background: '#1C6EFF', color: '#fff', fontSize: '12px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontWeight: 600 }}
          >
            我知道了
          </button>
        </div>
      </div>
    </div>
  );
};

