import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const ThemedMusicPlayer = ({ theme = 'default' }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  useEffect(() => {
    // Check localStorage for saved state
    const savedState = localStorage.getItem('musicPlayerState');
    if (savedState) {
      const { playing } = JSON.parse(savedState);
      setIsPlaying(playing);
      
      // If it should be playing, start the audio
      if (playing && audioRef.current) {
        // Set volume to 15%
        audioRef.current.volume = 0.15;
        audioRef.current.play().catch(error => {
          console.error('Auto-play was prevented:', error);
          setIsPlaying(false);
          saveState(false);
        });
      }
    }
    
    // Set initial volume to 15%
    if (audioRef.current) {
      audioRef.current.volume = 0.15;
    }
  }, []);
  
  // Save state to localStorage
  const saveState = (playing) => {
    localStorage.setItem('musicPlayerState', JSON.stringify({ playing }));
  };
  
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // Ensure volume is set to 15% when playing
        audioRef.current.volume = 0.15;
        audioRef.current.play().catch(error => {
          console.error('Play was prevented:', error);
        });
      }
      
      const newPlayingState = !isPlaying;
      setIsPlaying(newPlayingState);
      saveState(newPlayingState);
    }
  };

  // Theme-specific styles
  const getThemeStyles = () => {
    switch (theme) {
      case 'cosmic':
        return {
          bg: 'bg-gradient-to-r from-purple-600 to-blue-600',
          hover: 'hover:from-purple-500 hover:to-blue-500',
          shadow: 'shadow-lg shadow-purple-500/25',
          hoverShadow: 'hover:shadow-purple-500/50',
          border: 'border border-purple-500/30',
          glow: '0 0 20px rgba(147, 51, 234, 0.6)',
        };
      case 'cyber':
        return {
          bg: 'bg-black border-2 border-green-400',
          hover: 'hover:bg-green-400/10',
          shadow: 'shadow-lg shadow-green-400/25',
          hoverShadow: 'hover:shadow-green-400/50',
          border: '',
          glow: '0 0 20px rgba(0, 255, 65, 0.6)',
        };
      case 'holo':
        return {
          bg: 'bg-gradient-to-r from-cyan-500 to-purple-500',
          hover: 'hover:from-cyan-400 hover:to-purple-400',
          shadow: 'shadow-lg shadow-cyan-500/25',
          hoverShadow: 'hover:shadow-cyan-500/50',
          border: 'border border-cyan-400/30',
          glow: '0 0 20px rgba(0, 255, 255, 0.6)',
        };
      default:
        return {
          bg: 'bg-black',
          hover: 'hover:bg-gray-800',
          shadow: 'shadow-lg',
          hoverShadow: 'hover:shadow-xl',
          border: '',
          glow: 'none',
        };
    }
  };

  const styles = getThemeStyles();
  
  return (
    <motion.div 
      className="fixed bottom-6 right-6 z-50"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <audio 
        ref={audioRef} 
        src="/music.mp3" 
        loop 
        muted={!isPlaying}
      />
      <motion.button 
        onClick={togglePlay}
        className={`${styles.bg} ${styles.hover} ${styles.border} text-white rounded-full w-14 h-14 flex items-center justify-center ${styles.shadow} transition-all duration-300`}
        style={{
          boxShadow: isPlaying ? styles.glow : styles.shadow,
        }}
        whileHover={{ 
          scale: 1.1,
          boxShadow: styles.glow,
        }}
        whileTap={{ scale: 0.95 }}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
      >
        {isPlaying ? (
          // Pause icon
          <motion.svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-7 w-7" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </motion.svg>
        ) : (
          // Play icon
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
      </motion.button>

      {/* Theme-specific visual effects */}
      {theme === 'cosmic' && isPlaying && (
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 opacity-30 blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
      )}

      {theme === 'cyber' && isPlaying && (
        <motion.div
          className="absolute inset-0 border-2 border-green-400 rounded-full opacity-50"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        />
      )}

      {theme === 'holo' && isPlaying && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 opacity-40"
          style={{
            borderColor: '#00ffff',
          }}
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.4, 0, 0.4],
            borderColor: ['#00ffff', '#ff00ff', '#00ff00', '#00ffff'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
      )}
    </motion.div>
  );
};

export default ThemedMusicPlayer;