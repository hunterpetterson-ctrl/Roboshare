'use client';

import React, { useState, useEffect } from 'react';
import RadarMap from '@/components/radar/RadarMap';
import Link from 'next/link';
import { Camera, Zap, Shield, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setBooting(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between relative bg-black">
      <AnimatePresence>
        {booting && (
          <motion.div
            exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="relative mb-8">
                <Zap className="w-16 h-16 text-radar-blue animate-pulse" />
                <motion.div
                  className="absolute inset-0 bg-radar-blue/20 blur-2xl rounded-full"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <h1 className="text-4xl font-black tracking-tighter mb-2 text-white italic">BOTdar</h1>
              <p className="text-[10px] font-mono text-radar-blue uppercase tracking-[0.5em] mb-12">Universal Machine Census</p>

              <div className="max-w-xs mx-auto space-y-3">
                <div className="flex items-center justify-between text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                  <span>Establishing Mesh</span>
                  <span className="text-radar-blue">84%</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-radar-blue"
                    initial={{ width: 0 }}
                    animate={{ width: '84%' }}
                    transition={{ duration: 2 }}
                  />
                </div>
                <div className="flex gap-4 pt-8">
                  <div className="flex items-center gap-2">
                    <Shield className="w-3 h-3 text-data-green" />
                    <span className="text-[8px] font-mono text-gray-600 uppercase">Secure Link</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-3 h-3 text-radar-blue animate-spin" />
                    <span className="text-[8px] font-mono text-gray-600 uppercase">Syncing Array</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <RadarMap />

      {/* HUD Overlay: Dynamic Scan Button */}
      {!booting && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        >
          <Link
            href="/scan"
            className="flex flex-col items-center justify-center w-28 h-28 bg-radar-blue rounded-full border-4 border-radar-blue/30 shadow-[0_0_50px_rgba(0,123,255,0.4)] hover:scale-110 active:scale-90 transition-all group overflow-hidden relative"
          >
            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />

            <Camera className="w-12 h-12 text-white group-hover:rotate-6 transition-transform relative z-10" />
            <span className="text-[10px] font-black text-white mt-1 uppercase tracking-widest relative z-10">Scan Bot</span>

            {/* Pulsing ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-white/20"
              animate={{ scale: [1, 1.3], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </Link>
        </motion.div>
      )}
    </main>
  );
}
