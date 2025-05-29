
import { useEffect, useState } from 'react'

const Loader = () => {
  const [progress, setProgress] = useState(0)
  
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 5
        if (newProgress >= 100) {
          clearInterval(timer)
          return 100
        }
        return newProgress
      })
    }, 100)
    
    return () => clearInterval(timer)
  }, [])
  
  return (
    <div className="fixed inset-0 bg-cosmic-dark flex flex-col items-center justify-center z-50">
      <div className="w-24 h-24 relative mb-8">
        <div className="absolute inset-0 border-4 border-cosmic-accent/20 rounded-full"></div>
        <div 
          className="absolute inset-0 border-4 border-cosmic-highlight rounded-full animate-spin"
          style={{ 
            borderRightColor: 'transparent',
            borderBottomColor: 'transparent',
            animationDuration: '2s'
          }}
        ></div>
      </div>
      
      <div className="w-64 h-2 bg-cosmic-subtle/30 rounded-full overflow-hidden mb-4">
        <div 
          className="h-full bg-cosmic-highlight"
          style={{ width: `${progress}%`, transition: 'width 0.2s ease-out' }}
        ></div>
      </div>
      
      <p className="text-cosmic-highlight font-medium">{Math.round(progress)}%</p>
      <p className="text-white/70 mt-2">Initializing Nexvora Universe</p>
    </div>
  )
}

export default Loader
