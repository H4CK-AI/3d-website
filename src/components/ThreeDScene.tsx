import React, { useRef, useState, useEffect, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Stars, Text, Float, Sphere, Box, Torus, Billboard } from '@react-three/drei'
import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing'
import * as THREE from 'three'
import gsap from 'gsap'

// Enhanced floating sphere component with premium animations
const ServiceNode = ({ position = [0, 0, 0], color = "#9b87f5", size = 0.5, text = "", hover = 0, shape = "sphere" }) => {
  const meshRef = useRef<THREE.Mesh>(null!)
  const textRef = useRef<THREE.Mesh>(null!)
  const [hovered, setHovered] = useState(false)
  
  useEffect(() => {
    if (hovered && meshRef.current) {
      gsap.to(meshRef.current.scale, { x: 1.5, y: 1.5, z: 1.5, duration: 0.4, ease: "back.out(1.7)" })
      if (textRef.current) {
        gsap.to(textRef.current.scale, { x: 1.2, y: 1.2, z: 1.2, duration: 0.3 })
      }
    } else if (meshRef.current) {
      gsap.to(meshRef.current.scale, { x: 1, y: 1, z: 1, duration: 0.4, ease: "back.out(1.7)" })
      if (textRef.current) {
        gsap.to(textRef.current.scale, { x: 1, y: 1, z: 1, duration: 0.3 })
      }
    }
  }, [hovered])

  useFrame((state) => {
    if (meshRef.current) {
      // Premium floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.3 * hover
      meshRef.current.position.x = position[0] + Math.cos(state.clock.elapsedTime * 1.5 + position[2]) * 0.1 * hover
      
      // Continuous rotation with premium easing
      meshRef.current.rotation.x += 0.01
      meshRef.current.rotation.y += 0.015
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  const renderShape = () => {
    const shapeProps = {
      ref: meshRef,
      onPointerOver: () => setHovered(true),
      onPointerOut: () => setHovered(false),
      castShadow: true,
      receiveShadow: true
    }

    const material = (
      <meshStandardMaterial 
        color={color} 
        roughness={0.2} 
        metalness={0.9}
        emissive={color}
        emissiveIntensity={hovered ? 0.6 : 0.2}
        transparent
        opacity={0.9}
      />
    )

    switch (shape) {
      case 'box':
        return <Box {...shapeProps} args={[size, size, size]}>{material}</Box>
      case 'torus':
        return <Torus {...shapeProps} args={[size, size * 0.4, 16, 100]}>{material}</Torus>
      default:
        return <Sphere {...shapeProps} args={[size, 32, 32]}>{material}</Sphere>
    }
  }

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={2}>
      <group position={[position[0], position[1], position[2]]}>
        {renderShape()}
        {text && (
          <Billboard>
            <Text
              ref={textRef}
              position={[0, size + 0.8, 0]}
              fontSize={0.15}
              color="white"
              anchorX="center"
              anchorY="middle"
              material-transparent
              material-opacity={0.95}
            >
              {text}
            </Text>
          </Billboard>
        )}
        
        {/* Enhanced glow effect */}
        <mesh position={[0, 0, 0]} scale={[2, 2, 2]}>
          <sphereGeometry args={[size, 16, 16]} />
          <meshBasicMaterial 
            color={color} 
            transparent 
            opacity={hovered ? 0.15 : 0.05}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>
    </Float>
  )
}

// Enhanced connection line with animation
const ConnectionLine = ({ start, end, color = "#ffffff" }) => {
  const ref = useRef<THREE.LineSegments>()
  
  useFrame(({ clock }) => {
    if (ref.current) {
      const opacity = 0.3 + Math.sin(clock.elapsedTime * 2) * 0.2
      if (ref.current.material instanceof THREE.LineBasicMaterial) {
        ref.current.material.opacity = opacity
      }
    }
  })
  
  useEffect(() => {
    if (ref.current) {
      const points = [
        new THREE.Vector3(...start),
        new THREE.Vector3(...end)
      ]
      const geometry = new THREE.BufferGeometry().setFromPoints(points)
      ref.current.geometry = geometry
    }
  }, [start, end])
  
  return (
    <lineSegments ref={ref}>
      <bufferGeometry />
      <lineBasicMaterial color={color} transparent opacity={0.3} />
    </lineSegments>
  )
}

// Enhanced orbital path with glow
const OrbitalPath = ({ radius = 3, color = "#6e59a5", segments = 128 }) => {
  const pathRef = useRef<THREE.Mesh>(null!)
  
  useFrame(({ clock }) => {
    if (pathRef.current) {
      const intensity = 0.2 + Math.sin(clock.elapsedTime) * 0.1
      if (pathRef.current.material instanceof THREE.MeshBasicMaterial) {
        pathRef.current.material.opacity = intensity
      }
    }
  })

  return (
    <group>
      <mesh ref={pathRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius - 0.02, radius + 0.02, segments]} />
        <meshBasicMaterial color={color} transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Glow ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius - 0.1, radius + 0.1, segments]} />
        <meshBasicMaterial 
          color={color} 
          transparent 
          opacity={0.1} 
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  )
}

