import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import socialLinksData from '@/socialLinks.json';
import toast from 'react-hot-toast';
import ThemedMusicPlayer from '@/components/atoms/ThemedMusicPlayer';
import SocialIconsGroup from '@/components/molecules/SocialIconsGroup';

const Theme5Layout = () => {
  const sliderRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);

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
      position -= 0.7;
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
      {/* Retro Wave Background */}
      <div 
        className="fixed inset-0"
        style={{
          background: `
            linear-gradient(180deg, 
              #1a1a2e 0%, 
              #16213e 25%, 
              #0f3460 50%, 
              #533483 75%, 
              #7209b7 100%
            )
          `
        }}
      />

      {/* Retro Grid */}
      <div 
        className="fixed inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 20, 147, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 20, 147, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          transform: `perspective(500px) rotateX(60deg) translateY(${scrollY * 0.5}px)`,
          transformOrigin: 'center bottom',
        }}
      />

      {/* Retro Sun */}
      <div className="fixed top-20 left-1/2 transform -translate-x-1/2 w-40 h-40 md:w-60 md:h-60">
        <motion.div
          className="w-full h-full rounded-full border-4 border-yellow-400 opacity-80"
          animate={{
            boxShadow: [
              '0 0 20px #fbbf24, 0 0 40px #fbbf24, 0 0 60px #fbbf24',
              '0 0 30px #fbbf24, 0 0 60px #fbbf24, 0 0 90px #fbbf24',
              '0 0 20px #fbbf24, 0 0 40px #fbbf24, 0 0 60px #fbbf24',
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {/* Sun rays */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 bg-gradient-to-t from-yellow-400 to-transparent opacity-60"
            style={{
              height: '60px',
              left: '50%',
              top: '50%',
              transformOrigin: '0 0',
              transform: `rotate(${i * 45}deg) translateX(-0.5px)`,
            }}
            animate={{
              scaleY: [1, 1.3, 1],
              opacity: [0.6, 0.9, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      {/* Floating Retro Shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${20 + Math.random() * 40}px`,
              height: `${20 + Math.random() * 40}px`,
              background: ['#ff1493', '#00ffff', '#ffff00', '#ff6b35'][Math.floor(Math.random() * 4)],
              clipPath: Math.random() > 0.5 ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              rotate: [0, 360],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center p-4 relative pt-32">
          {/* Retro Cat with Neon Effect */}
          <motion.div
            className="relative mb-12"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
          >
            <motion.div
              className="relative"
              animate={{
                y: [-10, 10, -10],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <img
                src="/home.png"
                alt="BOBA"
                className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] object-contain relative z-10"
                style={{
                  filter: 'drop-shadow(0 0 30px #ff1493) drop-shadow(0 0 60px #00ffff)',
                }}
              />
              
              {/* Neon Glow Rings */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 border-4 rounded-full opacity-40"
                  style={{
                    borderColor: ['#ff1493', '#00ffff', '#ffff00'][i],
                    width: `${110 + i * 20}%`,
                    height: `${110 + i * 20}%`,
                    left: `${-5 - i * 10}%`,
                    top: `${-5 - i * 10}%`,
                  }}
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 6 + i * 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Retro Typography */}
          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-bold font-bangers mb-8 text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            style={{
              background: 'linear-gradient(45deg, #ff1493, #00ffff, #ffff00, #ff1493)',
              backgroundSize: '300% 300%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 0 30px rgba(255, 20, 147, 0.5)',
              animation: 'gradient-wave 3s ease infinite',
            }}
          >
            BOBA
          </motion.h1>

          {/* Retro Subtitle */}
          <motion.p
            className="text-xl md:text-2xl text-cyan-300 mb-12 text-center max-w-2xl font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            style={{
              textShadow: '0 0 10px rgba(0, 255, 255, 0.8)',
            }}
          >
            Riding the neon waves to the moon! 🌙 The most radical meme coin in the metaverse.
          </motion.p>

          {/* Retro Contract Address */}
          <motion.div
            className="flex items-center bg-black/60 backdrop-blur-sm rounded-2xl p-4 md:p-6 w-full max-w-4xl border-2 border-pink-500 mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            style={{
              boxShadow: '0 0 30px rgba(255, 20, 147, 0.3), inset 0 0 30px rgba(255, 20, 147, 0.1)',
            }}
          >
            <span className="bg-gradient-to-r from-pink-500 to-cyan-400 text-black font-bold px-4 md:px-6 py-2 md:py-3 rounded-xl mr-4 text-sm md:text-base">
              CONTRACT
            </span>
            <p className="flex-grow text-cyan-300 text-xs md:text-base break-all pr-4 font-mono">
              {socialLinksData.contractAddress}
            </p>
            <motion.button
              onClick={handleCopy}
              className="p-3 rounded-xl bg-pink-500/20 border-2 border-pink-500 hover:bg-pink-500/30 transition-colors"
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 0 20px rgba(255, 20, 147, 0.6)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5 md:w-6 md:h-6 text-pink-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 0h-2M10 12h.01M14 12h.01M18 12h.01" />
              </svg>
            </motion.button>
          </motion.div>

          {/* Retro Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-pink-500 to-cyan-400 text-black font-bold rounded-2xl shadow-lg relative overflow-hidden"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 40px rgba(255, 20, 147, 0.6)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">BUY BOBA</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-pink-500"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
            </motion.button>
            
            <motion.button
              className="px-8 py-4 border-2 border-cyan-400 text-cyan-300 font-bold rounded-2xl hover:bg-cyan-400/10 transition-all duration-300"
              whileHover={{ 
                scale: 1.05,
                borderColor: '#ff1493',
                color: '#ff1493',
                boxShadow: "0 0 30px rgba(0, 255, 255, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              EXPLORE WAVES
            </motion.button>
          </motion.div>
        </section>

        {/* Retro Gallery */}
        <section className="py-20 relative">
          <motion.h2
            className="text-4xl md:text-6xl font-bold text-center mb-16 font-bangers"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{
              background: 'linear-gradient(45deg, #ff1493, #00ffff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 0 30px rgba(255, 20, 147, 0.5)',
            }}
          >
            NEON GALLERY
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
                  className="inline-block px-4"
                  whileHover={{ 
                    scale: 1.1,
                    y: -15,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-[200px] h-[200px] md:w-[240px] md:h-[240px] lg:w-[280px] lg:h-[280px] relative">
                    <Image
                      src={src}
                      alt={`Retro BOBA ${index + 1}`}
                      fill
                      className="object-cover rounded-2xl"
                      style={{
                        filter: 'drop-shadow(0 0 20px rgba(255, 20, 147, 0.4)) contrast(1.1) saturate(1.2)',
                        border: '2px solid transparent',
                        background: 'linear-gradient(45deg, #ff1493, #00ffff) border-box',
                      }}
                      sizes="(max-width: 768px) 200px, (max-width: 1024px) 240px, 280px"
                      priority={index < 5}
                    />
                    {/* Neon border effect */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-pink-500 opacity-0 hover:opacity-100 transition-opacity duration-300" 
                         style={{ boxShadow: '0 0 20px rgba(255, 20, 147, 0.6)' }} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Retro Footer */}
        <footer className="relative py-12 px-4 bg-black/40 backdrop-blur-sm border-t-2 border-pink-500">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-3">
                <img src="/logo.png" alt="Logo" className="h-10 w-10" />
                <span className="text-2xl font-bold text-cyan-300 font-bangers">BOBA</span>
              </div>
              
              <div className="flex flex-col items-center space-y-4">
                <SocialIconsGroup />
                <p className="text-pink-300 text-sm">
                  © 2024 BOBA. Surfing the retro waves since forever.
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <motion.div
                  className="w-12 h-12 bg-gradient-to-r from-pink-500 to-cyan-400 rounded-2xl flex items-center justify-center"
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 10,
                    boxShadow: '0 0 30px rgba(255, 20, 147, 0.6)',
                  }}
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(255, 20, 147, 0.4)',
                      '0 0 30px rgba(0, 255, 255, 0.4)',
                      '0 0 20px rgba(255, 20, 147, 0.4)',
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  <span className="text-black text-lg">🌊</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </footer>
      </div>

      {/* Themed Music Player */}
      <ThemedMusicPlayer theme="retro" />

      {/* Custom CSS for gradient animation */}
      <style jsx>{`
        @keyframes gradient-wave {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};

export default Theme5Layout;