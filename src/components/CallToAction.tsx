import { useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CallToAction = () => {
  const ctaRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const element = ctaRef.current
    
    if (element) {
      gsap.fromTo(element,
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0,
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
    <section className="py-20 bg-cosmic-gradient relative overflow-hidden">
      {/* Decorative stars */}
      <div className="absolute top-0 left-0 w-full h-full star-field opacity-20 pointer-events-none"></div>
      
      {/* Floating elements */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-star-twinkle"></div>
      <div className="absolute top-1/3 left-2/3 w-3 h-3 bg-cosmic-highlight rounded-full animate-star-twinkle" style={{ animationDelay: "0.5s" }}></div>
      <div className="absolute top-2/3 left-1/5 w-2 h-2 bg-cosmic-accent rounded-full animate-star-twinkle" style={{ animationDelay: "1s" }}></div>
      
      <div ref={ctaRef} className="container mx-auto px-4">
        <div className="bg-cosmic-subtle/30 backdrop-blur-xl border border-cosmic-accent/20 rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 cosmic-text-gradient">Ready to Explore the Universe of Outsourcing?</h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">
            Let's discuss how Nexvora's outsourcing solutions can help your business reach new heights while optimizing costs and improving efficiency.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button className="cosmic-button text-lg py-6 px-8">Schedule a Consultation</Button>
            <Button variant="outline" className="border-cosmic-accent/50 text-white hover:bg-cosmic-accent/20 text-lg py-6 px-8">
              Explore Services
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CallToAction