// Enhanced rotating orbital group
const ServiceOrbit = ({ radius = 3, speed = 0.5, height = 0, services = [], color = "#9b87f5", shape = "sphere" }) => {
  const groupRef = useRef<THREE.Group>(null!)
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * speed * 0.1
    }
  })
  
  return (
    <group ref={groupRef}>
      <OrbitalPath radius={radius} color={color} />
      {services.map((service, index) => {
        const angle = (index / services.length) * Math.PI * 2
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        return (
          <ServiceNode 
            key={index} 
            position={[x, height, z]} 
            color={color} 
            text={service} 
            hover={1}
            shape={shape}
            size={0.6}
          />
        )
      })}
    </group>
  )
}

// Enhanced starfield with more depth
const StarField = () => {
  return (
    <group>
      <Stars radius={200} depth={150} count={20000} factor={8} saturation={0.4} fade speed={2} />
      <Stars radius={300} depth={200} count={15000} factor={12} saturation={0.6} fade speed={1.5} />
      <Stars radius={400} depth={250} count={10000} factor={16} saturation={0.8} fade speed={1} />
    </group>
  )
}

// Enhanced central globe with better materials
const CentralGlobe = () => {
  const globeRef = useRef<THREE.Mesh>(null!)
  
  useFrame(({ clock }) => {
    if (globeRef.current) {
      globeRef.current.rotation.y = clock.elapsedTime * 0.1
      globeRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.3) * 0.1
    }
  })
  
  return (
    <group>
      <mesh ref={globeRef}>
        <sphereGeometry args={[1.2, 64, 64]} />
        <meshStandardMaterial 
          color="#ffd93d"
          roughness={0.1}
          metalness={0.8}
          emissive="#ffd93d"
          emissiveIntensity={0.3}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Outer glow sphere */}
      <mesh scale={[1.5, 1.5, 1.5]}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial 
          color="#ffd93d"
          transparent 
          opacity={0.1}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Text label */}
      <Text
        position={[0, 2.5, 0]}
        fontSize={0.4}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.03}
        outlineColor="#000000"
        material-transparent
        material-opacity={0.95}
      >
        NEXVORA
      </Text>
    </group>
  )
}

