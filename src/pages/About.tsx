import { useRef, useEffect, Suspense } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MotionGraphics from '@/components/MotionGraphics';
import EnhancedAnimatedBackground, { AnimatedShape, ParticleSystem } from '@/components/EnhancedAnimatedBackground';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Avatar } from "@/components/ui/avatar";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas } from '@react-three/fiber';

gsap.registerPlugin(ScrollTrigger);

const TeamMember = ({ name, role, imageSrc, delay = 0 }) => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="flex flex-col items-center"
    >
      <Avatar className="h-32 w-32 mb-4 ring-2 ring-cosmic-accent/30 ring-offset-4 ring-offset-cosmic-dark">
        <ImagePlaceholder 
          src={imageSrc}
          alt={name}
          className="object-cover w-full h-full rounded-full"
        />
      </Avatar>
      <h4 className="text-xl font-semibold mb-1">{name}</h4>
      <p className="text-cosmic-highlight">{role}</p>
    </motion.div>
  );
};

const CounterItem = ({ value, label, delay = 0 }) => {
  const counterRef = useRef(null);
  
  useEffect(() => {
    const counter = counterRef.current;
    ScrollTrigger.create({
      trigger: counter,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(counter, {
          innerHTML: value,
          duration: 2,
          ease: "power2.out",
          snap: { innerHTML: 1 },
        });
      },
      once: true
    });
  }, [value]);

  return (
    <motion.div 
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="text-center p-6"
    >
      <h3 ref={counterRef} className="text-5xl font-bold cosmic-text-gradient mb-2">0</h3>
      <p className="text-white/70">{label}</p>
    </motion.div>
  );
};

const About = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [1, 0.8, 0.4, 0]);
  
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <div className="min-h-screen relative">
      <MotionGraphics />
      <EnhancedAnimatedBackground />

      <div className="relative z-10 min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow pt-20">
          {/* Our Story */}
          <section className="py-24 relative">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-1 gap-12 items-center">
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="text-left"
                >
                  <h2 className="text-3xl md:text-4xl font-bold cosmic-text-gradient mb-6">Our Story</h2>
                  <p className="text-white/70 mb-4 leading-relaxed">
                    Founded in 2015, Nexvora emerged from a vision to transform how businesses approach outsourcing. We recognized that traditional outsourcing models were becoming obsolete in the face of rapid technological advancement.
                  </p>
                  <p className="text-white/70 mb-4 leading-relaxed">
                    What began as a small team of passionate experts has grown into a global company with offices in 5 countries and over 500 skilled professionals. Our growth has been driven by our unwavering commitment to innovation and excellence.
                  </p>
                  <p className="text-white/70 leading-relaxed">
                    Today, we continue to push boundaries by leveraging cutting-edge technologies like AI and automation to deliver outsourcing solutions that not only meet current needs but anticipate future challenges.
                  </p>
                </motion.div>
                
              </div>
            </div>
          </section>
          
          {/* Stats Section */}
          <section className="py-20 bg-cosmic-subtle/30">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <CounterItem value="500" label="Team Members" delay={0} />
                <CounterItem value="300" label="Projects Completed" delay={0.1} />
                <CounterItem value="95" label="Client Satisfaction %" delay={0.2} />
                <CounterItem value="15" label="Industry Awards" delay={0.3} />
              </div>
            </div>
          </section>
          
          {/* Values Section */}
          <section className="py-24">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-4xl font-bold cosmic-text-gradient mb-4">Our Core Values</h2>
                <p className="text-white/70 max-w-2xl mx-auto">
                  The principles that guide everything we do at Nexvora
                </p>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[{
                    title: "Innovation",
                    description: "We constantly explore new technologies and methodologies to deliver cutting-edge solutions.",
                    graphic: (
                      <Canvas camera={{ position: [0, 0, 3], fov: 75 }}>
                        <ambientLight intensity={0.8} />
                        <pointLight position={[5, 5, 5]} intensity={1} />
                        <AnimatedShape position={[0, 0, 0]} color="#ff6b6b" shape="sphere" size={0.8} speed={2} />
                      </Canvas>
                    )
                  },
                  {
                    title: "Excellence",
                    description: "We are committed to delivering the highest quality solutions that exceed expectations.",
                     graphic: (
                      <Canvas camera={{ position: [0, 0, 3], fov: 75 }}>
                        <ambientLight intensity={0.8} />
                        <pointLight position={[5, 5, 5]} intensity={1} />
                        <AnimatedShape position={[0, 0, 0]} color="#4ecdc4" shape="box" size={0.8} speed={2.5} />
                      </Canvas>
                    )
                  },
                  {
                    title: "Partnership",
                    description: "We build lasting relationships with our clients based on trust, transparency and mutual growth.",
                    graphic: (
                      <Canvas camera={{ position: [0, 0, 3], fov: 75 }}>
                        <ambientLight intensity={0.8} />
                        <pointLight position={[5, 5, 5]} intensity={1} />
                        <AnimatedShape position={[0, 0, 0]} color="#45b7d1" shape="torus" size={0.8} speed={1.8} />
                      </Canvas>
                    )
                  },
                ].map((value, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.2 }}
                    className="bg-cosmic-subtle/30 backdrop-blur-sm border border-cosmic-accent/20 rounded-xl p-8 text-center flex flex-col items-center"
                  >
                    <div className="w-32 h-32 mx-auto mb-6 flex items-center justify-center">
                       {value.graphic}
                    </div>
                    <h3 className="text-2xl font-semibold mb-4">{value.title}</h3>
                    <p className="text-white/70 leading-relaxed">{value.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
          
          {/* Leadership Team */}
          <section className="py-24 bg-gradient-to-b from-cosmic-dark via-cosmic-subtle/50 to-cosmic-dark">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-4xl font-bold cosmic-text-gradient mb-4">Our Leadership Team</h2>
                <p className="text-white/70 max-w-2xl mx-auto">
                  Meet the visionaries driving Nexvora's mission forward
                </p>
              </motion.div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <TeamMember 
                  name="Alex Chen" 
                  role="CEO & Founder" 
                  imageSrc="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face" 
                  delay={0}
                />
                <TeamMember 
                  name="Sarah Johnson" 
                  role="CTO" 
                  imageSrc="https://images.unsplash.com/photo-1494790108755-2616b612b13c?w=400&h=400&fit=crop&crop=face" 
                  delay={0.1}
                />
                <TeamMember 
                  name="Michael Patel" 
                  role="COO" 
                  imageSrc="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face" 
                  delay={0.2}
                />
                <TeamMember 
                  name="Jessica Wong" 
                  role="CFO" 
                  imageSrc="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face" 
                  delay={0.3}
                />
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default About;
