import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Box, Torus, MeshDistortMaterial, Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

interface AnimatedShapeProps {
  position: [number, number, number];
  color: string;
  speed?: number;
  shape?: 'sphere' | 'box' | 'torus';
  size?: number;
}

export const AnimatedShape: React.FC<AnimatedShapeProps> = ({ 
  position, 
  color, 
  speed = 1, 
  shape = 'sphere',
  size = 1 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock, camera }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * speed) * 0.3;
      meshRef.current.rotation.y = clock.getElapsedTime() * speed * 0.2;
      meshRef.current.rotation.z = Math.cos(clock.getElapsedTime() * speed * 0.5) * 0.1;
      
      // Floating movement
      meshRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * speed * 0.5) * 0.5;
      meshRef.current.position.x = position[0] + Math.cos(clock.getElapsedTime() * speed * 0.3) * 0.3;
    }
  });

  const geometry = useMemo(() => {
    switch (shape) {
      case 'box':
        return <Box ref={meshRef} args={[size, size, size]} position={position} />;
      case 'torus':
        return <Torus ref={meshRef} args={[size, size * 0.4, 16, 100]} position={position} />;
      default:
        return <Sphere ref={meshRef} args={[size, 32, 32]} position={position} />;
    }
  }, [shape, size, position]);

  return (
    <Float speed={speed} rotationIntensity={0.8} floatIntensity={1.2}>
      {React.cloneElement(geometry, {
        children: (
          <MeshDistortMaterial
            color={color}
            distort={0.4}
            speed={3}
            roughness={0.1}
            metalness={0.8}
            transparent
            opacity={0.7}
            emissive={color}
            emissiveIntensity={0.2}
          />
        )
      })}
    </Float>
  );
};

export const ParticleSystem: React.FC = () => {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(2000 * 3);
    const colors = new Float32Array(2000 * 3);
    
    for (let i = 0; i < 2000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
      
      const color = new THREE.Color();
      color.setHSL(Math.random() * 0.3 + 0.7, 0.8, 0.6);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    
    return { positions, colors };
  }, []);

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.05;
      particlesRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.1) * 0.1;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={2000}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={2000}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const EnhancedAnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#9b87f5" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <ParticleSystem />
        
        <AnimatedShape position={[-6, 3, 0]} color="#9b87f5" speed={0.8} shape="sphere" size={1.2} />
        <AnimatedShape position={[6, -3, -3]} color="#6e59a5" speed={1.2} shape="box" size={0.8} />
        <AnimatedShape position={[0, 0, -5]} color="#8E9196" speed={0.6} shape="torus" size={1} />
        <AnimatedShape position={[-3, -5, -2]} color="#f97316" speed={1.1} shape="sphere" size={0.9} />
        <AnimatedShape position={[5, 4, -4]} color="#06b6d4" speed={0.9} shape="box" size={1.1} />
        <AnimatedShape position={[2, -2, 2]} color="#ec4899" speed={1.3} shape="torus" size={0.7} />
        <AnimatedShape position={[-4, 2, 3]} color="#10b981" speed={0.7} shape="sphere" size={1.3} />
      </Canvas>
    </div>
  );
};

export default EnhancedAnimatedBackground;
