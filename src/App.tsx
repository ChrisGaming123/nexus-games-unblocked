/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Play, X, Gamepad2, TrendingUp, Clock, Star, LayoutGrid, Ghost } from 'lucide-react';
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
    setLoadingStatus('Connecting...');
    setTimeout(() => setLoadingStatus('Establishing Tunnel...'), 1000);
    setTimeout(() => setLoadingStatus('Ready'), 2500);
  };

  const navItems = [
    { name: 'Home', icon: LayoutGrid },
    { name: 'Trending', icon: TrendingUp },
    { name: 'New Releases', icon: Clock },
    { name: 'Favorites', icon: Star },
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
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] uppercase text-text-dim font-bold tracking-[1.5px] mb-4">Categories</h3>
            <ul className="space-y-2">
              {['Horror', 'Strategy', 'Action', 'Puzzle', 'Racing', 'Platformer', 'Sports'].map((cat) => (
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
        <main className="flex-1 overflow-y-auto p-8">
          <AnimatePresence mode="wait">
            {!selectedGame ? (
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

                <div className={`flex-1 bg-panel-bg rounded-2xl border border-border-custom overflow-hidden shadow-2xl relative min-h-[400px] ${theaterMode ? 'fixed inset-0 z-[100] rounded-0 border-none' : ''}`}>
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
                    <iframe 
                      src={useAltMirror && selectedGame.altEmbedUrl ? selectedGame.altEmbedUrl : selectedGame.embedUrl} 
                      className="w-full h-full border-none bg-black"
                      title={selectedGame.title}
                      allow="autoplay; fullscreen; keyboard; gamepad; pointer-lock"
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-pointer-lock"
                      allowFullScreen
                      referrerPolicy="no-referrer"
                    />
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
