
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { GENRES, LANGUAGES, SETTINGS, THEMES, TIME_PERIODS, ART_STYLES, Persona } from '../types';

interface SetupProps {
    show: boolean;
    isTransitioning: boolean;
    hero: Persona | null;
    friend: Persona | null;
    seriesName: string;
    totalIssues: number;
    selectedGenre: string;
    selectedSetting: string;
    selectedTheme: string;
    selectedTimePeriod: string;
    selectedArtStyle: string;
    selectedLanguage: string;
    customPremise: string;
    customSetting: string;
    richMode: boolean;
    onHeroUpload: (file: File) => void;
    onFriendUpload: (file: File) => void;
    onSeriesNameChange: (val: string) => void;
    onTotalIssuesChange: (val: number) => void;
    onGenreChange: (val: string) => void;
    onSettingChange: (val: string) => void;
    onThemeChange: (val: string) => void;
    onTimePeriodChange: (val: string) => void;
    onArtStyleChange: (val: string) => void;
    onLanguageChange: (val: string) => void;
    onPremiseChange: (val: string) => void;
    onCustomSettingChange: (val: string) => void;
    onRichModeChange: (val: boolean) => void;
    onLaunch: () => void;
    onBackToSeries?: () => void;
}

const Footer = () => {
  const [remixIndex, setRemixIndex] = useState(0);
  const remixes = [
    "Add sounds to panels",
    "Animate panels with Veo 3",
    "Localize to Klingon",
    "Add a villain generator",
    "Print physical copies",
    "Add voice narration",
    "Create a shared universe"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setRemixIndex(prev => (prev + 1) % remixes.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black text-white py-3 px-6 flex flex-col md:flex-row justify-between items-center z-[300] border-t-4 border-yellow-400 font-comic">
        <div className="flex items-center gap-2 text-lg md:text-xl">
            <span className="text-yellow-400 font-bold">REMIX IDEA:</span>
            <span className="animate-pulse">{remixes[remixIndex]}</span>
        </div>
        <div className="flex items-center gap-4 mt-2 md:mt-0">
            <span className="text-gray-500 text-sm hidden md:inline">Build with Gemini</span>
            <a href="https://x.com/salahboussettah" target="_blank" rel="noopener noreferrer" className="text-white hover:text-yellow-400 transition-colors text-xl">Created by @salah</a>
        </div>
    </div>
  );
};

export const Setup: React.FC<SetupProps> = (props) => {
    if (!props.show && !props.isTransitioning) return null;

    return (
        <>
        <style>{`
             @keyframes knockout-exit {
                0% { transform: scale(1) rotate(1deg); }
                15% { transform: scale(1.1) rotate(-5deg); }
                100% { transform: translateY(-200vh) rotate(1080deg) scale(0.5); opacity: 1; }
             }
             @keyframes pow-enter {
                 0% { transform: translate(-50%, -50%) scale(0) rotate(-45deg); opacity: 0; }
                 30% { transform: translate(-50%, -50%) scale(1.5) rotate(10deg); opacity: 1; }
                 100% { transform: translate(-50%, -50%) scale(1.8) rotate(0deg); opacity: 0; }
             }
          `}</style>
        {props.isTransitioning && (
            <div className="fixed top-1/2 left-1/2 z-[210] pointer-events-none" style={{ animation: 'pow-enter 1s forwards ease-out' }}>
                <svg viewBox="0 0 200 150" className="w-[500px] h-[400px] drop-shadow-[0_10px_0_rgba(0,0,0,0.5)]">
                    <path d="M95.7,12.8 L110.2,48.5 L148.5,45.2 L125.6,74.3 L156.8,96.8 L119.4,105.5 L122.7,143.8 L92.5,118.6 L60.3,139.7 L72.1,103.2 L34.5,108.8 L59.9,79.9 L24.7,57.3 L62.5,54.4 L61.2,16.5 z" fill="#FFD700" stroke="black" strokeWidth="4"/>
                    <text x="100" y="95" textAnchor="middle" fontFamily="'Bangers', cursive" fontSize="70" fill="#DC2626" stroke="black" strokeWidth="2" transform="rotate(-5 100 75)">POW!</text>
                </svg>
            </div>
        )}
        
        <div className={`fixed inset-0 z-[200] overflow-y-auto`}
             style={{
                 background: props.isTransitioning ? 'transparent' : 'rgba(0,0,0,0.85)', 
                 backdropFilter: props.isTransitioning ? 'none' : 'blur(6px)',
                 animation: props.isTransitioning ? 'knockout-exit 1s forwards cubic-bezier(.6,-0.28,.74,.05)' : 'none',
                 pointerEvents: props.isTransitioning ? 'none' : 'auto'
             }}>
          <div className="min-h-full flex items-center justify-center p-4 pb-32 md:pb-24">
            {/* Expanded width for more options */}
            <div className="max-w-[1200px] w-full bg-white p-4 md:p-5 rotate-1 border-[6px] border-black shadow-[12px_12px_0px_rgba(0,0,0,0.6)] text-center relative">

                {props.onBackToSeries && (
                    <button
                        onClick={props.onBackToSeries}
                        className="absolute top-4 left-4 comic-btn bg-gray-600 text-white text-sm px-3 py-2 hover:bg-gray-500 uppercase"
                    >
                        ← Back to Series
                    </button>
                )}

                <h1 className="font-comic text-5xl text-red-600 leading-none mb-1 tracking-wide inline-block mr-3" style={{textShadow: '2px 2px 0px black'}}>INFINITE</h1>
                <h1 className="font-comic text-5xl text-yellow-400 leading-none mb-4 tracking-wide inline-block" style={{textShadow: '2px 2px 0px black'}}>HEROES</h1>

                {/* Series Name and Issue Count */}
                <div className="mb-4 text-left bg-gradient-to-r from-red-50 to-yellow-50 p-3 border-4 border-black">
                    <div className="flex flex-col md:flex-row gap-3">
                        <div className="flex-1">
                            <p className="font-comic text-base mb-1 font-bold text-gray-800">SERIES NAME</p>
                            <input
                                type="text"
                                value={props.seriesName}
                                onChange={(e) => props.onSeriesNameChange(e.target.value)}
                                placeholder="e.g., Dark Knights Chronicles"
                                className="w-full font-comic text-lg p-2 border-2 border-black bg-white shadow-[3px_3px_0px_rgba(0,0,0,0.2)] focus:outline-none focus:translate-x-[1px] focus:translate-y-[1px] focus:shadow-none transition-all"
                            />
                        </div>
                        <div className="w-full md:w-48">
                            <p className="font-comic text-base mb-1 font-bold text-gray-800">TOTAL ISSUES</p>
                            <select
                                value={props.totalIssues}
                                onChange={(e) => props.onTotalIssuesChange(Number(e.target.value))}
                                className="w-full font-comic text-lg p-2 border-2 border-black bg-white cursor-pointer shadow-[3px_3px_0px_rgba(0,0,0,0.2)] focus:outline-none"
                            >
                                {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n} Issue{n > 1 ? 's' : ''}</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-4 mb-4 text-left">
                    
                    {/* Left Column: Cast */}
                    <div className="flex-1 flex flex-col gap-2">
                        <div className="font-comic text-xl text-black border-b-4 border-black mb-1">1. THE CAST</div>
                        
                        {/* HERO UPLOAD */}
                        <div className={`p-3 border-4 border-dashed ${props.hero ? 'border-green-500 bg-green-50' : 'border-blue-300 bg-blue-50'} transition-colors relative group`}>
                            <div className="flex justify-between items-center mb-1">
                                <p className="font-comic text-lg uppercase font-bold text-blue-900">HERO (REQUIRED)</p>
                                {props.hero && <span className="text-green-600 font-bold font-comic text-sm animate-pulse">✓ READY</span>}
                            </div>
                            
                            {props.hero ? (
                                <div className="flex gap-3 items-center mt-1">
                                     <img src={`data:image/jpeg;base64,${props.hero.base64}`} alt="Hero Preview" className="w-20 h-20 object-cover border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,0.2)] bg-white rotate-[-2deg]" />
                                     <label className="cursor-pointer comic-btn bg-yellow-400 text-black text-sm px-3 py-1 hover:bg-yellow-300 transition-transform active:scale-95 uppercase">
                                         REPLACE
                                         <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && props.onHeroUpload(e.target.files[0])} />
                                     </label>
                                </div>
                            ) : (
                                <label className="comic-btn bg-blue-500 text-white text-lg px-3 py-3 block w-full hover:bg-blue-400 cursor-pointer text-center">
                                    UPLOAD HERO 
                                    <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && props.onHeroUpload(e.target.files[0])} />
                                </label>
                            )}
                        </div>

                        {/* CO-STAR UPLOAD */}
                        <div className={`p-3 border-4 border-dashed ${props.friend ? 'border-green-500 bg-green-50' : 'border-purple-300 bg-purple-50'} transition-colors`}>
                            <div className="flex justify-between items-center mb-1">
                                <p className="font-comic text-lg uppercase font-bold text-purple-900">CO-STAR (OPTIONAL)</p>
                                {props.friend && <span className="text-green-600 font-bold font-comic text-sm animate-pulse">✓ READY</span>}
                            </div>

                            {props.friend ? (
                                <div className="flex gap-3 items-center mt-1">
                                    <img src={`data:image/jpeg;base64,${props.friend.base64}`} alt="Co-Star Preview" className="w-20 h-20 object-cover border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,0.2)] bg-white rotate-[2deg]" />
                                    <label className="cursor-pointer comic-btn bg-yellow-400 text-black text-sm px-3 py-1 hover:bg-yellow-300 transition-transform active:scale-95 uppercase">
                                        REPLACE
                                        <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && props.onFriendUpload(e.target.files[0])} />
                                    </label>
                                </div>
                            ) : (
                                <label className="comic-btn bg-purple-500 text-white text-lg px-3 py-3 block w-full hover:bg-purple-400 cursor-pointer text-center">
                                    UPLOAD CO-STAR 
                                    <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && props.onFriendUpload(e.target.files[0])} />
                                </label>
                            )}
                        </div>
                        
                        {/* Privacy Policy Text */}
                        <p className="text-[10px] text-gray-500 leading-tight mt-1 px-1">
                            The Prohibited Use Policy applies. Do not generate content that infringes on others' privacy rights.
                        </p>
                    </div>

                    {/* Right Column: Story Settings */}
                    <div className="flex-1 flex flex-col gap-2">
                        <div className="font-comic text-xl text-black border-b-4 border-black mb-1">2. THE STORY</div>

                        <div className="bg-yellow-50 p-3 border-4 border-black flex flex-col gap-2">
                            {/* Genre and Language Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                <div>
                                    <p className="font-comic text-sm mb-1 font-bold text-gray-800">GENRE</p>
                                    <select value={props.selectedGenre} onChange={(e) => props.onGenreChange(e.target.value)} className="w-full font-comic text-base p-1 border-2 border-black bg-white cursor-pointer shadow-[2px_2px_0px_rgba(0,0,0,0.2)]">
                                        {GENRES.map(g => <option key={g} value={g}>{g}</option>)}
                                    </select>
                                </div>

                                <div>
                                    <p className="font-comic text-sm mb-1 font-bold text-gray-800">LANGUAGE</p>
                                    <select value={props.selectedLanguage} onChange={(e) => props.onLanguageChange(e.target.value)} className="w-full font-comic text-base p-1 border-2 border-black bg-white cursor-pointer shadow-[2px_2px_0px_rgba(0,0,0,0.2)]">
                                        {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}
                                    </select>
                                </div>
                            </div>

                            {/* Setting and Theme Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                <div>
                                    <p className="font-comic text-sm mb-1 font-bold text-gray-800">SETTING</p>
                                    <select value={props.selectedSetting} onChange={(e) => props.onSettingChange(e.target.value)} className="w-full font-comic text-base p-1 border-2 border-black bg-white cursor-pointer shadow-[2px_2px_0px_rgba(0,0,0,0.2)]">
                                        {SETTINGS.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>

                                <div>
                                    <p className="font-comic text-sm mb-1 font-bold text-gray-800">THEME</p>
                                    <select value={props.selectedTheme} onChange={(e) => props.onThemeChange(e.target.value)} className="w-full font-comic text-base p-1 border-2 border-black bg-white cursor-pointer shadow-[2px_2px_0px_rgba(0,0,0,0.2)]">
                                        {THEMES.map(t => <option key={t} value={t}>{t}</option>)}
                                    </select>
                                </div>
                            </div>

                            {/* Time Period and Art Style Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                <div>
                                    <p className="font-comic text-sm mb-1 font-bold text-gray-800">TIME PERIOD</p>
                                    <select value={props.selectedTimePeriod} onChange={(e) => props.onTimePeriodChange(e.target.value)} className="w-full font-comic text-base p-1 border-2 border-black bg-white cursor-pointer shadow-[2px_2px_0px_rgba(0,0,0,0.2)]">
                                        {TIME_PERIODS.map(t => <option key={t} value={t}>{t}</option>)}
                                    </select>
                                </div>

                                <div>
                                    <p className="font-comic text-sm mb-1 font-bold text-gray-800">ART STYLE</p>
                                    <select value={props.selectedArtStyle} onChange={(e) => props.onArtStyleChange(e.target.value)} className="w-full font-comic text-base p-1 border-2 border-black bg-white cursor-pointer shadow-[2px_2px_0px_rgba(0,0,0,0.2)]">
                                        {ART_STYLES.map(a => <option key={a} value={a}>{a}</option>)}
                                    </select>
                                </div>
                            </div>

                            {/* Custom Premise/Setting */}
                            {props.selectedGenre === 'Custom' && (
                                <div>
                                    <p className="font-comic text-sm mb-1 font-bold text-gray-800">CUSTOM PREMISE</p>
                                    <textarea value={props.customPremise} onChange={(e) => props.onPremiseChange(e.target.value)} placeholder="Describe your unique story..." className="w-full p-2 border-2 border-black font-comic text-base h-16 resize-none shadow-[2px_2px_0px_rgba(0,0,0,0.2)]" />
                                </div>
                            )}

                            {props.selectedSetting === 'Custom' && (
                                <div>
                                    <p className="font-comic text-sm mb-1 font-bold text-gray-800">CUSTOM SETTING</p>
                                    <input type="text" value={props.customSetting} onChange={(e) => props.onCustomSettingChange(e.target.value)} placeholder="Describe the world/location..." className="w-full p-2 border-2 border-black font-comic text-base shadow-[2px_2px_0px_rgba(0,0,0,0.2)]" />
                                </div>
                            )}

                            {/* Novel Mode Toggle */}
                            <label className="flex items-center gap-2 font-comic text-sm cursor-pointer text-black p-2 hover:bg-yellow-100 rounded border-2 border-transparent hover:border-yellow-300 transition-colors">
                                <input type="checkbox" checked={props.richMode} onChange={(e) => props.onRichModeChange(e.target.checked)} className="w-4 h-4 accent-black" />
                                <span className="text-black font-bold">NOVEL MODE (Detailed Narrative)</span>
                            </label>
                        </div>
                    </div>
                </div>

                <button onClick={props.onLaunch} disabled={!props.hero || !props.seriesName.trim() || props.isTransitioning} className="comic-btn bg-red-600 text-white text-3xl px-6 py-3 w-full hover:bg-red-500 disabled:bg-gray-400 disabled:cursor-not-allowed uppercase tracking-wider">
                    {props.isTransitioning ? 'LAUNCHING...' : 'START ADVENTURE!'}
                </button>
            </div>
          </div>
        </div>

        {/* Footer is only visible when setup is active */}
        <Footer />
        </>
    );
}
