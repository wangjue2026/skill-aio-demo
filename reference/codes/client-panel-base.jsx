import React, { useState, useEffect, useRef } from 'react';

// ---- Inline SVG Icons (Anti-Black Screen Standard) ----
const SvgX = ({size=16,sw=2,...p}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" {...p}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const SvgMenu = ({size=16,...p}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" {...p}><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>;
const SvgUser = ({s=16}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const SvgShield = ({s=16}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const SvgMonitor = ({size=16,s=16,...p}) => <svg width={size||s} height={size||s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>;
const SvgLogout = ({s=16}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>;
const SvgSearch = ({size=16,...p}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" {...p}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
const SvgGrid = ({size=16,...p}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>;
const SvgList = ({size=16,...p}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" {...p}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>;

const ASSETS = "../../aio-terminal-demo/assets/icons/";

const WinCtrl = ({onClose, showSwitch=false}) => (
  <div className="absolute top-0 right-0 flex z-[100]">
    {showSwitch && (
      <div className="w-10 h-8 flex items-center justify-center text-[#6F7785] hover:bg-black/5 cursor-pointer">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7 10L3 6l4-4M21 6H3M17 14l4 4-4 4M3 18h18"/></svg>
      </div>
    )}
    <div className="w-10 h-8 flex items-center justify-center text-[#6F7785] hover:bg-black/5 cursor-pointer">
      <svg width="12" height="12"><line x1="1" y1="6" x2="11" y2="6" stroke="currentColor"/></svg>
    </div>
    <div className="w-10 h-8 flex items-center justify-center text-[#6F7785] hover:bg-black/5 cursor-pointer">
      <svg width="12" height="12"><rect x="1.5" y="1.5" width="9" height="9" stroke="currentColor" fill="none"/></svg>
    </div>
    <div onClick={onClose} className="w-10 h-8 flex items-center justify-center text-[#6F7785] hover:bg-red-500 hover:text-white cursor-pointer group">
      <svg width="12" height="12"><line x1="1" y1="1" x2="11" y2="11" stroke="currentColor"/><line x1="1" y1="11" x2="11" y2="1" stroke="currentColor"/></svg>
    </div>
  </div>
);

export default function ATrustClient({isOpen, onClose, onLoginSuccess}) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [logging, setLogging] = useState(false);
  const [route, setRoute] = useState('home'); 
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [activeDetailTab, setActiveDetailTab] = useState('office');
  const [activeCategory, setActiveCategory] = useState('common');
  const [allApps, setAllApps] = useState([
    { id: 1, name: 'w3-WEB资源', category: 'w3', isFavorite: true },
    { id: 2, name: '攻防对抗_蓝军情报劫持', category: 'it-prod', isFavorite: true },
    { id: 3, name: '渠道门户测试环境', category: 'it-test', isFavorite: false },
    { id: 4, name: 'cpq-非研发-业务', category: 'it-prod', isFavorite: false },
    { id: 5, name: 'gpt隧道应用', category: 'it-prod', isFavorite: false },
    { id: 6, name: '盘古供_sit_隧道_业务', category: 'it-prod', isFavorite: false },
    { id: 7, name: '盘古销_移动端_h5_业务', category: 'it-prod', isFavorite: false },
    { id: 8, name: '千流平台-长沙TP服务-非研发-业务', category: 'it-prod', isFavorite: false },
    { id: 9, name: 'IT FastGPT', category: 'it-test', isFavorite: false },
    { id: 10, name: '云图管家', category: 'w3', isFavorite: false },
  ]);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setShowMoreMenu(false); };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleFavorite = (id) => {
    setAllApps(prev => prev.map(app => app.id === id ? { ...app, isFavorite: !app.isFavorite } : app));
  };

  const getJustifyClass = (index) => {
    const pos = index % 3;
    return pos === 0 ? "justify-self-start" : pos === 1 ? "justify-self-center" : "justify-self-end";
  };

  if (!isOpen) return null;

  const doLogin = () => { 
    setLogging(true); 
    setTimeout(()=>{
      setLogging(false);
      setLoggedIn(true);
      if(onLoginSuccess) onLoginSuccess();
    },1200); 
  };

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center bg-black/10 backdrop-blur-sm">
      <div className="w-[920px] h-[570px] bg-white rounded-lg shadow-2xl flex overflow-hidden relative border border-gray-200">
        {!loggedIn ? (
          <div className="flex w-full h-full">
            <aside className="w-16 bg-[#37405B] flex flex-col items-center py-6 shrink-0">
              <div className="flex flex-col items-center opacity-50 mt-2"><img src={ASSETS+'panel-avatar-unlogged.png'} className="w-10 h-10 mb-1"/><span className="text-[10px] text-white">未登录</span></div>
              <nav className="w-full flex flex-col mt-8"><div className="w-full flex flex-col items-center py-3 bg-[#1C6EFF]"><img src={ASSETS+'panel-nav-home.png'} className="w-[22px] h-[22px] mb-1.5"/><span className="text-[11px] text-white font-medium">首页</span></div></nav>
            </aside>
            <main className="flex-1 flex bg-white relative">
              <WinCtrl showSwitch onClose={onClose}/>
              <div className="w-[420px] h-full relative overflow-hidden shrink-0"><img src={ASSETS+'panel-login-illus.png'} className="w-full h-full object-cover"/></div>
              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="w-[320px]">
                  <h1 className="text-[22px] font-bold text-center mb-2 text-[#2F3540]">账号登录</h1>
                  <p className="text-[13px] text-gray-400 text-center mb-10">请使用公司统一配发的账号/密码登录</p>
                  <div className="space-y-4 mb-8">
                    <div className="h-10 border border-gray-200 rounded px-3 flex items-center gap-3"><SvgUser s={16} className="text-gray-300"/><input type="text" defaultValue="张三" className="flex-1 outline-none text-[13px]"/></div>
                    <div className="h-10 border border-gray-200 rounded px-3 flex items-center gap-3"><SvgShield s={16} className="text-gray-300"/><input type="password" placeholder="请输入您的密码" className="flex-1 outline-none text-[13px]"/></div>
                  </div>
                  <button onClick={doLogin} className="w-full h-10 bg-[#1C6EFF] text-white rounded text-[14px] font-medium hover:bg-blue-600 transition-colors">{logging ? '正在登录...' : '立即登录'}</button>
                </div>
              </div>
            </main>
          </div>
        ) : (
          <div className="flex w-full h-full">
            <aside className="w-[64px] bg-[#37405B] flex flex-col items-center py-6 justify-between shrink-0 relative z-[60]">
              <div className="flex flex-col items-center w-full gap-6">
                <div className="relative cursor-pointer"><div className="w-10 h-10 rounded-full bg-[#1C6EFF] text-white flex items-center justify-center text-sm font-medium shadow-md">张三</div><div className="absolute -bottom-1 -right-1 bg-[#37405B] rounded-full w-4 h-4 flex items-center justify-center"><div className="w-3 h-3 bg-[#00D26A] rounded-full border border-[#37405B] flex items-center justify-center"><span className="text-white text-[8px] leading-none select-none">✓</span></div></div></div>
                <nav className="w-full flex flex-col mt-2">
                  <div onClick={()=>setRoute('home')} className={`w-full flex flex-col items-center py-3 cursor-pointer transition-colors ${route==='home'?'bg-[#1C6EFF]':'hover:bg-white/10'}`}><img src={ASSETS+'panel-nav-home.png'} className="w-[22px] h-[22px] mb-1.5"/><span className={`text-[11px] ${route==='home'?'text-white':'text-[#8D95A3]'}`}>首页</span></div>
                  <div onClick={()=>setRoute('workspace')} className={`w-full flex flex-col items-center py-3 cursor-pointer transition-colors ${route==='workspace'?'bg-[#1C6EFF]':'hover:bg-white/10'}`}><img src={ASSETS+'panel-nav-workspace.png'} className="w-[22px] h-[22px] mb-1.5"/><span className={`text-[11px] ${route==='workspace'?'text-white':'text-[#8D95A3]'}`}>工作台</span></div>
                  <div onClick={()=>setRoute('settings')} className={`w-full flex flex-col items-center py-3 cursor-pointer transition-colors ${route==='settings'?'bg-[#1C6EFF]':'hover:bg-white/10'}`}><img src={ASSETS+'panel-nav-settings.png'} className="w-[22px] h-[22px] mb-1.5"/><span className={`text-[11px] ${route==='settings'?'text-white':'text-[#8D95A3]'}`}>设置</span></div>
                </nav>
              </div>
              <div className="relative w-full flex justify-center" ref={menuRef}>
                <div onClick={()=>setShowMoreMenu(!showMoreMenu)} className={`w-[64px] py-4 flex items-center justify-center cursor-pointer transition-colors ${showMoreMenu?'bg-white/10':'hover:bg-white/10'}`}><SvgMenu size={20} className="text-white"/></div>
                {showMoreMenu && (
                  <div className="absolute left-[66px] bottom-0 w-[140px] bg-white rounded-md shadow-lg py-2 border border-gray-100 z-[100]">
                    <div onClick={()=>{setRoute('profile');setShowMoreMenu(false);}} className="px-4 py-2.5 hover:bg-[#F5F6F9] cursor-pointer flex items-center gap-3 text-[#2F3540]"><SvgUser s={16}/><span className="text-[13px]">个人信息</span></div>
                    <div onClick={()=>{setRoute('permissions');setShowMoreMenu(false);}} className="px-4 py-2.5 hover:bg-[#F5F6F9] cursor-pointer flex items-center gap-3 text-[#2F3540]"><SvgShield s={16}/><span className="text-[13px]">申请权限</span></div>
                    <div onClick={()=>{setRoute('terminal');setShowMoreMenu(false);}} className="px-4 py-2.5 hover:bg-[#F5F6F9] cursor-pointer flex items-center gap-3 text-[#2F3540]"><SvgMonitor s={16}/><span className="text-[13px]">终端管理</span></div>
                    <div className="h-px bg-gray-100 my-1"/>
                    <div onClick={()=>{setShowLogoutModal(true);setShowMoreMenu(false);}} className="px-4 py-2.5 hover:bg-[#F5F6F9] cursor-pointer flex items-center gap-3 text-[#2F3540]"><SvgLogout s={16}/><span className="text-[13px]">注销登录</span></div>
                  </div>
                )}
              </div>
            </aside>
            <main className="flex-1 bg-[#F5F7FA] relative flex flex-col overflow-hidden">
              <WinCtrl onClose={onClose}/>

              {/* ---- 首页 Home ---- */}
              {route === 'home' && (
                <div className="absolute inset-0 bg-cover bg-center overflow-hidden" style={{backgroundImage: `url('${ASSETS}panel-home-bg.jpg')`}}>
                  <img src={ASSETS+'panel-home-3dwifi.png'} className="absolute z-0 pointer-events-none" style={{ width: '260px', height: '180px', right: '75px', top: '61px', objectFit: 'contain', transform: 'scale(1.2)', transformOrigin: 'top right' }}/>
                  <div className="px-[24px] py-8 pb-10 relative">
                    <div className="flex items-center gap-4 mb-6 pr-[140px]">
                      <h1 className="text-[18px] font-medium text-[#2F3540]">欢迎使用工作台</h1>
                      <div className="flex items-center px-3 py-0.5 gap-1 rounded-full bg-white border border-gray-100 shadow-sm">
                        <img src={ASSETS+'panel-status-pill.png'} className="w-4 h-4 shrink-0"/><span className="text-[#2F3540] text-[12px]">互联网安全访问已连接</span>
                      </div>
                    </div>
                    <div className="h-[140px] relative overflow-visible mb-2 flex flex-col justify-center ml-[64px]">
                      <h2 className="text-[22px] font-semibold text-[#2F3540] mb-4">办公网络已连接</h2>
                      <div className="flex items-center gap-6 text-[13px] text-gray-500 px-4 py-1.5 w-fit bg-white/70 border border-white rounded-full shadow-[4px_4px_12px_rgba(28,110,255,0.12)]">
                        <div className="flex items-center gap-1.5"><img src={ASSETS+'panel-speed-up.png'} className="w-3.5 h-3.5"/><span className="font-semibold text-[#2F3540] text-[15px]">170</span><span className="text-[12px] mt-0.5">B/s</span></div>
                        <div className="flex items-center gap-1.5"><img src={ASSETS+'panel-speed-down.png'} className="w-3.5 h-3.5"/><span className="font-semibold text-[#2F3540] text-[15px]">159</span><span className="text-[12px] mt-0.5">B/s</span></div>
                        <button onClick={()=>setShowDetailDrawer(true)} className="text-[#1C6EFF] hover:underline ml-2">详情</button>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-[396px] h-[306px] bg-white rounded shadow-sm relative p-4 bg-cover bg-center" style={{backgroundImage:`url('${ASSETS}panel-card-common-bg.png')`}}>
                        <h3 className="text-[15px] font-bold text-[#2F3540] mb-6">常用应用</h3>
                        <div className="grid grid-cols-3 gap-y-6 px-4">
                          {allApps.filter(a=>a.isFavorite).slice(0, 5).map((a,i)=>(<div key={i} className={`flex flex-col items-center gap-2 cursor-pointer hover:-translate-y-1 transition-transform ${getJustifyClass(i)}`}><img src={ASSETS+'application.svg'} className="w-[56px] h-[56px] object-contain"/><span className="text-[13px] text-[#2F3540] whitespace-nowrap">{a.name}</span></div>))}
                          <div className={`relative group flex flex-col items-center w-[72px] z-50 ${getJustifyClass(allApps.filter(a=>a.isFavorite).length)}`}>
                            <div className="flex flex-col items-center gap-2 cursor-pointer" onClick={() => setRoute('workspace')}>
                              <div className="w-[56px] h-[56px] rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-300 text-2xl group-hover:border-gray-300 group-hover:text-gray-400">+</div>
                              <span className="text-[13px] text-gray-400">添加常用应用</span>
                            </div>
                            <div className="absolute left-1/2 -translate-x-1/2 bottom-[82px] w-[160px] bg-white rounded-md shadow-lg border border-gray-100 py-2 px-3 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-1 transition-all pointer-events-none text-center">
                               <div className="text-[12px] text-[#2F3540]">前往工作台添加常用应用</div>
                               <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white transform rotate-45 border-r border-b border-gray-100"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="w-[396px] h-[306px] bg-white rounded shadow-sm relative p-4 bg-cover bg-center" style={{backgroundImage:`url('${ASSETS}panel-card-shortcut-bg.png')`}}>
                        <h3 className="text-[15px] font-bold text-[#2F3540] mb-6">快捷入口</h3>
                        <div className="grid grid-cols-3 gap-y-6 px-4">
                          {[
                            { name: "软件商城", icon: "sc-store.png", route: 'store' },
                            { name: "申请权限", icon: "sc-perms.png", route: 'permissions' },
                            { name: "诊断修复", icon: "sc-diag.png", route: '' },
                          ].map((s,i)=>(<div key={i} onClick={()=>s.route && setRoute(s.route)} className={`flex flex-col items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity ${getJustifyClass(i)}`}><img src={ASSETS+s.icon} className="w-[56px] h-[56px] object-contain"/><span className="text-[12px] text-[#2F3540] whitespace-nowrap">{s.name}</span></div>))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ---- 工作台 Workspace ---- */}
              {route === 'workspace' && (
                <div className="absolute inset-0 bg-cover bg-center overflow-hidden flex flex-col" style={{backgroundImage:`url('${ASSETS}panel-workspace-bg.png')`}}>
                  <div className="px-[40px] pt-[32px] shrink-0">
                    <div className="flex items-center justify-between mb-8">
                      <h1 className="text-[20px] font-bold text-[#2F3540]">欢迎使用工作台</h1>
                      <div className="flex items-center gap-3">
                        <div className="w-[220px] h-[32px] bg-white rounded flex items-center px-3 border border-gray-200"><SvgSearch size={14} className="text-gray-400 mr-2"/><input placeholder="请输入应用名/描述/访问地址" className="flex-1 outline-none text-[12px] bg-transparent"/></div>
                        <div className="flex bg-white border border-gray-200 rounded overflow-hidden">
                          <div className="px-2 py-1.5 text-gray-400 hover:bg-gray-50 cursor-pointer"><SvgList size={14}/></div>
                          <div className="px-2 py-1.5 bg-[#1C6EFF] text-white cursor-pointer"><SvgGrid size={14}/></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 flex overflow-hidden">
                    <div className="w-[140px] pl-[40px] flex flex-col gap-[12px] shrink-0 border-r border-gray-200">
                      {[
                        {id:'common', name:'常用应用'},
                        {id:'it-test', name:'IT部应用系统-测试'},
                        {id:'it-prod', name:'IT部应用系统-生产'},
                        {id:'w3', name:'w3应用'},
                        {id:'cs', name:'长沙内网资源'},
                        {id:'default', name:'默认分类'}
                      ].map(cat => (
                        <div key={cat.id} onClick={() => { setActiveCategory(cat.id); document.getElementById('ws-cat-' + cat.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }} title={cat.name} className={`relative h-[20px] flex items-center text-[14px] cursor-pointer transition-colors pr-4 ${activeCategory === cat.id ? 'text-[#1C6EFF] font-medium' : 'text-[#6F7785]'}`}>
                          <span className="truncate block w-full">{cat.name}</span>
                          {activeCategory === cat.id && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-[12px] bg-[#1C6EFF] rounded-full"/>}
                        </div>
                      ))}
                    </div>
                    <div className="flex-1 overflow-y-auto pb-10 custom-scrollbar scroll-smooth">
                      {[
                        {id:'common', title:'常用应用', apps: allApps.filter(a => a.isFavorite)},
                        {id:'it-test', title:'IT部应用系统-测试', apps: allApps.filter(a => a.category === 'it-test')},
                        {id:'it-prod', title:'IT部应用系统-生产', apps: allApps.filter(a => a.category === 'it-prod')},
                        {id:'w3', title:'w3应用', apps: allApps.filter(a => a.category === 'w3')},
                      ].map(group => (
                        <div key={group.id} id={'ws-cat-' + group.id} className="mb-10">
                          <h2 className="text-[14px] font-bold text-[#2F3540] h-[32px] flex items-center pl-[24px] mb-1">{group.title}</h2>
                          <div className="grid grid-cols-4 gap-x-4 gap-y-6 pl-[40px] pt-[4px]">
                            {group.apps.map((app) => (
                              <div key={app.id} className="w-[100px] h-[82px] flex flex-col items-center relative group cursor-pointer">
                                <div className="w-[56px] h-[56px] bg-white rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex items-center justify-center relative group-hover:-translate-y-0.5 transition-transform">
                                  <img src={ASSETS + 'application.svg'} className="w-[28px] h-[28px]"/>
                                  <div onClick={(e) => { e.stopPropagation(); toggleFavorite(app.id); }} className={`absolute -top-1 -right-1 transition-opacity cursor-pointer ${app.isFavorite ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill={app.isFavorite ? "#FFB800" : "none"} stroke="#FFB800" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                                  </div>
                                </div>
                                <div className="absolute bottom-0 w-[100px] h-[20px] flex items-center justify-center"><span className="text-[12px] text-[#2F3540] text-center truncate px-1">{app.name}</span></div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </main>
          </div>
        )}
      </div>
    </div>
  );
}
