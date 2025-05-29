
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface LiquidBackgroundProps {
  intensity?: number;
  children: React.ReactNode;
}

const LiquidBackground: React.FC<LiquidBackgroundProps> = ({ intensity = 1, children }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      containerRef.current.style.setProperty('--mouse-x', `${x * 100}%`);
      containerRef.current.style.setProperty('--mouse-y', `${y * 100}%`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="liquid-container relative">
      {/* Animated liquid blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="liquid-blob blob-1"
          animate={{
            x: [0, 100, 0, -100, 0],
            y: [0, -100, 100, 50, 0],
            scale: [1, 1.2, 0.8, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="liquid-blob blob-2"
          animate={{
            x: [0, -150, 50, 100, 0],
            y: [0, 100, -50, -100, 0],
            scale: [1, 0.7, 1.3, 0.9, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
            delay: 5
          }}
        />
        <motion.div
          className="liquid-blob blob-3"
          animate={{
            x: [0, 80, -120, 60, 0],
            y: [0, -80, 40, 100, 0],
            scale: [1, 1.1, 0.6, 1.4, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
            delay: 10
          }}
        />
      </div>

      {/* Interactive gradient overlay */}
      <div className="gradient-overlay absolute inset-0" />
      
      {/* Floating particles */}
      <div className="particles-container absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
            }}
            animate={{
              y: [null, -20, 20, -10, 0],
              opacity: [0.3, 0.8, 0.2, 0.6, 0.3],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {children}
    </div>
  );
};

export default LiquidBackground;
