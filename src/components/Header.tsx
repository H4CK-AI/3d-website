
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"

const NavLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
  <Link 
    to={href} 
    className="text-white/70 hover:text-white transition-colors relative group px-4 py-2"
  >
    <span className="relative z-10">{children}</span>
    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-cosmic-highlight transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
  </Link>
)

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      setScrolled(offset > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-cosmic-dark/80 backdrop-blur-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold cosmic-text-gradient">
          NEXVORA
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/services">Services</NavLink>
          <NavLink href="/about">About Us</NavLink>
          <NavLink href="/case-studies">Case Studies</NavLink>
          <NavLink href="/contact">Contact</NavLink>
          <Button className="ml-4 cosmic-button">
            Get Started
          </Button>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu />
        </button>
      </div>
      
      {/* Mobile Navigation */}
      <div className={`md:hidden bg-cosmic-dark/95 backdrop-blur-md transition-all duration-300 overflow-hidden ${mobileMenuOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
          <Link to="/" className="text-white/70 hover:text-white p-2" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link to="/services" className="text-white/70 hover:text-white p-2" onClick={() => setMobileMenuOpen(false)}>Services</Link>
          <Link to="/about" className="text-white/70 hover:text-white p-2" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
          <Link to="/case-studies" className="text-white/70 hover:text-white p-2" onClick={() => setMobileMenuOpen(false)}>Case Studies</Link>
          <Link to="/contact" className="text-white/70 hover:text-white p-2" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
          <Button className="cosmic-button w-full">Get Started</Button>
        </div>
      </div>
    </header>
  )
}

export default Header
