
'use client';

import React, { useEffect, useState } from 'react';
import Map, { Marker } from 'react-map-gl/mapbox';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Scan, X, Zap, Activity } from 'lucide-react';
import { mapboxConfig } from '@/lib/mapboxConfig';
import { supabase } from '@/lib/supabaseClient';
import { BotSighting } from '@/types';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function RadarMap() {
    const [viewState, setViewState] = useState(mapboxConfig.defaultCenter);
    const [sightings, setSightings] = useState<BotSighting[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedBot, setSelectedBot] = useState<BotSighting | null>(null);

    useEffect(() => {
        // Fetch initial sightings (mock or real)
        const fetchSightings = async () => {
            let coreSightings: BotSighting[] = [];

            // 1. Fetch from Supabase if configured
            if (process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('your-project')) {
                const { data } = await supabase
                    .from('bot_sightings')
                    .select('*');
                if (data) coreSightings = data as BotSighting[];
            }

            // 2. Merge with LocalStorage (Demo Persistence)
            const localSaved = localStorage.getItem('bot_sightings_demo');
            const localSightings = localSaved ? JSON.parse(localSaved) : [];

            // 3. Fallback to Initial Mock if map is empty
            if (coreSightings.length === 0 && localSightings.length === 0) {
                console.log("Using initial mock signals for demo environment");
                coreSightings = [
                    {
                        id: 'demo-1',
                        location: { latitude: 37.7749, longitude: -122.4194 },
                        class: 'delivery',
                        vibe_score: 85,
                        timestamp: new Date().toISOString(),
                        metadata: { description: "Simulated courier unit. Autonomous burrito relocation active." }
                    },
                    {
                        id: 'demo-2',
                        location: { latitude: 37.7849, longitude: -122.4094 },
                        class: 'security',
                        vibe_score: 92,
                        timestamp: new Date().toISOString(),
                        metadata: { description: "High-latency security unit. Observing sidewalk traffic with aggressive intent." }
                    }
                ];
            }

            setSightings([...coreSightings, ...localSightings]);
            setLoading(false);
        };

        fetchSightings();

        // Real-time subscription could go here
        const subscription = supabase
            .channel('public:bot_sightings')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'bot_sightings' }, (payload) => {
                console.log('Real-time signal detected!', payload);
                setSightings(prev => [payload.new as BotSighting, ...prev]);
            })
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        };
    }, []);

    return (
        <div className="relative w-full h-screen bg-black">
            <Map
                {...viewState}
                onMove={(evt: { viewState: typeof viewState }) => setViewState(evt.viewState)}
                style={{ width: '100%', height: '100%' }}
                mapStyle={mapboxConfig.styleUrl}
                mapboxAccessToken={mapboxConfig.accessToken}
                attributionControl={false}
            >
                {sightings.map((bot) => (
                    <Marker
                        key={bot.id}
                        latitude={bot.location.latitude}
                        longitude={bot.location.longitude}
                    >
                        <div
                            className="relative group cursor-pointer"
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedBot(bot);
                            }}
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="relative flex items-center justify-center"
                            >
                                {/* Sonar Rings */}
                                <motion.div
                                    className="absolute w-12 h-12 rounded-full border border-radar-blue/50"
                                    animate={{
                                        scale: [0.2, 2.5],
                                        opacity: [0.8, 0]
                                    }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
                                />
                                <motion.div
                                    className="absolute w-12 h-12 rounded-full border border-radar-blue/30"
                                    animate={{
                                        scale: [0.2, 2.5],
                                        opacity: [0.8, 0]
                                    }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: 1.5 }}
                                />

                                {/* Core Blip */}
                                <div className="w-3 h-3 bg-radar-blue rounded-full shadow-[0_0_15px_#007BFF] border border-white/40" />

                                {/* Label (Visible on hover) */}
                                <div className="absolute left-6 whitespace-nowrap bg-black/80 backdrop-blur px-2 py-1 rounded border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <p className="text-[9px] font-mono text-white uppercase tracking-tighter">
                                        {bot.class.replace(/_/g, ' ')} / {bot.vibe_score}%
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </Marker>
                ))}
            </Map>

            {/* Side Panel: Bot Detail View */}
            <AnimatePresence mode="wait">
                {selectedBot && (
                    <motion.div
                        initial={{ x: '110%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: '110%', opacity: 0 }}
                        className="absolute top-6 bottom-32 right-6 w-80 z-30 bento-tile p-0 flex flex-col overflow-hidden shadow-2xl border-radar-blue/30"
                    >
                        {/* Header */}
                        <div className="p-6 bg-radar-blue/10 border-b border-white/5 flex justify-between items-start">
                            <div className="space-y-1">
                                <h3 className="text-2xl font-black capitalize tracking-tighter text-white">
                                    {selectedBot.class.replace(/_/g, ' ')}
                                </h3>
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-data-green animate-pulse" />
                                    <p className="text-[10px] font-mono text-radar-blue uppercase tracking-widest">Signal Verified</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedBot(null)}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors group"
                            >
                                <X className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                            {/* Vibe Score Gauge */}
                            <div className="text-center bg-white/5 rounded-2xl py-6 border border-white/5">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Dystopian energy</p>
                                <div className="relative inline-block">
                                    <svg className="w-28 h-28 transform -rotate-90">
                                        <circle cx="56" cy="56" r="50" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                                        <motion.circle
                                            cx="56" cy="56" r="50" stroke="currentColor" strokeWidth="8" fill="transparent"
                                            className="text-radar-blue"
                                            initial={{ strokeDashoffset: 314 }}
                                            animate={{ strokeDashoffset: 314 - (selectedBot.vibe_score / 100) * 314 }}
                                            style={{ strokeDasharray: 314 }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-3xl font-black text-white">{selectedBot.vibe_score}%</span>
                                        <span className="text-[8px] text-gray-500 font-bold uppercase tracking-widest">Critical</span>
                                    </div>
                                </div>
                            </div>

                            {/* Metadata / AI Summary */}
                            <div className="space-y-4">
                                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                                    <p className="text-[10px] text-radar-blue font-black uppercase tracking-widest mb-2 flex items-center gap-2">
                                        <Zap className="w-3 h-3" /> Hardware Log
                                    </p>
                                    <p className="text-xs text-gray-300 italic leading-relaxed font-medium">
                                        &ldquo;{selectedBot.metadata && typeof selectedBot.metadata === 'object' && 'description' in selectedBot.metadata ? String(selectedBot.metadata.description) : "Machine signature identified as autonomous delivery vessel."}&rdquo;
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                                        <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest mb-1">Estimated Mass</p>
                                        <p className="text-sm font-black text-white">
                                            {selectedBot.metadata && typeof selectedBot.metadata === 'object' && 'specs' in selectedBot.metadata && (selectedBot.metadata.specs as any).weight
                                                ? `${(selectedBot.metadata.specs as any).weight}`
                                                : '45'} KG
                                        </p>
                                    </div>
                                    <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                                        <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest mb-1">Max Velocity</p>
                                        <p className="text-sm font-black text-white">
                                            {selectedBot.metadata && typeof selectedBot.metadata === 'object' && 'specs' in selectedBot.metadata && (selectedBot.metadata.specs as any).speed
                                                ? `${(selectedBot.metadata.specs as any).speed}`
                                                : '6'} KM/H
                                        </p>
                                    </div>
                                </div>

                                {!!(selectedBot.metadata && typeof selectedBot.metadata === 'object' && 'vibe_note' in selectedBot.metadata && selectedBot.metadata.vibe_note) && (
                                    <div className="bg-radar-blue/5 rounded-xl p-4 border border-radar-blue/20">
                                        <p className="text-[10px] text-radar-blue font-black uppercase tracking-widest mb-2 flex items-center gap-2">
                                            <Scan className="w-3 h-3" /> Field Observation
                                        </p>
                                        <p className="text-xs text-blue-100 font-medium leading-relaxed">
                                            {String((selectedBot.metadata as Record<string, any>).vibe_note)}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Footer Action */}
                        <div className="p-4 bg-void-black border-t border-white/5">
                            <button
                                onClick={() => setSelectedBot(null)}
                                className="w-full bg-white/5 hover:bg-white/10 text-[10px] font-black py-4 rounded-xl border border-white/10 uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98]"
                            >
                                Dismiss Uplink
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Top Left: Main Hub */}
            <div className="absolute top-6 left-6 z-10 space-y-4 max-w-xs pointer-events-none">
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="bento-tile px-6 py-4 pointer-events-auto shadow-2xl"
                >
                    <h1 className="text-2xl font-black flex items-center gap-3 tracking-tighter text-white">
                        <div className="relative">
                            <Scan className="w-6 h-6 text-radar-blue" />
                            <motion.div
                                className="absolute inset-0 bg-radar-blue/20 rounded-full blur-md"
                                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        </div>
                        BOTdar
                        <span className="text-[10px] bg-radar-blue/20 text-radar-blue px-2 py-0.5 rounded-full border border-radar-blue/30 font-bold uppercase tracking-widest">Census v1</span>
                    </h1>
                    <div className="flex items-center gap-2 mt-2">
                        <div className="w-2 h-2 rounded-full bg-data-green animate-pulse shadow-[0_0_8px_#00E676]" />
                        <p className="text-[10px] text-gray-400 font-mono uppercase tracking-[0.2em]">
                            Global Mesh: Online
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="bento-tile pointer-events-auto shadow-2xl overflow-hidden"
                >
                    <div className="flex justify-between items-end mb-3 px-1">
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Active signals</p>
                        <p className="text-xs font-mono text-radar-blue font-bold">{sightings.length}</p>
                    </div>
                    <div className="space-y-1.5 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                        {loading ? (
                            <div className="animate-pulse space-y-2">
                                <div className="h-10 bg-white/5 rounded-xl" />
                                <div className="h-10 bg-white/5 rounded-xl" />
                            </div>
                        ) : sightings.slice(0, 5).map(s => (
                            <button
                                key={s.id}
                                onClick={() => setSelectedBot(s)}
                                className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer text-left ${selectedBot?.id === s.id ? 'bg-radar-blue/20 border-radar-blue/40 ring-1 ring-radar-blue/20' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}
                            >
                                <div className="flex flex-col">
                                    <span className="capitalize text-gray-100 font-black tracking-tight text-xs">{s.class.replace(/_/g, ' ')}</span>
                                    <span className="text-[9px] text-gray-500 font-mono uppercase">Vibe: {s.vibe_score}%</span>
                                </div>
                                <span className="text-gray-500 font-mono text-[9px]">{new Date(s.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Raw Teletype Log */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col gap-1 font-mono text-[8px] text-radar-blue/40 uppercase tracking-widest pl-1 pointer-events-none"
                >
                    <p>{`> MESH_INIT_SUCCESS`}</p>
                    <p>{`> UPLINK_STABLE_88%`}</p>
                    <p>{`> SCAN_PASS_ACTIVE`}</p>
                </motion.div>
            </div>

            {/* Top Right: Bot Index Card */}
            <div className="absolute top-6 right-6 z-10 flex flex-col gap-4 scale-90 sm:scale-100 origin-top-right pointer-events-none">
                <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="bento-tile w-52 text-center relative overflow-hidden pointer-events-auto shadow-2xl"
                >
                    <div className="absolute -top-12 -right-12 w-32 h-32 bg-data-green/5 blur-3xl rounded-full" />
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Local Bot Index</p>
                    <div className="text-5xl font-black text-data-green flex items-baseline justify-center gap-1 drop-shadow-[0_0_15px_rgba(0,230,118,0.3)]">
                        {loading ? '--' : Math.min(100, (sightings.length * 12) + 24)}
                        <span className="text-xs text-data-green/50">AQM</span>
                    </div>
                    <div className="mt-4 h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-data-green shadow-[0_0_12px_#00E676]"
                            initial={{ width: 0 }}
                            animate={{ width: loading ? 0 : `${Math.min(100, (sightings.length * 12) + 24)}%` }}
                        />
                    </div>
                    <p className="text-[8px] text-gray-600 mt-2 font-mono uppercase tracking-[0.3em]">Calibration: Nominal</p>
                </motion.div>

                <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="bento-tile w-52 pointer-events-auto shadow-2xl bg-black/40 border-radar-blue/10"
                >
                    <div className="flex justify-between items-center mb-2">
                        <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                            <Activity className="w-3 h-3 text-radar-blue" /> Sector Health
                        </p>
                        <span className="text-[8px] font-mono text-radar-blue animate-pulse">OPTIMIZED</span>
                    </div>
                    <div className="flex gap-1 h-6">
                        {[1, 0.8, 1, 0.9, 0.7, 1, 1, 0.5].map((op, i) => (
                            <motion.div
                                key={i}
                                className="flex-1 bg-radar-blue/60 rounded-sm"
                                animate={{ height: [`${op * 100}%`, `${(1 - op) * 100}%`, `${op * 100}%`] }}
                                transition={{ duration: 2 + i, repeat: Infinity }}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Scanning Line Animation */}
            <div className="scanline" />
        </div>
    );
}
