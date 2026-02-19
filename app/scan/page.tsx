'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Camera, X, Zap, Loader2, Info, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const SIMULATION_DECK = [
    {
        id: 'courier',
        image: '/sample_bot.png',
        class: "sidewalk_courier",
        description: "Serve Robotics Gen 3. Executing high-precision last-mile logistics. Propulsion efficiency optimized at 96%.",
        vibe_score: 91,
        confidence: 0.99,
        metadata: [
            { x: 30, y: 40, label: "LIDAR_ARRAY" },
            { x: 70, y: 80, label: "MOTIVE_MODULE" },
            { x: 50, y: 10, label: "COMM_UPLINK" }
        ],
        specs: { weight: 45, speed: 6, goals: "Autonomous Logistics" }
    },
    {
        id: 'drone',
        image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=1000&auto=format&fit=crop',
        class: "aerial_drone",
        description: "DJI Matrice 300 series. High-altitude environmental monitoring active. Surface-to-air mesh integrity confirmed.",
        vibe_score: 96,
        confidence: 0.97,
        metadata: [
            { x: 50, y: 50, label: "GIMBAL_STABILIZED_OPTICS" },
            { x: 20, y: 20, label: "PROPULSION_ALPHA" },
            { x: 80, y: 80, label: "THERMAL_SENSOR_ARRAY" }
        ],
        specs: { weight: 12, speed: 55, goals: "Mesh Health Monitoring" }
    },
    {
        id: 'humanoid',
        image: 'https://images.unsplash.com/photo-1546776310-eef45dd6d63c?q=80&w=1000&auto=format&fit=crop',
        class: "humanoid",
        description: "Unitree H1 Evolutionary Variant. Complex bipedal locomotion logic active. Social interaction protocols initialized.",
        vibe_score: 98,
        confidence: 0.94,
        metadata: [
            { x: 50, y: 15, label: "COGNITIVE_CORE" },
            { x: 40, y: 60, label: "BIPEDAL_ACTUATOR" },
            { x: 60, y: 60, label: "BAL_GYRO_STABILIZER" }
        ],
        specs: { weight: 75, speed: 4.8, goals: "Anthropomorphic Assistance" }
    }
];

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

    useEffect(() => {
        return () => {
            // Cleanup tracks on unmount
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [stream]);

    const [scannedImage, setScannedImage] = useState<string>('/sample_bot.png');
    const [activeTarget, setActiveTarget] = useState<typeof SIMULATION_DECK[0]>(SIMULATION_DECK[0]);
    const [pointsOfInterest, setPointsOfInterest] = useState<{ x: number, y: number, label: string }[]>([]);

    const startCamera = async () => {
        // Randomly select the target BEFORE the user clicks "Begin Scan"
        const target = SIMULATION_DECK[Math.floor(Math.random() * SIMULATION_DECK.length)];
        setActiveTarget(target);
        setScannedImage(target.image);

        // HARDWARE SENSORS OFF: Using simulation mode for privacy
        setCameraReady(true);
    };

    const captureAndAnalyze = async () => {
        if (analyzing) return;

        setAnalyzing(true);
        const target = activeTarget;

        // SHUTTER EFFECT: Simple delay for visual punch
        await new Promise(resolve => setTimeout(resolve, 300));

        // POI DETECTION SEQUENCE: Appear one by one
        for (let i = 0; i < target.metadata.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 800));
            setPointsOfInterest(prev => [...prev, target.metadata[i]]);
        }

        await new Promise(resolve => setTimeout(resolve, 1000));

        setScanResult({
            class: target.class,
            description: target.description,
            vibe_score: target.vibe_score,
            confidence: target.confidence,
            specs: target.specs
        });
    };

    const handleAcknowledge = async () => {
        if (!scanResult || logging) return;

        setLogging(true);
        const { saveSighting } = await import('@/app/actions/saveSighting');

        // MISSION CONTROL COORDINATES (SF)
        const baseLat = 37.7749;
        const baseLng = -122.4194;

        // Add small jitter so multiple scans don't stack perfectly
        const latitude = baseLat + (Math.random() - 0.5) * 0.01;
        const longitude = baseLng + (Math.random() - 0.5) * 0.01;

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

                {(cameraReady || analyzing) && !scanResult && (
                    <div className="absolute inset-0 z-0 scanline-overlay">
                        {/* Selected Simulation Feed */}
                        <motion.img
                            key={scannedImage}
                            initial={{ scale: 1.1, filter: 'blur(10px)' }}
                            animate={{ scale: 1, filter: 'blur(0px)' }}
                            src={scannedImage}
                            alt="Simulation Feed"
                            className="w-full h-full object-cover grayscale-[0.2] contrast-[1.1] brightness-[0.7]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 pointer-events-none" />

                        {/* POI Tracking Markers */}
                        <AnimatePresence>
                            {pointsOfInterest.map((poi, idx) => (
                                <motion.div
                                    key={`poi-${idx}`}
                                    initial={{ scale: 2, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="absolute z-20"
                                    style={{ left: `${poi.x}%`, top: `${poi.y}%` }}
                                >
                                    <div className="relative">
                                        <div className="w-4 h-4 border-2 border-radar-blue rounded-full animate-ping absolute -inset-1 opacity-50" />
                                        <div className="w-2 h-2 bg-radar-blue rounded-full shadow-[0_0_10px_#007BFF]" />
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-radar-blue/20 backdrop-blur-md border border-radar-blue/40 px-2 py-0.5 rounded flex items-center gap-2">
                                            <span className="text-[8px] font-mono text-radar-blue font-black whitespace-nowrap tracking-wider">{poi.label}</span>
                                            <div className="w-1.5 h-1.5 bg-radar-blue rounded-full animate-pulse" />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {/* SHUTTER FLASH */}
                        <AnimatePresence>
                            {analyzing && pointsOfInterest.length === 0 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: [0, 1, 0] }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute inset-0 bg-white z-[100] pointer-events-none"
                                />
                            )}
                        </AnimatePresence>

                        {/* Fake Telemetry Corners */}
                        <div className="absolute top-10 left-10 font-mono text-[10px] text-radar-blue/60 space-y-1 pointer-events-none">
                            <p>LAT: 37.7749</p>
                            <p>LNG: -122.4194</p>
                            <p>ALT: {analyzing ? (12.4 + Math.random()).toFixed(1) : '12.4'}m</p>
                        </div>
                        <div className="absolute top-10 right-10 font-mono text-[10px] text-radar-blue/60 text-right space-y-1 pointer-events-none">
                            <p>ENC: AES-256</p>
                            <p>SIG: {analyzing ? 'UPLINKING' : 'STRONG'}</p>
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

                {/* Analyzing State Overlay */}
                <AnimatePresence>
                    {analyzing && !scanResult && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 bg-void-black/40 flex items-end justify-start z-50 p-12 pointer-events-none"
                        >
                            <div className="max-w-xs space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="relative w-12 h-12">
                                        <div className="absolute inset-0 border-2 border-radar-blue/10 rounded-full" />
                                        <motion.div
                                            className="absolute inset-0 border-t-2 border-radar-blue rounded-full"
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        />
                                        <Zap className="absolute inset-0 m-auto w-4 h-4 text-radar-blue animate-pulse" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-black tracking-tight uppercase text-white">Deconstructing</h3>
                                        <p className="text-radar-blue/60 font-mono text-[8px] uppercase tracking-[0.4em] font-bold">Heuristic Pass: {pointsOfInterest.length} / 3</p>
                                    </div>
                                </div>

                                {/* Live System Log during Analysis */}
                                <div className="bg-black/60 backdrop-blur-md border border-white/5 p-4 rounded-xl font-mono text-[7px] text-radar-blue/40 uppercase tracking-widest space-y-1">
                                    <p className="text-radar-blue/80 animate-pulse">{`> HEURISTIC_MATCH_INIT`}</p>
                                    <p>{`> DEEP_PACKET_INSPECT_PROV_ID: [${scannedImage.slice(-8)}]`}</p>
                                    <p className={pointsOfInterest.length >= 1 ? 'opacity-100' : 'opacity-20'}>{`> NODE_LOCKED: GEOMETRY_SYNC`}</p>
                                    <p className={pointsOfInterest.length >= 2 ? 'opacity-100' : 'opacity-20'}>{`> NODE_LOCKED: MOTIVE_RECON`}</p>
                                    <p className={pointsOfInterest.length >= 3 ? 'opacity-100' : 'opacity-20'}>{`> METADATA_ENVELOPE_READY`}</p>
                                </div>
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
                            <div className="max-w-md w-full bento-tile p-5 shadow-2xl relative overflow-hidden border-white/10">
                                {/* Decorative Glow */}
                                <div className="absolute -top-24 -right-24 w-48 h-48 bg-radar-blue/20 blur-[80px] rounded-full pointer-events-none" />

                                <div className="flex justify-center mb-2 relative">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="w-12 h-12 rounded-full bg-data-green/10 flex items-center justify-center border border-data-green/30 shadow-[0_0_20px_rgba(0,230,118,0.2)]"
                                    >
                                        <CheckCircle2 className="w-6 h-6 text-data-green" />
                                    </motion.div>
                                </div>

                                <div className="text-center space-y-1 mb-4">
                                    <h2 className="text-[10px] font-mono text-radar-blue uppercase tracking-[0.4em] font-black opacity-70">
                                        Identification Success
                                    </h2>
                                    <h3 className="text-2xl font-black capitalize tracking-tighter text-white" style={{ textShadow: '0 0 20px rgba(255,255,255,0.1)' }}>
                                        {scanResult.class.replace(/_/g, ' ')}
                                    </h3>
                                </div>

                                {/* Persistent Analysis Frame */}
                                <div className="relative w-full h-40 rounded-xl overflow-hidden border border-white/10 mb-4 group/frame">
                                    <img
                                        src={scannedImage}
                                        alt="Target Analysis"
                                        className="w-full h-full object-cover grayscale-[0.3] contrast-125"
                                    />
                                    {/* Tech Overlays */}
                                    <div className="absolute inset-0 bg-radar-blue/5 pointer-events-none" />
                                    <div className="absolute inset-0 border-[20px] border-black/20 pointer-events-none" />

                                    {/* Crosshairs */}
                                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 pointer-events-none" />
                                    <div className="absolute left-1/2 top-0 w-[1px] h-full bg-white/10 pointer-events-none" />

                                    {/* Corners */}
                                    <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-white/40" />
                                    <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-white/40" />
                                    <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-white/40" />
                                    <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-white/40" />

                                    {/* Persistent POI Nodes */}
                                    {pointsOfInterest.map((poi, idx) => (
                                        <div
                                            key={`result-poi-${idx}`}
                                            className="absolute"
                                            style={{ left: `${poi.x}%`, top: `${poi.y}%` }}
                                        >
                                            <div className="w-2 h-2 bg-data-green rounded-full shadow-[0_0_10px_#00E676] animate-pulse" />
                                            <div className="absolute left-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-black/60 backdrop-blur-md border border-white/20 px-1.5 py-0.5 rounded-[4px] text-[6px] font-mono text-white tracking-widest uppercase">
                                                {poi.label}_LOCKED
                                            </div>
                                        </div>
                                    ))}

                                    {/* Scanning Bar (Static in Result) */}
                                    <div className="absolute top-1/2 left-0 w-full h-[2px] bg-data-green/30 shadow-[0_0_15px_rgba(0,230,118,0.5)]" />
                                </div>

                                <div className="space-y-3 mb-5">
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="col-span-2 bg-white/5 rounded-xl p-3 border border-white/5 backdrop-blur-md">
                                            <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest mb-1 flex items-center gap-2">
                                                <Info className="w-3 h-3 text-radar-blue" /> Machine Summary
                                            </p>
                                            <p className="text-xs text-gray-300 italic leading-relaxed font-medium">
                                                &ldquo;{scanResult.description}&rdquo;
                                            </p>
                                        </div>
                                        <div className="bg-white/5 rounded-xl p-3 border border-white/5 backdrop-blur-md">
                                            <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest mb-0.5">BOT score</p>
                                            <p className="text-xl font-black text-radar-blue drop-shadow-[0_0_10px_rgba(0,123,255,0.5)]">{scanResult.vibe_score}%</p>
                                        </div>
                                        <div className="bg-white/5 rounded-xl p-3 border border-white/5 backdrop-blur-md">
                                            <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest mb-0.5">Confidence</p>
                                            <p className="text-xl font-black text-data-green drop-shadow-[0_0_10px_rgba(0,230,118,0.5)]">{(scanResult.confidence * 100).toFixed(0)}%</p>
                                        </div>
                                    </div>

                                    <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                                        <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest mb-2 flex items-center gap-2">
                                            <Zap className="w-3 h-3 text-radar-blue" /> Add Field Note
                                        </p>
                                        <input
                                            type="text"
                                            value={vibeNote}
                                            onChange={(e) => setVibeNote(e.target.value)}
                                            placeholder="e.g. Polite delivery bot, very fast"
                                            className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-radar-blue/50 transition-colors placeholder:text-gray-700 font-medium"
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={handleAcknowledge}
                                    disabled={logging}
                                    className="w-full bg-radar-blue py-3 rounded-xl font-black uppercase text-xs tracking-[0.3em] shadow-[0_0_30px_rgba(0,123,255,0.3)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3 border border-white/10"
                                >
                                    {logging ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Encrypting...
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

