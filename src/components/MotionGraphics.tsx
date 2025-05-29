
import React, { useRef, useEffect } from 'react';
import { motion, useAnimationFrame } from 'framer-motion';
import * as THREE from 'three';

interface FloatingParticleProps {
  index: number;
  totalParticles: number;
}

const FloatingParticle: React.FC<FloatingParticleProps> = ({ index, totalParticles }) => {
  const angle = (index / totalParticles) * Math.PI * 2;
  const radius = 200 + Math.sin(index * 0.5) * 100;
  
  return (
    <motion.div
      className="absolute w-1 h-1 bg-cosmic-highlight/60 rounded-full"
      initial={{
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        opacity: 0
      }}
      animate={{
        x: [
          Math.cos(angle) * radius,
          Math.cos(angle + 0.5) * (radius + 50),
          Math.cos(angle + 1) * radius,
          Math.cos(angle + 1.5) * (radius - 50),
          Math.cos(angle + 2) * radius
        ],
        y: [
          Math.sin(angle) * radius,
          Math.sin(angle + 0.5) * (radius + 50),
          Math.sin(angle + 1) * radius,
          Math.sin(angle + 1.5) * (radius - 50),
          Math.sin(angle + 2) * radius
        ],
        opacity: [0, 0.8, 0.6, 0.9, 0],
        scale: [0.5, 1.2, 0.8, 1.5, 0.5]
      }}
      transition={{
        duration: 15 + index * 0.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: index * 0.1
      }}
    />
  );
};

const MotionGraphics: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useAnimationFrame(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      container.style.transform = `translate(${mousePos.current.x * 20}px, ${mousePos.current.y * 20}px)`;
    }
  });

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Animated Background Gradient */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(155, 135, 245, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 20%, rgba(110, 89, 165, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 40% 80%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 60% 30%, rgba(249, 115, 22, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, rgba(155, 135, 245, 0.3) 0%, transparent 50%)"
          ]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating Particles */}
      <div ref={containerRef} className="absolute inset-0 flex items-center justify-center">
        {Array.from({ length: 50 }).map((_, i) => (
          <FloatingParticle key={i} index={i} totalParticles={50} />
        ))}
      </div>

      {/* Geometric Shapes */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-32 h-32 border border-cosmic-accent/30 rotate-45"
        animate={{ rotate: [45, 405] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-24 h-24 rounded-full border-2 border-cosmic-highlight/40"
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.4, 0.8, 0.4]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Flowing Lines */}
      <svg className="absolute inset-0 w-full h-full">
        <motion.path
          d="M0,100 Q400,50 800,100 T1600,100"
          stroke="rgba(155, 135, 245, 0.3)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 0.6, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M0,200 Q400,150 800,200 T1600,200"
          stroke="rgba(6, 182, 212, 0.3)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 0.6, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </svg>

      {/* Pulsing Orbs */}
      <motion.div
        className="absolute top-1/3 right-1/3 w-4 h-4 bg-cosmic-highlight rounded-full"
        animate={{
          scale: [1, 2, 1],
          opacity: [0.3, 0.8, 0.3],
          boxShadow: [
            "0 0 20px rgba(155, 135, 245, 0.3)",
            "0 0 40px rgba(155, 135, 245, 0.6)",
            "0 0 20px rgba(155, 135, 245, 0.3)"
          ]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};

export default MotionGraphics;
