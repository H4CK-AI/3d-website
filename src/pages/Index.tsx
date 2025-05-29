import { useRef, useEffect } from 'react'
import Header from '@/components/Header'
import ThreeDScene from '@/components/ThreeDScene'
import LiquidBackground from '@/components/LiquidBackground'
import AnimatedBackground from '@/components/AnimatedBackground'
import ServiceSection from '@/components/ServiceSection'
import BenefitsSection from '@/components/BenefitsSection'
import CallToAction from '@/components/CallToAction'
import Footer from '@/components/Footer'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger)

const Index = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    // Initialize any GSAP animations or scrolltriggers here
    ScrollTrigger.refresh()
    
    // Cleanup when component unmounts
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  useEffect(() => {
    // Attempt to force layout recalculation by dispatching a resize event
    const resizeTimer = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
      console.log('Dispatched resize event.'); // Optional: for debugging
    }, 1500); // Adjust delay as needed, giving time for 3D scene

    return () => clearTimeout(resizeTimer);
  }, []); // Run once after initial render
  
  return (
    <>
      <AnimatedBackground />
      <div ref={scrollContainerRef} className="scene-container relative z-10 pt-px min-h-screen" style={{ height: 'auto' }}>
        {/* Fixed Header */}
        <Header />
        
        {/* Hero Section with 3D Scene */}
        <section id="hero" className="relative" style={{ height: 'calc(100vh - 1px)' }}>
          <ThreeDScene />
        </section>
        
        {/* Services Section */}
        <ServiceSection />
        
        {/* Benefits Section */}
        <BenefitsSection />
        
        {/* Call To Action */}
        <CallToAction />
        
        {/* Get in Touch Section */}
        <section id="get-in-touch" className="bg-cosmic-dark py-16">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold cosmic-text-gradient mb-6">Get in Touch</h2>
            <p className="text-white/70 mb-8 max-w-2xl mx-auto">Ready to scale your business? Contact us today to learn how our outsourcing solutions can help you achieve your goals.</p>
            
            <Link to="/contact" className="cosmic-button inline-block">
              Contact Us
            </Link>
          </div>
        </section>
        
        {/* Footer */}
        <Footer />
      </div>
    </>
  )
}

export default Index
