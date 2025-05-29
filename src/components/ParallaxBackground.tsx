
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

// Parallax layer component
interface ParallaxLayerProps {
  texture: THREE.Texture | null;
  speed?: number;
  scale?: [number, number, number];
  position?: [number, number, number];
  opacity?: number;
}

const ParallaxLayer: React.FC<ParallaxLayerProps> = ({ 
  texture, 
  speed = 0.01, 
  scale = [30, 30, 1], 
  position = [0, 0, 0], 
  opacity = 0.3 
}) => {
  const mesh = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.rotation.z = clock.getElapsedTime() * speed;
    }
  });
  
  if (!texture) return null;
  
  return (
    <mesh ref={mesh} scale={scale} position={position}>
      <planeGeometry />
      <meshBasicMaterial 
        map={texture} 
        transparent={true} 
        opacity={opacity} 
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
};

interface ParticleFieldProps {
  count?: number;
  size?: number;
}

const ParticleField: React.FC<ParticleFieldProps> = ({ count = 3000, size = 0.01 }) => {
  const mesh = useRef<THREE.Points>(null);
  
  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.rotation.y = clock.getElapsedTime() * 0.03;
    }
  });
  
  useEffect(() => {
    if (mesh.current) {
      const particles = mesh.current.geometry as THREE.BufferGeometry;
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const radius = 5 + Math.random() * 10;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i3 + 2] = radius * Math.cos(phi);
      }
      particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    }
  }, [count]);
  
  return (
    <points ref={mesh}>
      <bufferGeometry />
      <pointsMaterial 
        size={size} 
        sizeAttenuation={true} 
        color="white" 
        transparent 
        opacity={0.5}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

interface ParallaxBackgroundProps {
  mouseMove?: boolean;
}

const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({ mouseMove = true }) => {
  const groupRef = useRef<THREE.Group>(null);
  const { camera, size } = useThree();
  const [nebulaTexture, setNebulaTexture] = useState<THREE.Texture | null>(null);
  
  // Load texture safely using THREE.TextureLoader directly
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(
      '/images/nebula.png',
      (texture) => {
        console.log('Nebula texture loaded successfully');
        setNebulaTexture(texture);
      },
      (progress) => {
        console.log('Loading progress:', progress);
      },
      (error) => {
        console.log('Could not load nebula texture, continuing without it:', error);
        setNebulaTexture(null);
      }
    );
  }, []);

  // Mouse-based camera movement for immersive parallax
  useEffect(() => {
    if (!mouseMove) return;
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / size.width) * 2 - 1;
      const y = -(event.clientY / size.height) * 2 + 1;
      camera.position.x = x * 1.5;
      camera.position.y = y * 1.5;
      camera.lookAt(0, 0, 0);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseMove, camera, size]);

  return (
    <group ref={groupRef}>
      {/* Deep star field */}
      <Stars radius={120} depth={60} count={7000} factor={4} saturation={0} fade speed={1.2} />
      
      {/* Parallax nebula layer (if texture loaded) */}
      {nebulaTexture && (
        <ParallaxLayer texture={nebulaTexture} speed={0.02} scale={[40, 40, 1]} position={[0, 0, -20]} opacity={0.35} />
      )}
      
      {/* Particle field for extra depth */}
      <ParticleField count={2000} />
    </group>
  );
};

export default ParallaxBackground;
