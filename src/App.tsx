/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Play, X, Gamepad2, TrendingUp, Clock, Star, LayoutGrid, Ghost, Globe, Bot, Send, User, Sparkles, Brain, Calculator, MessageSquare, ExternalLink, RefreshCw } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { GAMES_DATA, type Game } from './games';
import Game2048 from './components/Game2048';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [activeTab, setActiveTab] = useState('Home');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [theaterMode, setTheaterMode] = useState(false);
  const [useAltMirror, setUseAltMirror] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState('Idle');
  const [proxyQuery, setProxyQuery] = useState('');
  const [proxyUrl, setProxyUrl] = useState<string | null>(null);
  const [browserInput, setBrowserInput] = useState('');
  
  // AI Chat State
  const [aiMessage, setAiMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'ai', content: string }[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '`') {
        window.location.href = 'https://google.com';
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredGames = useMemo(() => {
    return GAMES_DATA.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          game.genre.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || game.genre.toLowerCase() === selectedCategory.toLowerCase();
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleGameSelect = (game: Game) => {
    setSelectedGame(game);
    setTheaterMode(false); 
    setUseAltMirror(false);
    setActiveTab('Home'); // Ensure context switch back to home view for game player
    setLoadingStatus('Connecting...');
    setTimeout(() => setLoadingStatus('Establishing Tunnel...'), 1000);
    setTimeout(() => setLoadingStatus('Ready'), 2500);
  };

  const handleAiSearch = async () => {
    if (!aiMessage.trim() || isAiLoading) return;
    
    const userMsg = aiMessage.trim();
    setAiMessage('');
    setChatHistory(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsAiLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: userMsg,
        config: {
          systemInstruction: "You are the Nexus Study Assistant, an advanced AI integrated into the NexusGames arcade. You excel at math, logical reasoning, and solving study problems. Provide concise but helpful answers. Format mathematical expressions clearly.",
        }
      });
      
      const aiText = response.text || "I'm having trouble thinking right now. Please try again.";
      setChatHistory(prev => [...prev, { role: 'ai', content: aiText }]);
    } catch (error) {
      console.error("AI Error:", error);
      setChatHistory(prev => [...prev, { role: 'ai', content: "Error: Failed to connect to the Nexus AI Core. Please check your network connection or try again later." }]);
    } finally {
      setIsAiLoading(false);
    }
  };

  const navItems = [
    { name: 'Home', icon: LayoutGrid },
    { name: 'Trending', icon: TrendingUp },
    { name: 'New Releases', icon: Clock },
    { name: 'Favorites', icon: Star },
    { name: 'Study AI', icon: Bot },
  ];

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-bg-dark text-text-main font-sans">
      {/* Top Nav */}
      <nav className="h-[70px] bg-panel-bg border-b border-border-custom flex items-center px-8 justify-between shrink-0 z-50">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => { 
            setSelectedGame(null); 
            setActiveTab('Home'); 
            setTheaterMode(false); 
            setSelectedCategory(null);
            setSearchQuery('');
          }}
        >
          <div className="w-8 h-8 bg-linear-to-br from-accent-green to-blue-600 rounded-md group-hover:scale-110 transition-transform" />
          <h1 className="text-xl font-extrabold uppercase tracking-wider text-accent-green">
            NexusGames
          </h1>
        </div>

        <div className="relative flex-1 max-w-[400px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim" />
          <input 
            type="text" 
            placeholder="Search games (Granny, FNAF, 2048...)"
            className="w-full bg-bg-dark border border-border-custom px-10 py-2.5 rounded-full text-sm outline-none focus:border-accent-green transition-colors placeholder:text-text-dim/50"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSelectedCategory(null);
            }}
          />
        </div>

        <div className="flex items-center gap-4">
          <a 
            href="https://discord.gg/3DhevZH8" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-lg transition-all text-sm font-bold shadow-lg shadow-indigo-500/20"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993.023.032.061.047.085.028a19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.086 2.176 2.419 0 1.334-.966 2.419-2.176 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.086 2.176 2.419 0 1.334-.946 2.419-2.176 2.419z"/>
            </svg>
            Discord
          </a>

          <div className="relative hidden lg:block group">
            <Globe className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${proxyQuery ? 'text-accent-green' : 'text-text-dim'}`} />
            <input 
              type="text" 
              placeholder="Proxy Search (Google, YT...)"
              className="w-[220px] bg-bg-dark border border-border-custom px-9 py-2 rounded-lg text-xs outline-none focus:border-accent-green transition-all placeholder:text-text-dim/50 focus:w-[280px]"
              value={proxyQuery}
              onChange={(e) => setProxyQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && proxyQuery) {
                  const url = `/api/proxy?url=${encodeURIComponent(`https://www.google.com/search?q=${proxyQuery}`)}`;
                  setProxyUrl(url);
                  setBrowserInput(proxyQuery); // Show actual query in bar
                  setSelectedGame(null);
                  setActiveTab('Browser');
                  setProxyQuery('');
                }
              }}
            />
            <div className="absolute -bottom-10 right-0 bg-panel-bg border border-border-custom p-2 rounded shadow-2xl opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none transform translate-y-2 group-focus-within:translate-y-0 z-50">
              <span className="text-[10px] text-accent-green font-bold uppercase whitespace-nowrap">Press Enter to Tunnel Search</span>
            </div>
          </div>

          <div className="text-right hidden sm:block">
            <div className="text-sm font-semibold">Guest Player</div>
            <div className="text-[11px] text-accent-green font-bold">1,240 XP Earned</div>
          </div>
          <div className="w-9 h-9 bg-border-custom rounded-full border-2 border-accent-green flex items-center justify-center">
            <Gamepad2 className="w-5 h-5 text-accent-green" />
          </div>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-[220px] bg-panel-bg border-r border-border-custom p-5 flex flex-col gap-8 shrink-0 hidden md:flex">
          <div>
            <h3 className="text-[11px] uppercase text-text-dim font-bold tracking-[1.5px] mb-4">Main Menu</h3>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li 
                  key={item.name}
                  onClick={() => {
                    setActiveTab(item.name);
                    setSelectedCategory(null);
                    setSearchQuery('');
                  }}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-sm transition-all ${
                    activeTab === item.name && !selectedCategory
                      ? 'bg-accent-green/10 text-accent-green font-bold' 
                      : 'text-text-dim hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </li>
              ))}
              {proxyUrl && (
                <li 
                  onClick={() => {
                    setActiveTab('Browser');
                    setSelectedCategory(null);
                    setSelectedGame(null);
                  }}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-sm transition-all ${
                    activeTab === 'Browser' 
                      ? 'bg-accent-green/10 text-accent-green font-bold' 
                      : 'text-text-dim hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Globe className="w-4 h-4" />
                  Browser
                </li>
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] uppercase text-text-dim font-bold tracking-[1.5px] mb-4">Categories</h3>
            <ul className="space-y-2">
              {['Horror', 'RPG', 'Sandbox', 'Strategy', 'Action', 'Puzzle', 'Racing', 'Platformer', 'Sports'].map((cat) => (
                <li 
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(selectedCategory === cat ? null : cat);
                    setSelectedGame(null);
                    setSearchQuery('');
                  }
                  }
                  className={`px-3 py-2 rounded-lg cursor-pointer text-sm transition-all capitalize ${
                    selectedCategory === cat 
                      ? 'bg-accent-green/10 text-accent-green font-bold border border-accent-green/20' 
                      : 'text-text-dim hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {cat}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-auto">
            <div className="bg-white/[0.03] p-4 rounded-xl text-[11px] text-text-dim leading-relaxed border border-white/5">
              <span className="text-accent-green font-bold mb-1 block">Unblocked & Secure</span>
              Safe for School/Work networks. Encrypted tunnel enabled.
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-8 relative">
          <AnimatePresence mode="wait">
            {activeTab === 'Browser' && proxyUrl ? (
              <motion.div
                key="proxy-browser"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                className="h-full flex flex-col gap-4"
              >
                <div className="flex items-center justify-between bg-panel-bg p-3 rounded-xl border border-border-custom">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex gap-2">
                       <button 
                         onClick={() => { const ifr = document.querySelector('iframe'); if(ifr) ifr.src = ifr.src; }}
                         className="p-1 hover:bg-white/5 rounded text-text-dim transition-colors"
                         title="Refresh"
                       >
                         <RefreshCw className="w-3.5 h-3.5" />
                       </button>
                    </div>
                    <div className="flex-1 max-w-2xl relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-accent-green" />
                      <input 
                        type="text"
                        value={browserInput}
                        onChange={(e) => setBrowserInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            let url = browserInput.trim();
                            if (!url.startsWith('http')) {
                              url = `https://www.google.com/search?q=${encodeURIComponent(url)}`;
                            }
                            const proxiedUrl = `/api/proxy?url=${encodeURIComponent(url)}`;
                            setProxyUrl(proxiedUrl);
                            setBrowserInput(url);
                          }
                        }}
                        className="w-full bg-bg-dark border border-border-custom pl-9 pr-24 py-1.5 rounded-lg text-[12px] text-white outline-none focus:border-accent-green transition-all"
                      />
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                        <span className="text-[9px] uppercase font-black text-text-dim/50 tracking-tighter">Nexus Tunnel</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => window.open(proxyUrl, '_blank')}
                      className="flex items-center gap-2 px-3 py-1.5 bg-accent-green/10 border border-accent-green/20 rounded-lg text-accent-green hover:bg-accent-green/20 transition-all text-[11px] font-bold"
                      title="Open in New Tab (Bypass Frame Blocks)"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline uppercase">Breakout</span>
                    </button>
                    <button 
                      onClick={() => { setProxyUrl(null); setBrowserInput(''); }}
                      className="p-1.5 hover:bg-white/5 rounded-lg text-text-dim hover:text-accent-red transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="flex-1 bg-white rounded-2xl overflow-hidden border-4 border-border-custom shadow-2xl relative">
                   <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
                     <span className="bg-black/80 px-3 py-1 rounded-full text-[10px] text-text-dim border border-white/10 backdrop-blur-sm">
                       Note: Some sites block iframes. Use <b>BREAKOUT</b> to visit them.
                     </span>
                   </div>
                   <iframe 
                     src={proxyUrl}
                     className="w-full h-full"
                     title="Nexus Proxy Browser"
                     allow="autoplay; fullscreen; microphone; camera; midi; geolocation;"
                   />
                </div>
              </motion.div>
            ) : !selectedGame && activeTab === 'Study AI' ? (
              <motion.div
                key="study-ai"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                className="h-full flex flex-col gap-4"
              >
                <div className="flex flex-col gap-2 mb-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-accent-green/20 rounded-lg">
                      <Bot className="w-6 h-6 text-accent-green" />
                    </div>
                    <h2 className="text-2xl font-bold">Nexus AI <span className="text-accent-green">Study Hub</span></h2>
                  </div>
                  <p className="text-text-dim text-sm">Advanced AI learning assistant for complex math and logical reasoning.</p>
                </div>
                <div className="flex-1 bg-white rounded-2xl overflow-hidden border-4 border-border-custom shadow-2xl">
                  <iframe 
                    src="https://chatbot.getmindpal.com/nexus-ai-4cz"
                    className="w-full h-full"
                    title="Nexus AI Hub"
                  />
                </div>
              </motion.div>
            ) : !selectedGame ? (
              <motion.div 
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold flex items-center gap-3">
                    {searchQuery 
                      ? `Search Results for "${searchQuery}"` 
                      : selectedCategory 
                        ? `${selectedCategory} Games` 
                        : activeTab}
                    <span className="text-[14px] bg-accent-red px-2 py-0.5 rounded text-white uppercase font-bold tracking-tighter">Live Now</span>
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {filteredGames.map((game) => (
                    <motion.div
                      key={game.id}
                      onClick={() => handleGameSelect(game)}
                      className="group bg-panel-bg rounded-xl border border-border-custom overflow-hidden cursor-pointer hover:border-accent-green hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,255,163,0.15)] relative"
                    >
                      <div className="h-[140px] bg-zinc-900 flex items-center justify-center overflow-hidden relative">
                        <img 
                          src={game.thumbnail} 
                          alt={game.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-60 group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-panel-bg/80 to-transparent" />
                        <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded text-[10px] font-black tracking-tighter">
                          {Math.floor(Math.random() * 2 + 8)}.{Math.floor(Math.random() * 9)}/10
                        </div>
                      </div>

                      <div className="p-4">
                        <div className="text-base font-bold mb-1 line-clamp-1 group-hover:text-accent-green transition-colors">{game.title}</div>
                        <div className="flex justify-between items-center text-[12px] text-text-dim">
                          <span className={game.genre === 'Horror' ? 'text-accent-red font-bold' : 'text-accent-green font-bold'}>
                            {game.genre}
                          </span>
                          <span>{Math.floor(Math.random() * 5 + 1)}M Plays</span>
                        </div>
                        
                        <div className="h-1 bg-border-custom rounded-full mt-3 overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.floor(Math.random() * 40 + 60)}%` }}
                            className={`h-full ${game.genre === 'Horror' ? 'bg-accent-red' : 'bg-accent-green'}`}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="play"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="h-full flex flex-col gap-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => { setSelectedGame(null); setTheaterMode(false); }}
                      className="p-2 hover:bg-panel-bg border border-transparent hover:border-border-custom rounded-lg transition-all text-text-dim hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    <div>
                      <h2 className="text-xl font-bold uppercase tracking-tight">{selectedGame.title}</h2>
                      <p className="text-[11px] text-text-dim uppercase font-bold tracking-widest">{selectedGame.genre} // Nexus Verified</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => {
                        const iframe = document.querySelector('iframe');
                        if (iframe) iframe.src = iframe.src;
                        setLoadingStatus('Reconnecting...');
                        setTimeout(() => setLoadingStatus('Establishing Tunnel...'), 1000);
                        setTimeout(() => setLoadingStatus('Ready'), 2500);
                      }}
                      className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all text-text-dim hover:text-white flex items-center gap-2"
                      title="Force Reload Game"
                    >
                      <Clock className="w-3 h-3" />
                      <span className="text-[10px] uppercase font-bold">Reload Session</span>
                    </button>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-panel-bg border border-border-custom rounded-lg group">
                       <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                         loadingStatus === 'Ready' ? 'bg-accent-green shadow-[0_0_8px_#00ffa3]' : 'bg-yellow-400'
                       }`} />
                       <span className="text-[10px] uppercase font-bold text-text-dim group-hover:text-white transition-colors">
                         {loadingStatus === 'Ready' ? 'Secure Tunnel Active' : loadingStatus}
                       </span>
                    </div>
                  </div>
                </div>

                <div className={`flex-1 bg-panel-bg rounded-2xl border border-border-custom overflow-hidden shadow-2xl relative min-h-[400px] flex items-center justify-center ${theaterMode ? 'fixed inset-0 z-[100] rounded-0 border-none' : ''}`}>
                  {theaterMode && (
                    <button 
                      onClick={() => setTheaterMode(false)}
                      className="absolute top-4 right-4 z-[110] p-2 bg-black/60 hover:bg-black/90 text-white rounded-full transition-all border border-white/20"
                      title="Exit Theater Mode"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                  {selectedGame.isInternal ? (
                    <div className="w-full h-full flex items-center justify-center p-4">
                      <Game2048 />
                    </div>
                  ) : (
                    <div className={selectedGame.aspectRatio ? 'w-full relative' : 'w-full h-full'} style={selectedGame.aspectRatio ? { paddingBottom: `${(1 / eval(selectedGame.aspectRatio)) * 100}%`, height: 0 } : {}}>
                      <iframe 
                        src={useAltMirror && selectedGame.altEmbedUrl ? selectedGame.altEmbedUrl : selectedGame.embedUrl} 
                        className={`border-none bg-black ${selectedGame.aspectRatio ? 'absolute top-0 left-0 w-full h-full' : 'w-full h-full'}`}
                        title={selectedGame.title}
                        allow="autoplay; fullscreen; keyboard; gamepad; pointer-lock"
                        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-pointer-lock"
                        allowFullScreen
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}
                </div>

                <div className="p-5 bg-panel-bg/50 rounded-2xl border border-border-custom flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="space-y-1">
                    <h4 className="text-[10px] font-bold uppercase text-text-dim tracking-widest">Input Devices</h4>
                    <div className="flex gap-2 text-[10px] font-mono text-white">
                      <span className="bg-border-custom px-2 py-0.5 rounded">MOUSE</span>
                      <span className="bg-border-custom px-2 py-0.5 rounded">KEYBOARD</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {!selectedGame.isInternal && (
                      <a 
                        href={selectedGame.embedUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-5 py-2 bg-white/5 border border-white/10 text-white font-extrabold text-[11px] uppercase rounded-lg hover:bg-white/10 transition-all flex items-center gap-2"
                      >
                        <Play className="w-3 h-3" />
                        Launch Externally
                      </a>
                    )}
                    <button 
                      onClick={() => setTheaterMode(!theaterMode)}
                      className="px-5 py-2 bg-white/5 border border-white/10 text-white font-extrabold text-[11px] uppercase rounded-lg hover:bg-white/10 transition-all flex items-center gap-2"
                    >
                      <LayoutGrid className="w-3 h-3" />
                      {theaterMode ? 'Normal Mode' : 'Theater Mode'}
                    </button>
                    {selectedGame.altEmbedUrl && (
                      <button 
                        onClick={() => {
                          if (useAltMirror) {
                            setUseAltMirror(false);
                          } else {
                            setUseAltMirror(true);
                            alert("Attempting to connect via Secondary Tunnel. Please wait 10 seconds for decryption.");
                          }
                        }}
                        className={`px-5 py-2 border font-extrabold text-[11px] uppercase rounded-lg transition-all flex items-center gap-2 ${
                          useAltMirror 
                            ? 'bg-accent-red/20 border-accent-red text-accent-red shadow-[0_0_10px_rgba(255,62,62,0.2)]' 
                            : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                        }`}
                      >
                        <Ghost className="w-3 h-3" />
                        {useAltMirror ? 'Main Mirror' : 'Try Alt Mirror'}
                      </button>
                    )}
                    <button 
                      onClick={() => {
                        const elem = document.querySelector('iframe') || document.querySelector('.flex-1');
                        if (elem?.requestFullscreen) elem.requestFullscreen();
                      }}
                      className="px-5 py-2 bg-accent-green text-bg-dark font-extrabold text-[11px] uppercase rounded-lg hover:scale-105 transition-transform active:scale-95"
                    >
                      Fullscreen Game
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
