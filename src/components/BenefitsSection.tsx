import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const BenefitItem = ({ number, title, description }) => {
  const itemRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const element = itemRef.current
    
    if (element) {
      gsap.fromTo(element,
        { opacity: 0, x: -50 },
        { 
          opacity: 1, 
          x: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: element,
            start: "top bottom-=100",
            toggleActions: "play none none none"
          }
        }
      )
    }
  }, [])
  
  return (
    <div ref={itemRef} className="flex mb-10">
      <div className="mr-6 flex-shrink-0">
        <div className="w-12 h-12 rounded-full bg-cosmic-accent/20 flex items-center justify-center border border-cosmic-accent/30">
          <span className="text-cosmic-highlight font-bold">{number}</span>
        </div>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
        <p className="text-white/70">{description}</p>
      </div>
    </div>
  )
}

const BenefitsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  
  useEffect(() => {
    const heading = headingRef.current
    
    if (heading) {
      gsap.fromTo(heading, 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: heading,
            start: "top bottom-=100",
            toggleActions: "play none none none"
          }
        }
      )
    }
  }, [])
  
  const benefits = [
    {
      number: "01",
      title: "Cost Optimization",
      description: "Reduce operational costs by up to 70% while maintaining or improving service quality and business outcomes."
    },
    {
      number: "02",
      title: "Global Talent Access",
      description: "Leverage our worldwide network of skilled professionals to find the perfect fit for your specific business needs."
    },
    {
      number: "03",
      title: "Scalable Operations",
      description: "Quickly scale your operations up or down based on demand without the constraints of traditional hiring processes."
    },
    {
      number: "04",
      title: "Focus on Core Business",
      description: "Delegate non-core functions to our specialists while your team concentrates on strategic initiatives and growth."
    },
    {
      number: "05",
      title: "24/7 Service Delivery",
      description: "Benefit from round-the-clock operations across different time zones for continuous productivity and support."
    }
  ]

  return (
    <section ref={sectionRef} className="py-24 bg-cosmic-dark relative overflow-hidden">
      {/* Orbital decorations */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-cosmic-accent/5 rounded-full pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-cosmic-accent/10 rounded-full pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-cosmic-accent/15 rounded-full pointer-events-none"></div>
      
      <div className="orbit-element w-4 h-4 bg-cosmic-highlight/50 rounded-full blur-sm top-1/2 left-1/2 animate-orbit"></div>
      <div className="orbit-element w-3 h-3 bg-cosmic-accent/60 rounded-full blur-sm top-1/2 left-1/2 animate-orbit-slow"></div>
      <div className="orbit-element w-2 h-2 bg-white/70 rounded-full blur-sm top-1/2 left-1/2 animate-orbit-fast"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <h2 ref={headingRef} className="text-4xl md:text-5xl font-bold mb-10 cosmic-text-gradient">Why Choose Nexvora Outsourcing</h2>
          
          <div>
            {benefits.map((benefit, index) => (
              <BenefitItem 
                key={index}
                number={benefit.number}
                title={benefit.title}
                description={benefit.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default BenefitsSection
