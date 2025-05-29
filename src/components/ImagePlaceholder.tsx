
import React from 'react';
import { motion } from 'framer-motion';

interface ImagePlaceholderProps {
  width?: string;
  height?: string;
  className?: string;
  alt?: string;
  src?: string;
  children?: React.ReactNode;
}

const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({ 
  width = "100%", 
  height = "200px", 
  className = "",
  alt = "Image",
  src,
  children
}) => {
  if (src) {
    return (
      <motion.img
        src={src}
        alt={alt}
        className={`object-cover ${className}`}
        style={{ width, height }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      />
    );
  }

  return (
    <motion.div
      className={`relative overflow-hidden bg-gradient-to-br from-cosmic-subtle to-cosmic-accent/30 ${className}`}
      style={{ width, height }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Animated background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{ x: [-300, 300] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        {children || (
          <div className="text-center text-white/60">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 mx-auto mb-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
            </motion.div>
            <p className="text-sm">{alt}</p>
          </div>
        )}
      </div>
      
      {/* Border animation */}
      <motion.div
        className="absolute inset-0 border-2 border-cosmic-accent/30"
        animate={{ 
          borderColor: [
            "rgba(155, 135, 245, 0.3)",
            "rgba(110, 89, 165, 0.5)",
            "rgba(6, 182, 212, 0.4)",
            "rgba(155, 135, 245, 0.3)"
          ]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </motion.div>
  );
};

export default ImagePlaceholder;
