import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import socialLinksData from '@/socialLinks.json';
import toast from 'react-hot-toast';
import ThemedMusicPlayer from '@/components/atoms/ThemedMusicPlayer';
import SocialIconsGroup from '@/components/molecules/SocialIconsGroup';

const Theme3Layout = () => {
  const [scrollY, setScrollY] = useState(0);
  const hologramRef = useRef(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Slider logic
  const sliderImages = Array.from({ length: 25 }, (_, i) => {
    const num = i + 1;
    return `/slider/${num}.png`;
  });
  const duplicatedImages = [...sliderImages, ...sliderImages];

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    
    let animationId;
    let position = 0;
    
    const animate = () => {
      position -= 0.6;
      const imageWidth = (typeof window !== 'undefined' && window.innerWidth < 768) ? 200 : 250;
      const resetPoint = -(sliderImages.length * imageWidth);
      
      if (position <= resetPoint) {
        position = 0;
      }
      
      slider.style.transform = `translateX(${position}px)`;
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [sliderImages.length]);

  const handleCopy = () => {
    navigator.clipboard.writeText(socialLinksData.contractAddress);
    toast.success('Contract Address Copied!');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dynamic Holographic Background */}
      <div 
        className="fixed inset-0 transition-all duration-1000"
        style={{
          background: `
            radial-gradient(circle at 25% 25%, rgba(0, 255, 255, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(255, 0, 255, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(0, 255, 0, 0.1) 0%, transparent 70%),
            linear-gradient(135deg, #0f0f23 0%, #1a0033 25%, #001a33 50%, #0f0f23 100%)
          `,
        }}
      />

      {/* Holographic Grid Pattern */}
      <div 
        className="fixed inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px),
            linear-gradient(45deg, transparent 40%, rgba(255, 0, 255, 0.2) 50%, transparent 60%),
            linear-gradient(-45deg, transparent 40%, rgba(0, 255, 0, 0.2) 50%, transparent 60%)
          `,
          backgroundSize: '60px 60px, 60px 60px, 120px 120px, 120px 120px',
          animation: 'hologram-shift 15s ease-in-out infinite',
        }}
      />

      {/* Floating Holographic Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-xl opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${150 + Math.random() * 200}px`,
              height: `${150 + Math.random() * 200}px`,
              background: `radial-gradient(circle, ${
                ['#00ffff', '#ff00ff', '#00ff00', '#ffff00'][i % 4]
              } 0%, transparent 70%)`,
            }}
            animate={{
              x: [-30, 30, -30],
              y: [-20, 20, -20],
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 12 + Math.random() * 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center p-4 relative">
          {/* Holographic Cat Display */}
          <motion.div
            ref={hologramRef}
            className="relative mb-8 perspective-1000"
            style={{
              transform: `translateY(${scrollY * 0.05}px)`,
            }}
          >
            {/* Hologram Base Platform */}
            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 w-[400px] h-6 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-40 rounded-full blur-md" />
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-[350px] h-2 bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-60 rounded-full" />
            
            {/* Main Holographic Cat */}
            <motion.div
              className="relative"
              animate={{
                rotateY: [0, 360],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <motion.img
                src="/home.png"
                alt="BOBA"
                className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] object-contain relative z-10"
                style={{
                  filter: 'drop-shadow(0 0 40px #00ffff) drop-shadow(0 0 80px #ff00ff) brightness(1.3) contrast(1.2)',
                  mixBlendMode: 'screen',
                  transformStyle: 'preserve-3d',
                }}
                animate={{
                  y: [-15, 15, -15],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={{
                  scale: 1.1,
                  rotateY: 20,
                  filter: 'drop-shadow(0 0 60px #00ffff) drop-shadow(0 0 120px #ff00ff) brightness(1.5) contrast(1.4)',
                }}
              />
              
              {/* Holographic Scan Lines */}
              <motion.div
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0, 255, 255, 0.2) 3px, rgba(0, 255, 255, 0.2) 6px)',
                }}
                animate={{
                  y: [-400, 400, -400],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              
              {/* Holographic Distortion Layers */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-15 blur-sm"
                animate={{
                  x: [-60, 60, -60],
                  opacity: [0.15, 0.3, 0.15],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              <motion.div
                className="absolute inset-0 bg-gradient-to-l from-transparent via-purple-500 to-transparent opacity-10 blur-md"
                animate={{
                  x: [40, -40, 40],
                  opacity: [0.1, 0.25, 0.1],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            {/* Holographic Rings */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 border-2 rounded-full opacity-20"
                style={{
                  borderColor: ['#00ffff', '#ff00ff', '#00ff00', '#ffff00'][i],
                  width: `${115 + i * 25}%`,
                  height: `${115 + i * 25}%`,
                  left: `${-7.5 - i * 12.5}%`,
                  top: `${-7.5 - i * 12.5}%`,
                }}
                animate={{
                  rotate: [0, 360],
                  borderColor: ['#00ffff', '#ff00ff', '#00ff00', '#ffff00', '#00ffff'],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 12 + i * 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}
          </motion.div>

          {/* Holographic Title */}
          <motion.div
            className="relative mb-8"
            initial={{ opacity: 0, scale: 0.8, rotateX: -15 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 1.5, delay: 0.3 }}
          >
            <h1 
              className="text-6xl md:text-8xl lg:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 font-bangers text-center relative"
              style={{
                textShadow: '0 0 60px rgba(0, 255, 255, 0.6), 0 0 120px rgba(255, 0, 255, 0.4)',
              }}
            >
              BOBA
            </h1>
            
            {/* Holographic Shimmer Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-40 skew-x-12 blur-sm"
              animate={{
                x: [-300, 500],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                repeatDelay: 3,
              }}
            />
          </motion.div>

          {/* Holographic Info Panel */}
          <motion.div
            className="relative bg-black/15 backdrop-blur-xl border border-cyan-400/40 rounded-2xl p-6 md:p-8 mb-8 max-w-4xl w-full"
            initial={{ opacity: 0, y: 30, rotateX: -10 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            style={{
              boxShadow: '0 0 40px rgba(0, 255, 255, 0.2), inset 0 0 40px rgba(0, 255, 255, 0.05), 0 0 80px rgba(255, 0, 255, 0.1)',
            }}
          >
            {/* Holographic Border Animation */}
            <motion.div
              className="absolute inset-0 border-2 rounded-2xl"
              animate={{
                borderColor: ['#00ffff', '#ff00ff', '#00ff00', '#ffff00', '#00ffff'],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
              }}
            />
            
            <div className="relative z-10">
              <motion.h3 
                className="text-2xl md:text-3xl font-bold text-cyan-400 mb-4 text-center"
                animate={{
                  textShadow: [
                    '0 0 20px rgba(0, 255, 255, 0.8)',
                    '0 0 40px rgba(255, 0, 255, 0.8)',
                    '0 0 20px rgba(0, 255, 255, 0.8)',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                HOLOGRAPHIC TRANSMISSION
              </motion.h3>
              
              <p className="text-cyan-200 text-center mb-6 text-lg">
                Experience BOBA in a new dimension where reality meets digital dreams
              </p>
              
              {/* Contract Address Hologram */}
              <div className="bg-black/30 border border-cyan-400/30 rounded-xl p-4 md:p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-purple-400 font-mono text-sm md:text-base">QUANTUM_ADDRESS:</span>
                  <motion.button
                    onClick={handleCopy}
                    className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-sm rounded-lg hover:from-cyan-400 hover:to-purple-400 transition-all"
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: '0 0 30px rgba(0, 255, 255, 0.6)',
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    COPY
                  </motion.button>
                </div>
                <p className="text-cyan-300 font-mono text-xs md:text-sm break-all bg-black/50 p-3 rounded-lg">
                  {socialLinksData.contractAddress}
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Holographic Image Slider Section */}
        <section className="py-20 relative overflow-hidden">
          <motion.h2
            className="text-4xl md:text-6xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-bangers"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{
              textShadow: '0 0 40px rgba(0, 255, 255, 0.5)',
            }}
          >
            DIMENSIONAL GALLERY
          </motion.h2>
          
          <div className="relative w-full overflow-hidden">
            <div 
              ref={sliderRef}
              className="flex whitespace-nowrap"
              style={{ willChange: 'transform' }}
            >
              {duplicatedImages.map((src, index) => (
                <motion.div 
                  key={`${src}-${index}`} 
                  className="inline-block px-3 md:px-4"
                  whileHover={{ 
                    scale: 1.1,
                    rotateY: 10,
                    z: 50,
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="w-[180px] h-[180px] md:w-[220px] md:h-[220px] lg:w-[250px] lg:h-[250px] relative perspective-1000">
                    <Image
                      src={src}
                      alt={`Holographic BOBA ${index + 1}`}
                      fill
                      className="object-cover rounded-2xl"
                      style={{
                        filter: 'drop-shadow(0 0 25px rgba(0, 255, 255, 0.4)) drop-shadow(0 0 50px rgba(255, 0, 255, 0.2)) brightness(1.1) contrast(1.2)',
                        transformStyle: 'preserve-3d',
                      }}
                      sizes="(max-width: 768px) 180px, (max-width: 1024px) 220px, 250px"
                      priority={index < 5}
                    />
                    {/* Holographic overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/15 to-purple-500/15 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    {/* Scan lines */}
                    <div 
                      className="absolute inset-0 opacity-20 rounded-2xl"
                      style={{
                        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 255, 0.3) 2px, rgba(0, 255, 255, 0.3) 4px)',
                      }}
                    />
                    {/* Holographic border */}
                    <motion.div
                      className="absolute inset-0 border-2 rounded-2xl opacity-0 hover:opacity-60"
                      animate={{
                        borderColor: ['#00ffff', '#ff00ff', '#00ff00', '#00ffff'],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Holographic Footer */}
        <footer className="relative py-12 px-4 border-t border-cyan-400/20 bg-black/10 backdrop-blur-xl">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-3">
                <img src="/logo.png" alt="Logo" className="h-8 w-8" />
                <span className="text-xl font-bold text-cyan-400">BOBA</span>
              </div>
              
              <div className="flex flex-col items-center space-y-4">
                <SocialIconsGroup />
                <p className="text-cyan-300 text-sm">
                  © 2024 BOBA. Transcending dimensions.
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <motion.div
                  className="w-10 h-10 bg-cyan-600/20 rounded-full flex items-center justify-center border border-cyan-400/40"
                  whileHover={{ 
                    scale: 1.1, 
                    backgroundColor: 'rgba(0, 255, 255, 0.3)',
                    boxShadow: '0 0 25px rgba(0, 255, 255, 0.5)'
                  }}
                  animate={{
                    borderColor: ['#00ffff', '#ff00ff', '#00ff00', '#00ffff'],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                  }}
                >
                  <span className="text-cyan-400 text-sm">✨</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </footer>
      </div>

      {/* Music Player */}
      <ThemedMusicPlayer theme="holo" />

      {/* Floating Holographic Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border opacity-25"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
              borderRadius: Math.random() > 0.5 ? '50%' : '0%',
              borderColor: ['#00ffff', '#ff00ff', '#00ff00', '#ffff00'][Math.floor(Math.random() * 4)],
            }}
            animate={{
              y: [-60, -120, -60],
              x: [-30, 30, -30],
              rotate: [0, 360, 0],
              opacity: [0.25, 0.6, 0.25],
              borderColor: ['#00ffff', '#ff00ff', '#00ff00', '#ffff00', '#00ffff'],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Custom CSS for hologram animation */}
      <style jsx>{`
        @keyframes hologram-shift {
          0%, 100% { transform: translateX(0) translateY(0) scale(1); }
          25% { transform: translateX(5px) translateY(-3px) scale(1.02); }
          50% { transform: translateX(-3px) translateY(5px) scale(0.98); }
          75% { transform: translateX(3px) translateY(-5px) scale(1.01); }
        }
      `}</style>
    </div>
  );
};

export default Theme3Layout;