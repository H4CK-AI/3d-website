
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-cosmic-dark py-16 border-t border-cosmic-accent/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold cosmic-text-gradient mb-6">NEXVORA</h3>
            <p className="text-white/70 mb-6">
              Empowering enterprises with next-generation outsourcing solutions to optimize operations and drive business growth.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/70 hover:text-cosmic-highlight transition-colors" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a href="#" className="text-white/70 hover:text-cosmic-highlight transition-colors" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
              <a href="#" className="text-white/70 hover:text-cosmic-highlight transition-colors" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><Link to="/services/bpm" className="text-white/70 hover:text-cosmic-highlight transition-colors">Business Process Management</Link></li>
              <li><Link to="/services/lpo" className="text-white/70 hover:text-cosmic-highlight transition-colors">Legal Process Outsourcing</Link></li>
              <li><Link to="/services/it" className="text-white/70 hover:text-cosmic-highlight transition-colors">IT Services</Link></li>
              <li><Link to="/services/data" className="text-white/70 hover:text-cosmic-highlight transition-colors">Data Management</Link></li>
              <li><Link to="/services/customer-support" className="text-white/70 hover:text-cosmic-highlight transition-colors">Customer Support</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-white/70 hover:text-cosmic-highlight transition-colors">About Us</Link></li>
              <li><Link to="/leadership" className="text-white/70 hover:text-cosmic-highlight transition-colors">Leadership</Link></li>
              <li><Link to="/case-studies" className="text-white/70 hover:text-cosmic-highlight transition-colors">Case Studies</Link></li>
              <li><Link to="/careers" className="text-white/70 hover:text-cosmic-highlight transition-colors">Careers</Link></li>
              <li><Link to="/contact" className="text-white/70 hover:text-cosmic-highlight transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <address className="text-white/70 not-italic">
              <p>1234 Cosmic Drive</p>
              <p>Tech District, Universe 42</p>
              <p className="mt-4">Email: info@nexvora.com</p>
              <p>Phone: +1 (555) 123-4567</p>
            </address>
          </div>
        </div>
        
        <hr className="border-cosmic-accent/10 my-10" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/50 text-sm">
            &copy; {new Date().getFullYear()} Nexvora Outsourcing. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-white/50 hover:text-cosmic-highlight text-sm transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-white/50 hover:text-cosmic-highlight text-sm transition-colors">Terms of Service</Link>
            <Link to="/cookies" className="text-white/50 hover:text-cosmic-highlight text-sm transition-colors">Cookies Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
