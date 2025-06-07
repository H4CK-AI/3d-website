import { useEffect, useRef, useState } from 'react';
import Vapi from '@vapi-ai/web';
import { getVapiKey } from '../lib/config';

const ASSISTANT_ID = '244907fd-acc0-44c0-b90c-e2afd88fc3bc';

export const VapiConnect = () => {
    const [isCalling, setIsCalling] = useState(false);
    const [callStatus, setCallStatus] = useState('Disconnected');
    const [error, setError] = useState<string | null>(null);
    const [callTime, setCallTime] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const vapiRef = useRef<any>(null);

    useEffect(() => {
        vapiRef.current = new Vapi(getVapiKey());
        vapiRef.current.on('call-start', () => {
            setIsCalling(true);
            setCallStatus('In Call');
            setError(null);
            setCallTime(0);
            if (timerRef.current) clearInterval(timerRef.current);
            timerRef.current = setInterval(() => setCallTime(t => t + 1), 1000);
        });
        vapiRef.current.on('call-end', () => {
            setIsCalling(false);
            setCallStatus('Call Ended');
            if (timerRef.current) clearInterval(timerRef.current);
        });
        vapiRef.current.on('error', (err: any) => {
            setError(err?.message || 'Unknown error');
            setIsCalling(false);
            setCallStatus('Error');
            if (timerRef.current) clearInterval(timerRef.current);
        });
        return () => {
            vapiRef.current?.off?.('call-start');
            vapiRef.current?.off?.('call-end');
            vapiRef.current?.off?.('error');
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    const handleOrbClick = async () => {
        setError(null);
        if (!isCalling) {
            setCallStatus('Connecting...');
            try {
                await vapiRef.current.start(ASSISTANT_ID);
            } catch (err: any) {
                setError(err?.message || 'Failed to start call');
                setCallStatus('Error');
            }
        } else {
            setCallStatus('Ending...');
            try {
                await vapiRef.current.stop();
            } catch (err: any) {
                setError(err?.message || 'Failed to end call');
                setCallStatus('Error');
            }
        }
    };


    // Premium animated orb SVG with swirling gradients and glow
    return (
        <div className="flex flex-col items-end justify-center select-none mt-8 mr-8">
            {/* Main Orb */}
            <div
                className="relative w-[160px] h-[160px] flex items-center justify-center cursor-pointer group"
                onClick={handleOrbClick}
                title={isCalling ? 'End Call' : 'Start Call'}
            >
                {/* Voice Wave Animation */}
                <svg width="160" height="160" viewBox="0 0 160 160" className="absolute">
                    <defs>
                        <radialGradient id="voiceGlow" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#4facfe" stopOpacity="0.9" />
                            <stop offset="100%" stopColor="#7367f0" stopOpacity="0.3" />
                        </radialGradient>
                        <filter id="voiceBlur">
                            <feGaussianBlur stdDeviation="2.5" />
                        </filter>
                    </defs>

                    {/* Animated Voice Waves */}
                    <circle
                        cx="80"
                        cy="80"
                        r="62"
                        fill="none"
                        stroke="url(#voiceGlow)"
                        strokeWidth="2.5"
                        className={`${isCalling ? 'animate-voice-wave-active' : 'animate-voice-wave'}`}
                        strokeDasharray="440"
                        strokeDashoffset="0"
                    />
                    <circle
                        cx="80"
                        cy="80"
                        r="45"
                        fill="none"
                        stroke="url(#voiceGlow)"
                        strokeWidth="2.5"
                        className={`${isCalling ? 'animate-voice-wave2-active' : 'animate-voice-wave2'}`}
                        strokeDasharray="314"
                        strokeDashoffset="0"
                    />

                    {/* Central Glow */}
                    <circle
                        cx="80"
                        cy="80"
                        r="32"
                        fill="url(#voiceGlow)"
                        className={`${isCalling ? 'animate-voice-glow-active' : 'animate-voice-glow'}`}
                        filter="url(#voiceBlur)"
                    />
                </svg>

                {/* Central Button */}
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45px] h-[45px] rounded-full 
                    flex items-center justify-center backdrop-blur-md bg-white/15 border border-white/30
                    ${isCalling ? 'animate-voice-pulse' : ''} transition-all duration-300 hover:scale-105`}
                >
                    <div className="relative">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="currentColor"/>
                            <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" fill="currentColor"/>
                        </svg>
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#7367f0] text-white text-[8px] px-1.5 py-0.5 rounded-full whitespace-nowrap">
                            Call
                        </div>
                    </div>
                </div>
            </div>

            {/* Status Display & Typing Effect */}
            <div className="flex flex-col items-end -mt-8 space-y-1 relative w-[160px]">
                {/* Glow Effect */}
                <div className="absolute -inset-4 bg-gradient-to-b from-[#7367f0]/20 to-transparent blur-xl rounded-full"></div>
                
                {/* Status Text */}
                <div className="relative z-10 text-right w-full">
                    <p className="text-sm text-white leading-relaxed font-medium drop-shadow-[0_0_8px_rgba(115,103,240,0.5)] text-right">
                        {callStatus === 'Connecting...' ? 'Connecting...' : 
                         callStatus === 'In Call' ? 'Connected' :
                         callStatus === 'Call Ended' ? (
                            <span className="typing-container">
                                <span className="typing-text"></span>
                                <span className="typing-cursor">|</span>
                            </span>
                         ) :
                         callStatus === 'Error' ? 'Error' : 
                         (
                            <span className="typing-container">
                                <span className="typing-text"></span>
                                <span className="typing-cursor">|</span>
                            </span>
                         )}
                    </p>
                </div>
                
                {/* Status/Call Time/Error with enhanced visibility */}
                {isCalling && (
                    <div className="flex items-center gap-1 text-[9px] text-[#7367f0] relative z-10 justify-end w-full">
                        <span className="drop-shadow-[0_0_4px_rgba(115,103,240,0.5)]">{callTime}s</span>
                        <svg className="w-2 h-2 drop-shadow-[0_0_4px_rgba(115,103,240,0.5)]" viewBox="0 0 24 24" fill="none">
                            <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                    </div>
                )}
                {error && (
                    <span className="text-red-400 text-[9px] px-2 py-0.5 bg-red-500/20 rounded-full relative z-10 drop-shadow-[0_0_4px_rgba(239,68,68,0.5)] text-right w-full block">
                        {error}
                    </span>
                )}
            </div>

            <style>{`
                .typing-container {
                    position: relative;
                    display: inline-block;
                    width: 100%;
                }
                .typing-text {
                    display: inline-block;
                    overflow: hidden;
                    white-space: nowrap;
                    animation: typing 4s steps(40, end) infinite;
                }
                .typing-text::before {
                    content: "Feel free to talk to me";
                    animation: typingText 12s linear infinite;
                }
                .typing-cursor {
                    display: inline-block;
                    animation: blink 1s step-end infinite;
                }
                @keyframes typingText {
                  0%, 33% { content: "Feel free to talk to me\u00A0\u00A0"; }
                  34%, 66% { content: "Ask me anything\u00A0\u00A0"; }
                  67%, 100% { content: "I'm sofia here ....\u00A0\u00A0"; }
                }
                @keyframes typing {
                    0%, 100% { width: 0; }
                    20%, 80% { width: 100%; }
                }
                @keyframes blink {
                    from, to { opacity: 1 }
                    50% { opacity: 0 }
                }
                .animate-voice-wave {
                    animation: voiceWave 12s linear infinite;
                }
                .animate-voice-wave-active {
                    animation: voiceWave 4s linear infinite;
                }
                @keyframes voiceWave {
                    0% { stroke-dashoffset: 0; transform: scale(1); }
                    50% { transform: scale(1.05); }
                    100% { stroke-dashoffset: 440; transform: scale(1); }
                }
                .animate-voice-wave2 {
                    animation: voiceWave2 15s linear infinite;
                }
                .animate-voice-wave2-active {
                    animation: voiceWave2 6s linear infinite;
                }
                @keyframes voiceWave2 {
                    0% { stroke-dashoffset: 0; transform: scale(1); }
                    50% { transform: scale(1.08); }
                    100% { stroke-dashoffset: 314; transform: scale(1); }
                }
                .animate-voice-glow {
                    animation: voiceGlow 6s ease-in-out infinite alternate;
                }
                .animate-voice-glow-active {
                    animation: voiceGlowActive 3s ease-in-out infinite alternate;
                }
                @keyframes voiceGlow {
                    0% { filter: blur(2px) brightness(1); opacity: 0.5; }
                    100% { filter: blur(4px) brightness(1.3); opacity: 0.7; }
                }
                @keyframes voiceGlowActive {
                    0% { filter: blur(3px) brightness(1.3); opacity: 0.7; }
                    0% { filter: blur(3px) brightness(1.2); opacity: 0.6; }
                    100% { filter: blur(6px) brightness(1.4); opacity: 0.8; }
                }
                .animate-voice-pulse {
                    animation: voicePulse 2s infinite alternate;
                }
                @keyframes voicePulse {
                    0% { box-shadow: 0 0 15px 3px rgba(79, 172, 254, 0.3); }
                    100% { box-shadow: 0 0 30px 6px rgba(79, 172, 254, 0.5); }
                }
            `}</style>
        </div>
    );
};