
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

interface AnimatedSphereProps {
  position: [number, number, number];
  color: string;
  speed?: number;
}

const AnimatedSphere: React.FC<AnimatedSphereProps> = ({ position, color, speed = 1 }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * speed) * 0.3;
      meshRef.current.rotation.y = clock.getElapsedTime() * speed * 0.2;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[1, 100, 200]} position={position}>
        <MeshDistortMaterial
          color={color}
          distort={0.3}
          speed={2}
          roughness={0}
          transparent
          opacity={0.6}
        />
      </Sphere>
    </Float>
  );
};

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        
        <AnimatedSphere position={[-4, 2, 0]} color="#9b87f5" speed={0.8} />
        <AnimatedSphere position={[4, -2, -2]} color="#6e59a5" speed={1.2} />
        <AnimatedSphere position={[0, 0, -4]} color="#8E9196" speed={0.6} />
        <AnimatedSphere position={[-2, -4, -1]} color="#f97316" speed={1.1} />
        <AnimatedSphere position={[3, 3, -3]} color="#06b6d4" speed={0.9} />
      </Canvas>
    </div>
  );
};

export default AnimatedBackground;
