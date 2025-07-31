import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import socialLinksData from '@/socialLinks.json';
import toast from 'react-hot-toast';
import ThemedMusicPlayer from '@/components/atoms/ThemedMusicPlayer';
import SocialIconsGroup from '@/components/molecules/SocialIconsGroup';

const Theme2Layout = () => {
  const [time, setTime] = useState(new Date());
  const canvasRef = useRef(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Matrix-like background effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof window === 'undefined') return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const matrix = "BOBACATMEMECOIN01";
    const matrixArray = matrix.split("");
    const fontSize = 12;
    const columns = canvas.width / fontSize;
    const drops = [];

    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00ff41';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 40);
    return () => clearInterval(interval);
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
      position -= 0.8;
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
    <div className="min-h-screen relative overflow-hidden bg-black cyber-scrollbar">
      {/* Matrix Background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 opacity-25"
      />

      {/* Cyber Grid Overlay */}
      <div 
        className="fixed inset-0 opacity-15"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 65, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 65, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Scanning Lines */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-60"
          animate={{
            y: [0, 800, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Digital Clock */}
      <div className="fixed top-4 right-4 z-50 font-mono text-green-400 text-lg md:text-xl bg-black/80 px-3 py-1 rounded border border-green-400/50">
        {time.toLocaleTimeString()}
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center p-4 relative">
          {/* Glitch Effect Container */}
          <div className="relative mb-8">
            {/* Main Cat Image with 3D Cyber Effects */}
            <motion.div
              className="relative perspective-1000"
              animate={{
                x: [0, 1, -1, 0],
              }}
              transition={{
                duration: 0.15,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              <motion.img
                src="/home.png"
                alt="BOBA CAT"
                className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] object-contain relative z-10"
                style={{
                  filter: 'drop-shadow(0 0 30px #00ff41) contrast(1.3) saturate(1.4) brightness(1.1)',
                  transformStyle: 'preserve-3d',
                }}
                whileHover={{
                  scale: 1.05,
                  rotateY: 10,
                  filter: 'drop-shadow(0 0 50px #00ff41) contrast(1.5) saturate(1.6) brightness(1.2)',
                }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Glitch Layers */}
              <motion.img
                src="/home.png"
                alt=""
                className="absolute top-0 left-0 w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] object-contain opacity-60"
                style={{
                  filter: 'hue-rotate(180deg) drop-shadow(0 0 15px #ff0080)',
                  mixBlendMode: 'screen',
                }}
                animate={{
                  x: [-1, 1, -0.5, 0.5, 0],
                  opacity: [0.6, 0.2, 0.8, 0.1, 0.6],
                }}
                transition={{
                  duration: 0.12,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
              
              <motion.img
                src="/home.png"
                alt=""
                className="absolute top-0 left-0 w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] object-contain opacity-40"
                style={{
                  filter: 'hue-rotate(90deg) drop-shadow(0 0 15px #0080ff)',
                  mixBlendMode: 'screen',
                }}
                animate={{
                  x: [0.5, -0.5, 1, -1, 0],
                  opacity: [0.4, 0.7, 0.1, 0.5, 0.4],
                }}
                transition={{
                  duration: 0.1,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            </motion.div>

            {/* Cyber Rings */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 border-2 rounded-full opacity-20"
                style={{
                  borderColor: ['#00ff41', '#ff0080', '#0080ff'][i],
                  width: `${110 + i * 30}%`,
                  height: `${110 + i * 30}%`,
                  left: `${-5 - i * 15}%`,
                  top: `${-5 - i * 15}%`,
                }}
                animate={{
                  rotate: [0, 360],
                  borderColor: ['#00ff41', '#ff0080', '#0080ff', '#00ff41'],
                }}
                transition={{
                  duration: 8 + i * 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}
          </div>

          {/* Cyber Title with Glitch Effect */}
          <motion.div
            className="relative mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-green-400 font-mono text-center relative">
              BOBA CAT
              {/* Scanning Line Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-40 h-1"
                animate={{
                  y: [0, 150, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </h1>
            
            {/* Glitch Text Overlay */}
            <motion.h1
              className="absolute top-0 left-0 text-6xl md:text-8xl lg:text-9xl font-bold text-red-500 font-mono text-center opacity-60"
              animate={{
                x: [-1, 1, -0.5, 0.5, 0],
                opacity: [0, 0.6, 0, 0.4, 0],
              }}
              transition={{
                duration: 0.15,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              BOBA CAT
            </motion.h1>
          </motion.div>

          {/* Terminal-style Info */}
          <motion.div
            className="bg-black/90 border border-green-400 rounded-lg p-4 md:p-6 mb-8 font-mono text-green-400 max-w-4xl w-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{
              boxShadow: '0 0 30px rgba(0, 255, 65, 0.2), inset 0 0 30px rgba(0, 255, 65, 0.05)',
            }}
          >
            <div className="flex items-center mb-3">
              <span className="text-red-400">root@bobacoin:~$</span>
              <motion.span
                className="ml-2 bg-green-400 w-2 h-5 inline-block"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </div>
            <div className="text-sm md:text-base space-y-1">
              <p>{'> Initializing BOBA CAT protocol...'}</p>
              <p>{'> Connecting to blockchain network...'}</p>
              <p>{'> Status: ONLINE - Ready for moon mission 🚀'}</p>
            </div>
          </motion.div>

          {/* Contract Address Terminal */}
          <motion.div
            className="bg-black/95 border border-green-400 rounded-lg p-4 w-full max-w-4xl font-mono text-green-400 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            style={{
              boxShadow: '0 0 20px rgba(0, 255, 65, 0.3)',
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-yellow-400 text-sm md:text-base">[CONTRACT_ADDRESS]</span>
              <motion.button
                onClick={handleCopy}
                className="px-3 py-1 border border-green-400 rounded text-xs hover:bg-green-400 hover:text-black transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                COPY
              </motion.button>
            </div>
            <p className="text-xs md:text-sm break-all bg-gray-900 p-3 rounded">
              {socialLinksData.contractAddress}
            </p>
          </motion.div>
        </section>

        {/* Cyber Image Slider Section */}
        <section className="py-20 relative overflow-hidden">
          <motion.h2
            className="text-4xl md:text-6xl font-bold text-center mb-12 text-green-400 font-mono"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            DATA_STREAM.gallery
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
                    rotateY: 5,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-[180px] h-[180px] md:w-[220px] md:h-[220px] lg:w-[250px] lg:h-[250px] relative">
                    <Image
                      src={src}
                      alt={`Cyber BOBA ${index + 1}`}
                      fill
                      className="object-cover rounded-lg"
                      style={{
                        filter: 'drop-shadow(0 0 20px rgba(0, 255, 65, 0.4)) contrast(1.2) saturate(1.1)',
                        border: '1px solid rgba(0, 255, 65, 0.3)',
                      }}
                      sizes="(max-width: 768px) 180px, (max-width: 1024px) 220px, 250px"
                      priority={index < 5}
                    />
                    {/* Cyber overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-cyan-500/10 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    {/* Scan lines */}
                    <div 
                      className="absolute inset-0 opacity-30 rounded-lg"
                      style={{
                        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 65, 0.1) 2px, rgba(0, 255, 65, 0.1) 4px)',
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Cyber Footer */}
        <footer className="relative py-12 px-4 border-t border-green-400/30 bg-black/90">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 font-mono"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-3">
                <img src="/logo.png" alt="Logo" className="h-8 w-8" />
                <span className="text-xl font-bold text-green-400">BOBA_CAT.exe</span>
              </div>
              
              <div className="flex flex-col items-center space-y-4">
                <SocialIconsGroup />
                <p className="text-green-300 text-sm">
                  © 2024 BOBA_CAT_PROTOCOL. All systems operational.
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <motion.div
                  className="w-10 h-10 bg-green-600/20 rounded border border-green-400/50 flex items-center justify-center"
                  whileHover={{ 
                    scale: 1.1, 
                    backgroundColor: 'rgba(0, 255, 65, 0.3)',
                    boxShadow: '0 0 20px rgba(0, 255, 65, 0.5)'
                  }}
                >
                  <span className="text-green-400 text-sm">🤖</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </footer>
      </div>

      {/* Music Player */}
      <ThemedMusicPlayer theme="cyber" />

      {/* Floating Code Snippets */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[
          'function buyBoba()', 
          'const moon = true;', 
          'if(hodl) profit++;', 
          'return diamond_hands;',
          'blockchain.connect()',
          'meme.deploy()',
          'while(true) moon();',
          'crypto.hodl()'
        ].map((code, i) => (
          <motion.div
            key={i}
            className="absolute text-green-400 font-mono text-xs opacity-20"
            style={{
              left: `${Math.random() * 90 + 5}%`,
              top: `${Math.random() * 90 + 5}%`,
            }}
            animate={{
              y: [-30, -60, -30],
              opacity: [0.2, 0.5, 0.2],
              x: [-10, 10, -10],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          >
            {code}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Theme2Layout;