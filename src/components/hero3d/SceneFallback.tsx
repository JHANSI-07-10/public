'use client';

import React from 'react';
import { Database, Cloud, Layers, Terminal, Server, Globe } from 'lucide-react';

export const SceneFallback: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[440px] flex items-center justify-center p-6 relative select-none">
      <div className="relative w-full max-w-lg aspect-[4/3] rounded-2xl bg-[#121212]/90 border border-[#262626] p-6 shadow-2xl flex flex-col justify-between overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute inset-0 bg-radial-gradient from-[#c9a84c]/10 via-transparent to-transparent pointer-events-none" />

        {/* Top Floating App Card */}
        <div className="p-4 rounded-xl bg-[#181818] border border-[#2a2a2a] shadow-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#c9a84c]/10 border border-[#c9a84c]/30 flex items-center justify-center text-[#c9a84c]">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Frontend Web Client</div>
              <div className="text-[10px] font-mono text-[#c9a84c]">React 19 · Vite · Edge</div>
            </div>
          </div>
          <span className="text-[10px] font-mono font-bold text-[#22c55e] px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-500/30">
            ONLINE
          </span>
        </div>

        {/* Central Cloud Engine & Database Split */}
        <div className="grid grid-cols-2 gap-4 my-4">
          <div className="p-4 rounded-xl bg-[#161616] border border-[#c9a84c]/30 shadow-lg flex flex-col justify-between">
            <div className="w-8 h-8 rounded-lg bg-[#c9a84c]/10 flex items-center justify-center text-[#c9a84c] mb-2">
              <Cloud className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Cloud Architecture</div>
              <div className="text-[10px] text-[#888888]">Spring Boot Core</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#161616] border border-[#2a2a2a] shadow-lg flex flex-col justify-between">
            <div className="w-8 h-8 rounded-lg bg-[#c9a84c]/10 flex items-center justify-center text-[#c9a84c] mb-2">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Database Cluster</div>
              <div className="text-[10px] text-[#888888]">PostgreSQL · Redis</div>
            </div>
          </div>
        </div>

        {/* Bottom Microservice Console */}
        <div className="p-3.5 rounded-xl bg-[#0f0f0f] border border-[#222222] font-mono text-[11px] text-[#aaaaaa] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-[#c9a84c]" />
            <span>&gt; cluster.health: 100% nominal</span>
          </div>
          <span className="text-[#c9a84c] font-bold">&lt; 38ms SLA</span>
        </div>
      </div>
    </div>
  );
};
