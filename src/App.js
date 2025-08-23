import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from 'lucide-react';

const colorThemes = [
  {
    twins: '#daa520',
    party: '#1565c0',
    subtitle: '#daa520',
    emphasis: '#daa520',
  },
  {
    twins: '#9c27b0',
    party: '#4caf50',
    subtitle: '#9c27b0',
    emphasis: '#9c27b0',
  },
  {
    twins: '#dc143c',
    party: '#1976d2',
    subtitle: '#dc143c',
    emphasis: '#dc143c',
  }
];

const animationStyles = [
  { name: 'Pulse Party', titleAnimation: 'animate-pulse' },
  { name: 'Bounce Celebration', titleAnimation: 'animate-bounce' },
  { name: 'Spin Festival', titleAnimation: 'animate-spin' }
];

export default function BlockPartyPoster() {
  const [currentTheme, setCurrentTheme] = useState(0);
  const [currentAnimation, setCurrentAnimation] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const audioRef = useRef(null);
  const volumeIntervalRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const startAudio = () => {
    if (audioRef.current && !audioStarted) {
      audioRef.current.volume = 0.1;
      audioRef.current.loop = true;
      audioRef.current.play().catch(error => console.error("Audio playback failed:", error));
      setAudioStarted(true);

      let volume = 0.1;
      volumeIntervalRef.current = setInterval(() => {
        volume = Math.min(volume + 0.05, 0.8);
        if (audioRef.current) {
          audioRef.current.volume = volume;
        }
        if (volume >= 0.8) {
          clearInterval(volumeIntervalRef.current);
        }
      }, 2000);
    }
  };

  useEffect(() => {
    return () => {
      if (volumeIntervalRef.current) {
        clearInterval(volumeIntervalRef.current);
      }
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const openInvitation = () => {
    setIsOpened(true);
    startAudio();
  };

  const nextTheme = () => {
    setCurrentTheme((prev) => (prev + 1) % colorThemes.length);
    startAudio();
  };

  const prevTheme = () => {
    setCurrentTheme((prev) => (prev - 1 + colorThemes.length) % colorThemes.length);
    startAudio();
  };

  const nextAnimation = () => {
    setCurrentAnimation((prev) => (prev + 1) % animationStyles.length);
    startAudio();
  };

  const prevAnimation = () => {
    setCurrentAnimation((prev) => (prev - 1 + animationStyles.length) % animationStyles.length);
    startAudio();
  };

  const theme = colorThemes[currentTheme];
  const animationStyle = animationStyles[currentAnimation];

  if (!isOpened) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black">
        <style jsx>{`
          @keyframes phoneVibrate {
            0% { transform: translateX(0); }
            10% { transform: translateX(-3px) rotate(-1deg); }
            20% { transform: translateX(3px) rotate(1deg); }
            30% { transform: translateX(-3px) rotate(-1deg); }
            40% { transform: translateX(3px) rotate(1deg); }
            50% { transform: translateX(-2px) rotate(-0.5deg); }
            60% { transform: translateX(2px) rotate(0.5deg); }
            70% { transform: translateX(-1px) rotate(-0.3deg); }
            80% { transform: translateX(1px) rotate(0.3deg); }
            90% { transform: translateX(-1px) rotate(-0.1deg); }
            100% { transform: translateX(0) rotate(0deg); }
          }
          
          .vibrating-ball {
            animation: phoneVibrate 0.8s ease-in-out infinite;
          }
          
          .ripple {
            animation: rippleEffect 2s ease-out infinite;
          }
          
          @keyframes rippleEffect {
            0% {
              transform: scale(0.8);
              opacity: 0.8;
            }
            50% {
              transform: scale(1.2);
              opacity: 0.4;
            }
            100% {
              transform: scale(1.8);
              opacity: 0;
            }
          }
        `}</style>
        
        <div 
          className="relative cursor-pointer transition-all duration-300 hover:scale-110 group"
          onClick={openInvitation}
        >
          {/* Simple Vibrating Image */}
          <div className="vibrating-ball relative">
            <img 
              src="https://i.ibb.co/YFfBSrNq/1000043595-removebg-preview.png"
              alt="Profile"
              className="w-32 h-auto max-w-none drop-shadow-2xl"
              style={{
                filter: 'drop-shadow(0 0 15px rgba(59, 130, 246, 0.8))'
              }}
            />
          </div>
          
          {/* Subtle Text Hint */}
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-center">
            <p className="text-sm text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Tap to open
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-black">
      <style jsx>{`
        @keyframes mildBubbleFloat {
          0% { 
            transform: translateY(100vh) scale(0); 
            opacity: 0; 
          }
          10% { 
            opacity: 0.2; 
            transform: translateY(90vh) scale(0.6);
          }
          50% {
            transform: translateY(50vh) scale(0.8);
            opacity: 0.3;
          }
          90% { 
            opacity: 0.1; 
            transform: translateY(10vh) scale(0.7);
          }
          100% { 
            transform: translateY(-5vh) scale(0); 
            opacity: 0; 
          }
        }
        .mild-bubble {
          position: absolute;
          border-radius: 50%;
          animation: mildBubbleFloat 20s linear infinite;
        }
        .mild-bubble:nth-child(2n) { animation-delay: -3s; }
        .mild-bubble:nth-child(3n) { animation-delay: -7s; }
        .mild-bubble:nth-child(4n) { animation-delay: -12s; }
        .mild-bubble:nth-child(5n) { animation-delay: -16s; }
        .mild-bubble:nth-child(6n) { animation-delay: -1s; }
        .mild-bubble:nth-child(7n) { animation-delay: -9s; }
        .mild-bubble:nth-child(8n) { animation-delay: -14s; }
      `}</style>
      
      <div className="flex-grow flex flex-col">
        <audio ref={audioRef}>
          <source src="/birthday-music.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>

        {/* Poster Container */}
        <div className="flex-grow flex items-center justify-center p-0 sm:p-4">
          <div className="relative w-full h-full max-h-[100vh] tall:max-h-[85vh] sm:max-w-[min(calc(100vh*0.7071-64px),calc((100vw-16px)*0.7071))] sm:max-h-[min(calc((100vw-16px)*1.4142),calc(100vh-80px))] sm:aspect-[1/1.4142] overflow-hidden">
            
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"></div>
            
            {/* Mild Gentle Bubbles Only */}
            <div className="mild-bubble" style={{
              left: '15%',
              width: '8px',
              height: '8px',
              backgroundColor: theme.twins,
              opacity: 0.15
            }}></div>
            <div className="mild-bubble" style={{
              left: '35%',
              width: '6px',
              height: '6px',
              backgroundColor: theme.party,
              opacity: 0.12
            }}></div>
            <div className="mild-bubble" style={{
              left: '55%',
              width: '10px',
              height: '10px',
              backgroundColor: theme.twins,
              opacity: 0.18
            }}></div>
            <div className="mild-bubble" style={{
              left: '75%',
              width: '7px',
              height: '7px',
              backgroundColor: theme.party,
              opacity: 0.14
            }}></div>
            <div className="mild-bubble" style={{
              left: '25%',
              width: '5px',
              height: '5px',
              backgroundColor: theme.twins,
              opacity: 0.16
            }}></div>
            <div className="mild-bubble" style={{
              left: '65%',
              width: '9px',
              height: '9px',
              backgroundColor: theme.party,
              opacity: 0.13
            }}></div>
            <div className="mild-bubble" style={{
              left: '85%',
              width: '6px',
              height: '6px',
              backgroundColor: theme.twins,
              opacity: 0.11
            }}></div>
            <div className="mild-bubble" style={{
              left: '5%',
              width: '8px',
              height: '8px',
              backgroundColor: theme.party,
              opacity: 0.17
            }}></div>
            
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
            
            {/* Poster Content */}
            <div className="relative z-10 flex flex-col justify-between h-full text-white p-2 sm:p-4 overflow-y-auto">
              <div className="text-center sm:mb-4 absolute inset-x-0 top-1/3 sm:relative sm:top-0 transform -translate-y-1/2 sm:transform-none">
                <h1 className={`text-5xl sm:text-4xl md:text-6xl font-extrabold mb-2 sm:mb-2 ${animate ? animationStyle.titleAnimation : ''}`}>
                  <span className="block mb-1 sm:mb-1" style={{
                    color: theme.twins,
                    textShadow: `0 0 2px #fff, 0 0 4px #fff, 0 0 6px #fff, 0 0 10px ${theme.twins}, 0 0 20px ${theme.twins}, 0 0 30px ${theme.twins}, 0 0 40px ${theme.twins}`
                  }}>
                    TWINS
                  </span>
                  <span className="block" style={{
                    color: 'white',
                    textShadow: `0 0 2px #fff, 0 0 4px #fff, 0 0 6px #fff, 0 0 10px ${theme.party}, 0 0 20px ${theme.party}, 0 0 30px ${theme.party}, 0 0 40px ${theme.party}`
                  }}>
                    PARTY
                  </span>
                </h1>
                <p className="text-2xl sm:text-xl md:text-3xl italic" style={{
                  color: theme.subtitle,
                  textShadow: `0 0 5px ${theme.subtitle}, 0 0 10px ${theme.subtitle}`
                }}>
                  "Double the Fun, Double the Joy"
                </p>
              </div>
              
              <div className="text-center mt-auto">
                <div className="bg-black bg-opacity-60 p-2 sm:p-3 rounded-lg mb-1 sm:mb-3 w-full">
                  <p className="text-sm sm:text-base md:text-xl mb-0.5 sm:mb-1">
                    <span className="font-bold" style={{color: theme.emphasis}}>Date:</span> Saturday, September 13th
                  </p>
                  <p className="text-sm sm:text-base md:text-xl mb-0.5 sm:mb-1">
                    <span className="font-bold" style={{color: theme.emphasis}}>Time:</span> 22:00
                  </p>
                  <p className="text-sm sm:text-base md:text-xl mb-0.5 sm:mb-2">
                    <span className="font-bold" style={{color: theme.emphasis}}>Location:</span> Pirrou 9, Kifisia 145 64
                  </p>
                  <p className="text-xs sm:text-sm md:text-lg py-0.5 sm:py-1 px-2 rounded inline-block" style={{backgroundColor: theme.emphasis, color: 'white'}}>
                    26th Birthday Celebration
                  </p>
                </div>
                <p className="text-sm sm:text-base md:text-xl mb-0.5 sm:mb-1">#TwinsParty2024 #DoubleCelebration #26AndThriving</p>
                <p className="text-base sm:text-lg md:text-2xl font-bold" style={{color: theme.emphasis}}>
                  Come Celebrate With Us!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-center items-center w-full h-12 sm:h-16 bg-black">
          <button onClick={prevTheme} className="text-white hover:text-gray-300 mx-2 sm:mx-2">
            <ChevronLeft size={20} />
          </button>
          <button onClick={prevAnimation} className="text-green-500 hover:text-green-300 mx-2 sm:mx-2">
            <ChevronUp size={20} />
          </button>
          <button onClick={nextAnimation} className="text-green-500 hover:text-green-300 mx-2 sm:mx-2">
            <ChevronDown size={20} />
          </button>
          <button onClick={nextTheme} className="text-white hover:text-gray-300 mx-2 sm:mx-2">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
