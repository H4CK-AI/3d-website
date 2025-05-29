
import { useRef, useEffect } from 'react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type ServiceProps = {
  icon: string;
  title: string;
  description: string;
}

const ServiceCard = ({ icon, title, description }: ServiceProps) => {
  return (
    <Card className="bg-cosmic-subtle/30 backdrop-blur-md border-cosmic-accent/20 p-6 card-3d h-full">
      <div className="text-cosmic-highlight text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-white/70 mb-6">{description}</p>
      <Button className="cosmic-button mt-auto">Learn More</Button>
    </Card>
  )
}

const ServiceSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const heading = headingRef.current
    const cards = cardsRef.current?.querySelectorAll('.card-3d')
    
    if (heading && cards) {
      gsap.fromTo(heading, 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: heading,
            start: "top bottom-=100",
            toggleActions: "play none none reverse"
          }
        }
      )
      
      gsap.fromTo(cards,
        { opacity: 0, y: 100, stagger: 0.2 },
        { 
          opacity: 1, 
          y: 0,
          stagger: 0.2,
          duration: 0.8,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top bottom-=50",
            toggleActions: "play none none reverse"
          }
        }
      )
    }
  }, [])

  const services = [
    {
      icon: "🌐",
      title: "Business Process Management",
      description: "Streamline your operations with our comprehensive BPM solutions, designed to optimize workflows and enhance efficiency across all departments."
    },
    {
      icon: "⚖️",
      title: "Legal Process Outsourcing",
      description: "Expert legal support services that reduce costs while maintaining the highest quality standards for contract management, research, and compliance."
    },
    {
      icon: "💻",
      title: "Information Technology",
      description: "Cutting-edge IT solutions that leverage the latest technologies to drive innovation, enhance security, and facilitate digital transformation."
    }
  ]

  return (
    <section ref={sectionRef} className="py-24 bg-cosmic-gradient relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full star-field opacity-30 pointer-events-none"></div>
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-cosmic-highlight/5 rounded-full blur-3xl animate-pulse-glow"></div>
      <div className="absolute bottom-1/3 right-1/3 w-40 h-40 bg-cosmic-accent/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }}></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 ref={headingRef} className="text-4xl md:text-5xl font-bold mb-6 cosmic-text-gradient">Our Core Services</h2>
          <p className="text-white/70 max-w-3xl mx-auto">
            We provide enterprise-grade outsourcing solutions that help businesses scale efficiently and focus on their core competencies.
          </p>
        </div>
        
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index} 
              icon={service.icon} 
              title={service.title} 
              description={service.description} 
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServiceSection
