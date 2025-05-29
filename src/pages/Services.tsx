import { useRef, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LiquidBackground from '@/components/LiquidBackground';
import AnimatedBackground from '@/components/AnimatedBackground';
import { Card, CardContent } from "@/components/ui/card";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
import MotionGraphics from '@/components/MotionGraphics';
import EnhancedAnimatedBackground from '@/components/EnhancedAnimatedBackground';

gsap.registerPlugin(ScrollTrigger);

const ServiceCard = ({ title, description, icon, color, delay = 0 }) => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="w-full"
    >
      <Card className="h-full overflow-hidden bg-cosmic-subtle/30 backdrop-blur-sm border-cosmic-accent/20 hover:border-cosmic-accent/50 transition-all duration-300 card-3d group">
        <CardContent className="p-6 flex flex-col h-full relative">
          <div className="shimmer absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${color} morphing-shape relative z-10`}>
            {icon}
          </div>
          <h3 className="text-xl font-bold mb-2 relative z-10">{title}</h3>
          <p className="text-white/70 relative z-10">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ParallaxSection = ({ children, bgImage, speed = 0.5 }) => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);
  
  return (
    <div ref={sectionRef} className="relative overflow-hidden py-20 parallax-container">
      <motion.div 
        className="absolute inset-0 z-0 parallax-back"
        style={{ 
          y, 
          opacity,
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      <div className="relative z-10 container mx-auto px-4 parallax-front">
        {children}
      </div>
    </div>
  );
};

const StarField = () => {
  return (
    <div className="star-field absolute inset-0 opacity-40"></div>
  );
};

const Services = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  
  useEffect(() => {
    const containers = document.querySelectorAll('.animate-on-scroll');
    
    containers.forEach((container) => {
      gsap.from(container.querySelectorAll('.service-item'), {
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          toggleActions: "play none none none"
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2
      });
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen relative flex flex-col">
      <MotionGraphics />
      <EnhancedAnimatedBackground />
      <div className="min-h-screen flex flex-col relative z-10">
        <Header />
        
        <main className="flex-grow pt-20">
          {/* Hero Section */}
          <section className="relative h-[60vh] flex items-center overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
              <motion.h1 
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-7xl font-bold cosmic-text-gradient mb-4 text-center float-animation"
              >
                Our Services
              </motion.h1>
              <motion.p 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-xl md:text-2xl text-center max-w-3xl mx-auto text-white/80"
              >
                Discover how we can transform your business operations and drive growth
              </motion.p>
              
              <motion.div 
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1, repeat: Infinity, repeatType: "reverse" }}
              >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cosmic-highlight">
                  <path d="M7 13l5 5 5-5"></path>
                  <path d="M7 6l5 5 5-5"></path>
                </svg>
              </motion.div>
            </div>
          </section>
          
          {/* BPM Services */}
          <ParallaxSection bgImage="https://example.com/your-bpm-image.jpg">
            <div className="mb-12 text-center">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold cosmic-text-gradient mb-4">Business Process Management</h2>
                <p className="text-white/70 max-w-3xl mx-auto">Streamline your operations and optimize workflows with our comprehensive BPM solutions</p>
              </motion.div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-on-scroll">
              {[
                {
                  title: "Customer Support",
                  description: "24/7 multilingual customer support services to enhance customer satisfaction and retention.",
                  icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" /></svg>,
                  color: "bg-purple-500/20"
                },
                {
                  title: "Data Entry",
                  description: "Accurate and efficient data processing services to help you manage information effectively.",
                  icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
                  color: "bg-blue-500/20"
                },
                {
                  title: "Back Office",
                  description: "Comprehensive back-office support to handle administrative tasks and focus on core business.",
                  icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
                  color: "bg-indigo-500/20"
                },
                {
                  title: "Recruitment",
                  description: "End-to-end recruitment services to help you find and onboard the best talent for your team.",
                  icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
                  color: "bg-pink-500/20"
                },
                {
                  title: "Finance",
                  description: "Financial process outsourcing to streamline accounting, reporting, and compliance.",
                  icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
                  color: "bg-green-500/20"
                }
              ].map((service, i) => (
                <ServiceCard 
                  key={i} 
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  color={service.color}
                  delay={i * 0.1}
                />
              ))}
            </div>
          </ParallaxSection>
          
          {/* LPO Services */}
          <ParallaxSection bgImage="/images/galaxy-2.jpg" speed={0.3}>
            <div className="mb-12 text-center">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold cosmic-text-gradient mb-4">Legal Process Outsourcing</h2>
                <p className="text-white/70 max-w-3xl mx-auto">Expert legal services to support your business with compliance and legal documentation</p>
              </motion.div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-on-scroll">
              {[
                {
                  title: "Legal Review",
                  description: "Thorough review of legal documents and contracts by qualified professionals.",
                  icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
                  color: "bg-blue-600/20"
                },
                {
                  title: "Contract Analysis",
                  description: "Detailed analysis of contractual terms to identify risks and opportunities.",
                  icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>,
                  color: "bg-purple-600/20"
                },
                {
                  title: "Compliance",
                  description: "Ensure your business meets all regulatory requirements and industry standards.",
                  icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15a4 4 0 018 0c0 5.591-3.824 10.29-9 11.622-5.176-1.332-9-6.03-9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
                  color: "bg-red-500/20"
                }
              ].map((service, i) => (
                <ServiceCard 
                  key={i} 
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  color={service.color}
                  delay={i * 0.1}
                />
              ))}
            </div>
          </ParallaxSection>
          
          {/* IT Services */}
          <ParallaxSection bgImage="/images/galaxy-3.jpg" speed={0.7}>
            <div className="mb-12 text-center">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold cosmic-text-gradient mb-4">IT Services</h2>
                <p className="text-white/70 max-w-3xl mx-auto">Cutting-edge technology solutions to drive digital transformation and innovation</p>
              </motion.div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-on-scroll">
              {[
                {
                  title: "Development",
                  description: "Custom software development tailored to your business requirements and challenges.",
                  icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
                  color: "bg-cyan-500/20"
                },
                {
                  title: "Cloud Services",
                  description: "Secure and scalable cloud solutions for storage, computing, and application hosting.",
                  icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>,
                  color: "bg-blue-400/20"
                },
                {
                  title: "Cybersecurity",
                  description: "Robust security measures to protect your data, systems, and networks from threats.",
                  icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>,
                  color: "bg-red-600/20"
                },
                {
                  title: "Data Analytics",
                  description: "Transform raw data into actionable insights through advanced analytics solutions.",
                  icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
                  color: "bg-green-600/20"
                },
                {
                  title: "AI Solutions",
                  description: "Leverage artificial intelligence to automate processes and enhance decision-making.",
                  icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2 2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v10a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
                  color: "bg-purple-400/20"
                }
              ].map((service, i) => (
                <ServiceCard 
                  key={i} 
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  color={service.color}
                  delay={i * 0.1}
                />
              ))}
            </div>
          </ParallaxSection>
          
          {/* CTA Section */}
          <section className="py-20 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
              <div className="bg-cosmic-subtle/30 backdrop-blur-md border border-cosmic-accent/20 rounded-xl p-8 md:p-12 text-center">
                <motion.h2 
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-3xl md:text-4xl font-bold mb-6 cosmic-text-gradient"
                >
                  Ready to Transform Your Business?
                </motion.h2>
                <motion.p 
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-white/70 max-w-2xl mx-auto mb-8"
                >
                  Contact our experts today to discover how Nexvora's outsourcing solutions can help your business scale and thrive in today's competitive landscape.
                </motion.p>
                <motion.button
                  onClick={() => navigate('/contact')}
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="cosmic-button text-lg"
                >
                  Get Started Now
                </motion.button>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default Services;
