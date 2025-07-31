import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import socialLinksData from '@/socialLinks.json';
import toast from 'react-hot-toast';
import ThemedMusicPlayer from '@/components/atoms/ThemedMusicPlayer';
import SocialIconsGroup from '@/components/molecules/SocialIconsGroup';

const Theme4Layout = () => {
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
      position -= 0.4;
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Subtle Background Pattern */}
      <div 
        className="fixed inset-0 opacity-5"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, #000 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, #000 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px, 60px 60px',
          backgroundPosition: '0 0, 30px 30px',
        }}
      />

      {/* Floating Geometric Shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${50 + Math.random() * 100}px`,
              height: `${50 + Math.random() * 100}px`,
              background: `linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4)`,
              borderRadius: Math.random() > 0.5 ? '50%' : '20px',
            }}
            animate={{
              y: [-30, 30, -30],
              x: [-20, 20, -20],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
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
          {/* Clean Cat Image */}
          <motion.div
            className="relative mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src="/home.png"
                alt="BOBA"
                className="w-[280px] h-[280px] md:w-[380px] md:h-[380px] lg:w-[480px] lg:h-[480px] object-contain"
                style={{
                  filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.1))',
                }}
              />
              
              {/* Subtle Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-200 to-pink-200 rounded-full blur-3xl opacity-20 -z-10" />
            </motion.div>
          </motion.div>

          {/* Clean Typography */}
          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-bold text-gray-800 font-bangers mb-8 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            BOBA
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl text-gray-600 mb-12 text-center max-w-2xl leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            The cutest meme coin on the blockchain. Simple, fun, and ready to take you to the moon.
          </motion.p>

          {/* Clean Contract Address */}
          <motion.div
            className="flex items-center bg-white rounded-2xl p-4 md:p-6 shadow-lg w-full max-w-4xl border border-gray-200"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <span className="bg-gradient-to-r from-orange-400 to-pink-400 text-white font-bold px-4 md:px-6 py-2 md:py-3 rounded-xl mr-4 text-sm md:text-base">
              Contract Address
            </span>
            <p className="flex-grow text-gray-700 text-xs md:text-base break-all pr-4 font-mono">
              {socialLinksData.contractAddress}
            </p>
            <motion.button
              onClick={handleCopy}
              className="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 0h-2M10 12h.01M14 12h.01M18 12h.01" />
              </svg>
            </motion.button>
          </motion.div>

          {/* Call to Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 mt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-orange-400 to-pink-400 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(255, 107, 107, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Buy BOBA
            </motion.button>
            
            <motion.button
              className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 font-bold rounded-2xl hover:bg-gray-50 transition-all duration-300"
              whileHover={{ 
                scale: 1.05,
                borderColor: "#9ca3af"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </motion.div>
        </section>

        {/* Clean Image Gallery */}
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
          <motion.h2
            className="text-4xl md:text-6xl font-bold text-center mb-16 text-gray-800 font-bangers"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Gallery
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
                    scale: 1.05,
                    y: -10,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-[200px] h-[200px] md:w-[240px] md:h-[240px] lg:w-[280px] lg:h-[280px] relative">
                    <Image
                      src={src}
                      alt={`BOBA Gallery ${index + 1}`}
                      fill
                      className="object-cover rounded-3xl shadow-lg"
                      sizes="(max-width: 768px) 200px, (max-width: 1024px) 240px, 280px"
                      priority={index < 5}
                    />
                    {/* Subtle overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Clean Footer */}
        <footer className="bg-white border-t border-gray-200 py-12 px-4">
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
                <span className="text-2xl font-bold text-gray-800">BOBA</span>
              </div>
              
              <div className="flex flex-col items-center space-y-4">
                <SocialIconsGroup />
                <p className="text-gray-500 text-sm">
                  © 2024 BOBA. Made with ❤️ for the community.
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <motion.div
                  className="w-12 h-12 bg-gradient-to-r from-orange-400 to-pink-400 rounded-2xl flex items-center justify-center shadow-lg"
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 5,
                  }}
                >
                  <span className="text-white text-lg">🐱</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </footer>
      </div>

      {/* Themed Music Player */}
      <ThemedMusicPlayer theme="minimal" />
    </div>
  );
};

export default Theme4Layout;