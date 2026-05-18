import React, { useState } from 'react';

// ---- Inline SVG Icons ----
const SvgFolder = ({size=60,...p}) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" {...p}>
    <path d="M5.33 16c0-2.95 2.39-5.33 5.34-5.33h11.94c1.35 0 2.64.53 3.59 1.48l3.82 3.82c.47.47 1.12.74 1.79.74H53.3c2.95 0 5.34 2.38 5.34 5.33V48c0 2.95-2.39 5.33-5.34 5.33H10.67C7.72 53.33 5.33 50.95 5.33 48V16z" fill="#71D1FF"/>
    <path d="M5.33 22.67c0-2.95 2.39-5.34 5.34-5.34H53.3c2.95 0 5.34 2.39 5.34 5.34V48c0 2.95-2.39 5.33-5.34 5.33H10.67C7.72 53.33 5.33 50.95 5.33 48V22.67z" fill="#36C2FF"/>
    <path opacity="0.3" d="M10.67 17.33H53.3c2.95 0 5.34 2.39 5.34 5.34V24H5.33v-1.33c0-2.95 2.39-5.34 5.34-5.34z" fill="white"/>
  </svg>
);

const ASSETS = "../../aio-terminal-demo/assets/icons/";

export default function MacDesktopShell({ children }) {
  const [clientOpen, setClientOpen] = useState(false);
  
  const dockApps = [
    { name: 'Finder', icon: 'icon-finder-macos.png' },
    { name: 'Launchpad', icon: 'icon-launchpad-macos.png' },
    { name: 'aTrust', icon: 'icon-atrust.png', action: () => setClientOpen(true) },
    { name: 'Chrome', icon: 'icon-chrome.png' },
    { name: 'Trash', icon: 'icon-recycle-bin-macos.png' }
  ];

  const folders = [
    { name: 'RP 文件' },
    { name: '素材类', cloud: true },
    { name: '图片' },
    { name: '过程文件' },
  ];

  return (
    <div className="h-screen w-full relative overflow-hidden flex flex-col select-none" 
         style={{ backgroundImage: `url('${ASSETS}wallpaper.png')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      
      {/* Menu Bar */}
      <div className="h-6 w-full bg-black/20 backdrop-blur-md flex items-center px-4 justify-between text-white text-[12px] font-medium z-[100]">
        <div className="flex items-center gap-5"><span className="font-bold">Finder</span><span>文件</span><span>编辑</span><span>显示</span><span>前往</span><span>窗口</span><span>帮助</span></div>
        <div className="flex items-center gap-4"><span>5月11日 周一 10:45</span></div>
      </div>

      {/* Desktop Content */}
      <div className="flex-1 relative p-6">
        {/* Desktop Folders (Right Aligned) */}
        <div className="absolute right-6 top-6 bottom-[100px] flex flex-col flex-wrap-reverse content-start gap-6">
          {folders.map((folder, i) => (
            <div key={i} className="w-[84px] p-2 flex flex-col items-center gap-1 group cursor-pointer">
              <div className="w-16 h-16 flex items-center justify-center group-active:scale-95 transition-transform">
                <SvgFolder size={62} className="drop-shadow-md" />
              </div>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="text-[12px] text-white text-shadow-sm font-medium px-1.5 py-0.5 rounded leading-tight text-center max-w-full truncate">
                  {folder.name}
                </span>
                {folder.cloud && (
                  <svg className="w-3.5 h-3.5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Children (e.g. Client Window) */}
        {children && React.cloneElement(children, { isOpen: clientOpen, onClose: () => setClientOpen(false) })}
      </div>

      {/* Dock */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 h-[72px] bg-white/20 backdrop-blur-xl border border-white/20 rounded-[20px] p-1.5 flex items-end gap-2 z-[100]">
        {dockApps.map((a, i) => (
          <div key={i} onClick={a.action} className="w-[54px] h-[54px] flex items-center justify-center rounded-xl hover:scale-125 hover:-translate-y-2 transition-all duration-200 cursor-pointer">
            <img src={ASSETS + a.icon} className="w-12 h-12 object-contain" alt={a.name} />
          </div>
        ))}
      </div>
    </div>
  );
}
