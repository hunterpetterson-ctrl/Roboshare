'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Camera, X, Zap, Loader2, Info, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function ScanPage() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [logging, setLogging] = useState(false);
    const [vibeNote, setVibeNote] = useState('');
    const [cameraReady, setCameraReady] = useState(false);
    const [scanResult, setScanResult] = useState<{
        class: string;
        description: string;
        vibe_score: number;
        confidence: number;
        specs?: {
            weight?: number;
            speed?: number;
            goals?: string;
        }
    } | null>(null);
    const router = useRouter();

    const startCamera = async () => {
        // HARDWARE SENSORS OFF: Using simulation mode for privacy
        setCameraReady(true);
    };

    useEffect(() => {
        return () => {
            // Cleanup tracks on unmount
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [stream]);

    const captureAndAnalyze = async () => {
        if (analyzing) return;

        setAnalyzing(true);

        // SIMULATION MODE: Skipping network requests for prototype reliability
        console.log("Simulating high-speed data uplink...");

        await new Promise(resolve => setTimeout(resolve, 2000));

        setScanResult({
            class: "sidewalk_courier",
            description: "Serve Robotics Gen 3 unit detected. Engaging in last-mile burrito distribution with moderate dystopian efficiency.",
            vibe_score: 87,
            confidence: 0.98,
            specs: {
                weight: 45,
                speed: 6,
                goals: "Relocating carbohydrates / Neighborhood Surveillance"
            }
        });
    };

    const handleAcknowledge = async () => {
        if (!scanResult || logging) return;

        setLogging(true);
        const { saveSighting } = await import('@/app/actions/saveSighting');

        // 1. Get Geolocation
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;

                // 2. Save to DB (or LocalStorage Fallback)
                try {
                    // If Supabase is missing, save to local for demo persistence
                    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('your-project')) {
                        const demoSighting = {
                            id: `local-${Date.now()}`,
                            location: { latitude, longitude },
                            class: scanResult.class,
                            vibe_score: scanResult.vibe_score,
                            timestamp: new Date().toISOString(),
                            metadata: {
                                description: scanResult.description,
                                vibe_note: vibeNote,
                                confidence: scanResult.confidence,
                                specs: scanResult.specs
                            }
                        };

                        const existing = JSON.parse(localStorage.getItem('bot_sightings_demo') || '[]');
                        localStorage.setItem('bot_sightings_demo', JSON.stringify([demoSighting, ...existing]));

                        // Simulate a network delay
                        await new Promise(resolve => setTimeout(resolve, 1500));
                        router.push('/');
                        return;
                    }

                    const result = await saveSighting({
                        class: scanResult.class,
                        vibe_score: scanResult.vibe_score,
                        location: { latitude, longitude },
                        description: scanResult.description,
                        vibe_note: vibeNote,
                        metadata: {
                            confidence: scanResult.confidence,
                            specs: scanResult.specs
                        }
                    });

                    if (result.success) {
                        router.push('/');
                    } else {
                        alert("Log Failed: " + result.error);
                        setLogging(false);
                    }
                } catch (err) {
                    console.error("Save error:", err);
                    alert("Fatal error saving sighting.");
                    setLogging(false);
                }
            },
            (error) => {
                console.error("Geolocation error:", error);
                alert("Location required to pin bot on radar.");
                setLogging(false);
            },
            { enableHighAccuracy: true }
        );
    };

    return (
        <div className="relative h-screen w-full bg-void-black overflow-hidden flex flex-col font-sans">
            {/* Viewfinder Area */}
            <div className="flex-1 relative bg-black">
                {!cameraReady && !scanResult && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-10 bg-void-black">
                        <div className="w-20 h-20 rounded-full bg-radar-blue/10 flex items-center justify-center mb-6 border border-radar-blue/30 shadow-[0_0_40px_rgba(0,123,255,0.1)]">
                            <Camera className="w-10 h-10 text-radar-blue" />
                        </div>
                        <h2 className="text-2xl font-bold mb-2 tracking-tight text-white">Scanner Offline</h2>
                        <p className="text-gray-500 text-sm mb-8 leading-relaxed max-w-xs mx-auto">
                            Initialize sensor array to begin autonomous machine classification.
                        </p>
                        <div className="flex flex-col gap-4 w-full max-w-xs relative z-20">
                            <button
                                onClick={startCamera}
                                className="bg-radar-blue text-white px-8 py-5 rounded-2xl font-bold tracking-[0.2em] uppercase text-xs hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(0,123,255,0.4)] border border-white/10"
                            >
                                Initialize Sensors
                            </button>
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-radar-blue font-mono text-[9px] uppercase tracking-[0.3em] transition-colors py-2 text-center"
                            >
                                [ ABORT_SCAN.EXE ]
                            </Link>
                        </div>
                    </div>
                )}

                {cameraReady && !scanResult && (
                    <div className="absolute inset-0 z-0 scanline-overlay">
                        <img
                            src="/sample_bot.png"
                            alt="Simulation Feed"
                            className="w-full h-full object-cover grayscale-[0.3] contrast-[1.2] brightness-[0.8]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none" />

                        {/* Fake Telemetry Corners */}
                        <div className="absolute top-10 left-10 font-mono text-[10px] text-radar-blue/60 space-y-1 pointer-events-none">
                            <p>LAT: 37.7749</p>
                            <p>LNG: -122.4194</p>
                            <p>ALT: 12.4m</p>
                        </div>
                        <div className="absolute top-10 right-10 font-mono text-[10px] text-radar-blue/60 text-right space-y-1 pointer-events-none">
                            <p>ENC: AES-256</p>
                            <p>SIG: STRONG</p>
                            <p>FREQ: 5.8GHZ</p>
                        </div>
                    </div>
                )}

                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className={`w-full h-full object-cover transition-opacity duration-700 ${cameraReady ? 'opacity-100' : 'opacity-0'}`}
                />

                {/* HUD Overlay */}
                {cameraReady && !scanResult && (
                    <div className="absolute inset-0 pointer-events-none p-8">
                        <div className="w-full h-full border border-radar-blue/30 rounded-3xl relative">
                            {/* Brackets */}
                            <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-radar-blue rounded-tl-xl shadow-glow-blue" />
                            <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-radar-blue rounded-tr-xl shadow-glow-blue" />
                            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-radar-blue rounded-bl-xl shadow-glow-blue" />
                            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-radar-blue rounded-br-xl shadow-glow-blue" />

                            {/* Scanning Animation */}
                            <motion.div
                                className="absolute left-0 right-0 h-1 bg-radar-blue shadow-[0_0_20px_rgba(0,123,255,1)]"
                                animate={{ top: ['15%', '85%', '15%'] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            />

                            <div className="absolute top-4 left-4 bg-black/80 backdrop-blur px-3 py-1.5 rounded border border-radar-blue/30 text-[9px] font-mono text-radar-blue uppercase tracking-widest flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-radar-blue rounded-full animate-pulse" />
                                LIVE SENSOR FEED
                            </div>
                        </div>
                    </div>
                )}

                {/* Analyzing State */}
                <AnimatePresence>
                    {analyzing && !scanResult && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 bg-void-black/90 flex items-center justify-center backdrop-blur-xl z-50 p-12"
                        >
                            <div className="text-center">
                                <div className="relative w-28 h-28 mx-auto mb-8">
                                    <div className="absolute inset-0 border-4 border-radar-blue/10 rounded-full" />
                                    <motion.div
                                        className="absolute inset-0 border-t-4 border-radar-blue rounded-full"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    />
                                    <Zap className="absolute inset-0 m-auto w-10 h-10 text-radar-blue animate-pulse" />
                                </div>
                                <h3 className="text-2xl font-black tracking-tight mb-2 uppercase text-white">Deconstructing Target</h3>
                                <p className="text-radar-blue/60 font-mono text-[10px] uppercase tracking-[0.4em] font-bold">AI Intelligence Pass In Progress...</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Scan Result Overlay */}
                <AnimatePresence>
                    {scanResult && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute inset-0 bg-void-black/95 flex items-center justify-center z-[60] p-6 lg:p-12 overflow-y-auto"
                        >
                            <div className="max-w-md w-full bento-tile p-8 shadow-2xl relative overflow-hidden border-white/10">
                                {/* Decorative Glow */}
                                <div className="absolute -top-24 -right-24 w-48 h-48 bg-radar-blue/20 blur-[80px] rounded-full pointer-events-none" />

                                <div className="flex justify-center mb-6 relative">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="w-16 h-16 rounded-full bg-data-green/10 flex items-center justify-center border border-data-green/30 shadow-[0_0_20px_rgba(0,230,118,0.2)]"
                                    >
                                        <CheckCircle2 className="w-8 h-8 text-data-green" />
                                    </motion.div>
                                </div>

                                <div className="text-center space-y-1 mb-8">
                                    <h2 className="text-[10px] font-mono text-radar-blue uppercase tracking-[0.4em] font-black opacity-70">
                                        Identification Success
                                    </h2>
                                    <h3 className="text-3xl font-black capitalize tracking-tighter text-white" style={{ textShadow: '0 0 20px rgba(255,255,255,0.1)' }}>
                                        {scanResult.class.replace(/_/g, ' ')}
                                    </h3>
                                </div>

                                <div className="space-y-4 mb-8">
                                    <div className="bg-white/5 rounded-2xl p-4 border border-white/5 backdrop-blur-md">
                                        <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest mb-2 flex items-center gap-2">
                                            <Info className="w-3 h-3 text-radar-blue" /> Machine Summary
                                        </p>
                                        <p className="text-sm text-gray-300 italic leading-relaxed font-medium">
                                            &ldquo;{scanResult.description}&rdquo;
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-white/5 rounded-2xl p-4 border border-white/5 backdrop-blur-md">
                                            <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest mb-1">Vibe Match</p>
                                            <p className="text-2xl font-black text-radar-blue drop-shadow-[0_0_10px_rgba(0,123,255,0.5)]">{scanResult.vibe_score}%</p>
                                        </div>
                                        <div className="bg-white/5 rounded-2xl p-4 border border-white/5 backdrop-blur-md">
                                            <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest mb-1">Confidence</p>
                                            <p className="text-2xl font-black text-data-green drop-shadow-[0_0_10px_rgba(0,230,118,0.5)]">{(scanResult.confidence * 100).toFixed(0)}%</p>
                                        </div>
                                    </div>

                                    <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                                        <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest mb-2 flex items-center gap-2">
                                            <Zap className="w-3 h-3 text-radar-blue" /> Add Vibe Note
                                        </p>
                                        <input
                                            type="text"
                                            value={vibeNote}
                                            onChange={(e) => setVibeNote(e.target.value)}
                                            placeholder="e.g. Polite delivery bot, very fast"
                                            className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-radar-blue/50 transition-colors placeholder:text-gray-700 font-medium"
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={handleAcknowledge}
                                    disabled={logging}
                                    className="w-full bg-radar-blue py-5 rounded-2xl font-black uppercase text-xs tracking-[0.3em] shadow-[0_0_30px_rgba(0,123,255,0.3)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3 border border-white/10"
                                >
                                    {logging ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Encrypting Census...
                                        </>
                                    ) : (
                                        "Log Metadata"
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Controls Bar */}
            <div className="h-40 bg-void-black flex items-center justify-around px-8 border-t border-white/5 relative z-10">
                <Link href="/" className="p-4 rounded-full bg-gray-900 text-gray-400 hover:text-white transition-all border border-white/5 hover:border-gray-700">
                    <X className="w-6 h-6" />
                </Link>

                <div className="flex flex-col items-center">
                    <button
                        onClick={captureAndAnalyze}
                        disabled={!cameraReady || analyzing || !!scanResult}
                        className={`w-24 h-24 rounded-full border-4 flex items-center justify-center relative transition-all duration-300 ${!cameraReady || analyzing || scanResult
                            ? 'border-gray-800 scale-90 opacity-40'
                            : 'border-white hover:scale-110 active:scale-90 shadow-[0_0_30px_rgba(255,255,255,0.2)]'
                            }`}
                    >
                        <div className={`w-20 h-20 rounded-full transition-all duration-500 ${analyzing ? 'bg-radar-blue animate-pulse' : 'bg-white'
                            }`} />
                        {cameraReady && !analyzing && !scanResult && (
                            <motion.div
                                className="absolute inset-0 rounded-full border-2 border-radar-blue"
                                animate={{ scale: [1, 1.3, 1], opacity: [0.8, 0, 0.8] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        )}
                    </button>
                    <span className="text-[9px] text-gray-600 font-mono mt-4 uppercase tracking-[0.3em] font-black">Begin Scan</span>
                </div>

                <div className="w-14" /> {/* Spacer */}
            </div>

            <canvas ref={canvasRef} className="hidden" />
        </div>
    );
}