// Main scene component
const Scene = () => {
  const { camera } = useThree()
  const sceneGroupRef = useRef<THREE.Group>(null)
  
  useEffect(() => {
    camera.position.set(0, 3, 12)
    // Animate initial rotation using GSAP
    if (sceneGroupRef.current) {
      gsap.to(sceneGroupRef.current.rotation, {
        y: Math.PI, // Rotate 180 degrees
        duration: 3, // Animation duration in seconds
        ease: "power2.out"
      });
    }
  }, [camera])

  // Enhanced service arrays with more variety
  const bpmServices = ["Customer Support", "Data Entry", "Back Office", "Recruitment", "Finance & Accounting"]
  const lpoServices = ["Legal Review", "Contract Analysis", "Compliance", "Research", "Documentation"]
  const itServices = ["Development", "Cloud Services", "Cybersecurity", "Data Analytics", "AI Solutions"]
  
  // Enhanced vibrant color palette
  const colors = {
    bpm: "#ff6b6b",      // Coral red
    lpo: "#4ecdc4",      // Turquoise
    it: "#45b7d1",       // Sky blue
    center: "#ffd93d",   // Golden yellow
    accent1: "#6c5ce7",  // Purple
    accent2: "#a29bfe",  // Light purple
    accent3: "#fd79a8"   // Pink
  }
  
  return (
    <>
      {/* Enhanced lighting setup */}
      <ambientLight intensity={0.5} color="#ffffff" />
      <pointLight position={[10, 10, 10]} intensity={2} color={colors.accent1} />
      <pointLight position={[-10, -10, -10]} intensity={1.2} color={colors.accent2} />
      <pointLight position={[0, 15, 0]} intensity={1.5} color={colors.accent3} />
      <spotLight 
        position={[0, 20, 0]} 
        angle={0.3} 
        penumbra={1} 
        intensity={2} 
        color={colors.center}
        castShadow
      />
      
      <StarField />
      
      {/* Group for rotating elements */}
      <group ref={sceneGroupRef}>
        {/* Enhanced central globe */}
        <CentralGlobe />
        
        {/* Enhanced Service Orbits with different shapes and improved animations */}
        <ServiceOrbit 
          radius={5} 
          speed={0.4} 
          height={0} 
          services={bpmServices} 
          color={colors.bpm} 
          shape="sphere"
        />
        <ServiceOrbit 
          radius={7.5} 
          speed={-0.25} 
          height={1.5} 
          services={lpoServices} 
          color={colors.lpo} 
          shape="box"
        />
        <ServiceOrbit 
          radius={10} 
          speed={0.2} 
          height={-1.2} 
          services={itServices} 
          color={colors.it} 
          shape="torus"
        />
        
        {/* Enhanced connections with multiple colors and better animations */}
        <ConnectionLine start={[0, 0, 0]} end={[0, 0, 5]} color={colors.bpm} />
        <ConnectionLine start={[0, 0, 0]} end={[0, 1.5, 7.5]} color={colors.lpo} />
        <ConnectionLine start={[0, 0, 0]} end={[0, -1.2, 10]} color={colors.it} />
        
        {/* Additional dynamic connections */}
        <ConnectionLine start={[3, 0, 3]} end={[-3, 1, -3]} color={colors.accent1} />
        <ConnectionLine start={[-4, 0, 2]} end={[4, -1, -4]} color={colors.accent2} />
        <ConnectionLine start={[2, 2, -2]} end={[-2, -2, 4]} color={colors.accent3} />
      </group>
      
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 1.5}
        enableDamping={true}
        dampingFactor={0.1}
        autoRotate={true}
      />
    </>
  )
}

// Enhanced loading fallback
const LoadingFallback = () => (
  <div className="h-full w-full flex items-center justify-center bg-cosmic-dark">
    <div className="text-white text-center p-8">
      <div className="animate-spin w-16 h-16 border-4 border-cosmic-accent border-t-transparent rounded-full mx-auto mb-4"></div>
      <h2 className="text-2xl mb-4 cosmic-text-gradient">Loading 3D Universe...</h2>
      <p className="text-white/60">Initializing premium 3D experience</p>
    </div>
  </div>
)

// Enhanced error boundary
class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    console.error("3D Scene Error:", error);
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("Three.js rendering error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-full w-full flex items-center justify-center bg-cosmic-dark">
          <div className="text-white text-center p-8">
            <h2 className="text-2xl mb-4 cosmic-text-gradient">3D Visualization Loading...</h2>
            <p className="text-white/60">Initializing premium 3D experience</p>
            <button 
              className="mt-6 px-6 py-3 bg-cosmic-accent rounded-lg hover:bg-cosmic-highlight transition-colors"
              onClick={() => this.setState({ hasError: false })}
            >
              Retry
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const ThreeDScene = () => {
  return (
    <div className="h-screen w-full relative">
      <Canvas 
        shadows 
        dpr={[1, 2]} 
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        camera={{ position: [0, 3, 12], fov: 75 }}
      >
        <ErrorBoundary>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </ErrorBoundary>
      </Canvas>
      
      {/* Enhanced overlay text with better animations */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10 pointer-events-none">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold cosmic-text-gradient mb-6 animate-fade-in">
          Nexvora Outsourcing
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.3s' }}>
          Scale Your Business. Explore the Universe of Outsourcing Solutions.
        </p>
        
        {/* Enhanced premium glow effect */}
        <div className="absolute inset-0 bg-gradient-radial from-cosmic-accent/20 via-transparent to-transparent blur-3xl -z-10"></div>
      </div>
      
      {/* Enhanced scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce pointer-events-none">
        <div className="flex flex-col items-center">
          <span className="text-sm mb-2">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThreeDScene
