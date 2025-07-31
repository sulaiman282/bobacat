import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import socialLinksData from '@/socialLinks.json';
import toast from 'react-hot-toast';
import ThemedMusicPlayer from '@/components/atoms/ThemedMusicPlayer';
import SocialIconsGroup from '@/components/molecules/SocialIconsGroup';

const Theme1Layout = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sliderRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
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
      position -= 0.5;
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
      {/* Dynamic Cosmic Background */}
      <div 
        className="fixed inset-0 transition-all duration-1000 ease-out"
        style={{
          background: `
            radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
            rgba(147, 51, 234, 0.4) 0%, 
            rgba(59, 130, 246, 0.3) 25%, 
            rgba(30, 41, 59, 0.8) 50%, 
            rgba(15, 23, 42, 1) 100%)
          `
        }}
      />

      {/* Animated Stars Background */}
      <div className="fixed inset-0">
        {[...Array(150)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 2 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Floating Nebula Effects */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-3xl opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${200 + Math.random() * 300}px`,
              height: `${200 + Math.random() * 300}px`,
              background: `radial-gradient(circle, ${
                ['#8b5cf6', '#ec4899', '#3b82f6', '#06b6d4', '#8b5cf6'][i]
              } 0%, transparent 70%)`,
            }}
            animate={{
              x: [-50, 50, -50],
              y: [-30, 30, -30],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center p-4 relative">
          {/* 3D Floating Cat with Cosmic Effects */}
          <motion.div
            className="relative mb-8 perspective-1000"
            animate={{
              y: [-20, 20, -20],
              rotateY: [0, 5, 0, -5, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.img
              src="/home.png"
              alt="BOBA CAT"
              className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] object-contain relative z-10"
              style={{
                filter: 'drop-shadow(0 0 40px rgba(147, 51, 234, 0.8)) drop-shadow(0 0 80px rgba(59, 130, 246, 0.4))',
                transformStyle: 'preserve-3d',
              }}
              whileHover={{
                scale: 1.1,
                rotateY: 15,
                filter: 'drop-shadow(0 0 60px rgba(147, 51, 234, 1)) drop-shadow(0 0 120px rgba(59, 130, 246, 0.6))',
              }}
              transition={{ duration: 0.4 }}
            />
            
            {/* Cosmic Ring Effects */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 border-2 rounded-full opacity-30"
                style={{
                  borderColor: ['#8b5cf6', '#ec4899', '#3b82f6'][i],
                  width: `${120 + i * 40}%`,
                  height: `${120 + i * 40}%`,
                  left: `${-10 - i * 20}%`,
                  top: `${-10 - i * 20}%`,
                }}
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 10 + i * 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}
          </motion.div>

          {/* Animated Title */}
          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 font-bangers mb-6 text-center"
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            style={{
              textShadow: '0 0 50px rgba(147, 51, 234, 0.5)',
            }}
          >
            BOBA CAT
          </motion.h1>

          {/* Contract Address with 3D Effect */}
          <motion.div
            className="flex items-center bg-black/20 backdrop-blur-xl rounded-full p-3 md:p-4 shadow-2xl w-full max-w-4xl border border-purple-500/30 mb-8"
            initial={{ opacity: 0, scale: 0.8, rotateX: -15 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            style={{
              boxShadow: '0 20px 40px rgba(147, 51, 234, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            }}
          >
            <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold px-4 md:px-6 py-2 md:py-3 rounded-full mr-3 md:mr-4 text-sm md:text-base">
              CA:
            </span>
            <p className="flex-grow text-white text-xs md:text-base break-all pr-2 md:pr-4 truncate">
              {socialLinksData.contractAddress}
            </p>
            <motion.button
              onClick={handleCopy}
              className="p-2 md:p-3 rounded-full bg-purple-600/50 hover:bg-purple-500/70 transition-colors"
              whileHover={{ scale: 1.1, rotateZ: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 0h-2M10 12h.01M14 12h.01M18 12h.01" />
              </svg>
            </motion.button>
          </motion.div>
        </section>

        {/* 3D Image Slider Section */}
        <section className="py-20 relative overflow-hidden">
          <motion.h2
            className="text-4xl md:text-6xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 font-bangers"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            COSMIC GALLERY
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
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-[180px] h-[180px] md:w-[220px] md:h-[220px] lg:w-[250px] lg:h-[250px] relative perspective-1000">
                    <Image
                      src={src}
                      alt={`Cosmic BOBA ${index + 1}`}
                      fill
                      className="object-cover rounded-2xl shadow-2xl"
                      style={{
                        filter: 'drop-shadow(0 10px 30px rgba(147, 51, 234, 0.4))',
                        transformStyle: 'preserve-3d',
                      }}
                      sizes="(max-width: 768px) 180px, (max-width: 1024px) 220px, 250px"
                      priority={index < 5}
                    />
                    {/* Holographic overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer with Cosmic Theme */}
        <footer className="relative py-12 px-4 border-t border-purple-500/30 bg-black/20 backdrop-blur-xl">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-3">
                <img src="/logo.png" alt="Logo" className="h-8 w-8" />
                <span className="text-xl font-bold text-white">BOBA CAT</span>
              </div>
              
              <div className="flex flex-col items-center space-y-4">
                <SocialIconsGroup />
                <p className="text-purple-200 text-sm">
                  © 2024 BOBA CAT. Journey through the cosmos.
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <motion.div
                  className="w-10 h-10 bg-purple-600/30 rounded-full flex items-center justify-center border border-purple-500/50"
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(147, 51, 234, 0.5)' }}
                >
                  <span className="text-white text-sm">🚀</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </footer>
      </div>

      {/* Music Player */}
      <ThemedMusicPlayer theme="cosmic" />

      {/* Floating Cosmic Particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              background: ['#8b5cf6', '#ec4899', '#3b82f6', '#06b6d4'][Math.floor(Math.random() * 4)],
            }}
            animate={{
              y: [-100, -200],
              x: [-20, 20],
              opacity: [0, 1, 0],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeOut",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Theme1Layout;