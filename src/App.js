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

export default function TwinsPartyPoster() {
  const [currentTheme, setCurrentTheme] = useState(0);
  const [currentAnimation, setCurrentAnimation] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const audioRef = useRef(null);
  const volumeIntervalRef = useRef(null);

  useEffect(() => {
    // Set the page title
    document.title = "Twins Party";
    
    const interval = setInterval(() => {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const startAudio = () => {
    console.log("startAudio called, audioStarted:", audioStarted);
    if (audioRef.current && !audioStarted) {
      console.log("Audio element found, attempting to play...");
      audioRef.current.volume = 0.1;
      audioRef.current.loop = true;
      audioRef.current.currentTime = 0; // Start from beginning
      
      // Try to play the audio
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("Audio started successfully!");
            setAudioStarted(true);

            // Gradually increase volume
            let volume = 0.1;
            volumeIntervalRef.current = setInterval(() => {
              volume = Math.min(volume + 0.05, 0.8);
              if (audioRef.current) {
                audioRef.current.volume = volume;
                console.log("Volume increased to:", volume);
              }
              if (volume >= 0.8) {
                clearInterval(volumeIntervalRef.current);
                console.log("Volume fade-in complete");
              }
            }, 2000);
          })
          .catch(error => {
            console.error("Audio playback failed:", error);
            console.log("Audio file path:", audioRef.current?.src);
            console.log("Audio ready state:", audioRef.current?.readyState);
            console.log("Audio network state:", audioRef.current?.networkState);
          });
      }
    } else {
      console.log("Audio not started - audioRef:", !!audioRef.current, "audioStarted:", audioStarted);
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
    // Ensure audio starts immediately when invitation opens
    setTimeout(() => startAudio(), 100);
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
          @keyframes intenseBounce {
            0%, 100% { transform: translateY(0px) scale(1); }
            10% { transform: translateY(-8px) translateX(-4px) rotate(-2deg) scale(1.05); }
            20% { transform: translateY(-12px) translateX(6px) rotate(3deg) scale(1.08); }
            30% { transform: translateY(-6px) translateX(-3px) rotate(-2deg) scale(1.03); }
            40% { transform: translateY(-10px) translateX(5px) rotate(2.5deg) scale(1.06); }
            50% { transform: translateY(-4px) translateX(-2px) rotate(-1deg) scale(1.02); }
            60% { transform: translateY(-8px) translateX(4px) rotate(2deg) scale(1.04); }
            70% { transform: translateY(-3px) translateX(-2px) rotate(-1.5deg) scale(1.01); }
            80% { transform: translateY(-6px) translateX(3px) rotate(1deg) scale(1.03); }
            90% { transform: translateY(-2px) translateX(-1px) rotate(-0.5deg) scale(1.01); }
          }
          
          @keyframes pulseGlow {
            0%, 100% { 
              filter: drop-shadow(0 0 15px rgba(59, 130, 246, 0.8)) drop-shadow(0 0 25px rgba(168, 85, 247, 0.4));
              transform: scale(1);
            }
            50% { 
              filter: drop-shadow(0 0 30px rgba(59, 130, 246, 1)) drop-shadow(0 0 50px rgba(168, 85, 247, 0.7)) drop-shadow(0 0 70px rgba(34, 197, 94, 0.5));
              transform: scale(1.1);
            }
          }
          
          .vibrating-ball {
            animation: intenseBounce 1.2s ease-in-out infinite, pulseGlow 2s ease-in-out infinite;
          }
          
          @keyframes rippleWave {
            0% {
              transform: scale(0.8);
              opacity: 0.9;
              border-width: 2px;
            }
            30% {
              transform: scale(1.4);
              opacity: 0.6;
              border-width: 4px;
            }
            70% {
              transform: scale(2.2);
              opacity: 0.3;
              border-width: 2px;
            }
            100% {
              transform: scale(3);
              opacity: 0;
              border-width: 1px;
            }
          }
          
          .ripple-ring {
            position: absolute;
            border: 2px solid rgba(59, 130, 246, 0.6);
            border-radius: 50%;
            animation: rippleWave 3s ease-out infinite;
          }
          
          .ripple-ring:nth-child(2) { animation-delay: -0.8s; }
          .ripple-ring:nth-child(3) { animation-delay: -1.6s; }
          .ripple-ring:nth-child(4) { animation-delay: -2.4s; }
          
          @keyframes floatingParticles {
            0% { 
              transform: translateY(0) rotate(0deg);
              opacity: 0;
            }
            10% {
              opacity: 0.8;
            }
            90% {
              opacity: 0.2;
            }
            100% {
              transform: translateY(-120px) rotate(360deg);
              opacity: 0;
            }
          }
          
          .floating-particle {
            position: absolute;
            border-radius: 50%;
            animation: floatingParticles 4s ease-out infinite;
          }
          
          .floating-particle:nth-child(2) { animation-delay: -0.5s; left: 20%; }
          .floating-particle:nth-child(3) { animation-delay: -1s; left: 80%; }
          .floating-particle:nth-child(4) { animation-delay: -1.5s; left: 40%; }
          .floating-particle:nth-child(5) { animation-delay: -2s; left: 60%; }
          .floating-particle:nth-child(6) { animation-delay: -2.5s; left: 10%; }
          .floating-particle:nth-child(7) { animation-delay: -3s; left: 90%; }
        `}</style>
        
        <div 
          className="relative cursor-pointer transition-all duration-300 hover:scale-125 group"
          onClick={openInvitation}
        >
          {/* Ripple Rings */}
          <div className="ripple-ring" style={{
            left: '50%',
            top: '50%',
            width: '160px',
            height: '160px',
            marginLeft: '-80px',
            marginTop: '-80px'
          }}></div>
          <div className="ripple-ring" style={{
            left: '50%',
            top: '50%',
            width: '160px',
            height: '160px',
            marginLeft: '-80px',
            marginTop: '-80px',
            borderColor: 'rgba(168, 85, 247, 0.5)'
          }}></div>
          <div className="ripple-ring" style={{
            left: '50%',
            top: '50%',
            width: '160px',
            height: '160px',
            marginLeft: '-80px',
            marginTop: '-80px',
            borderColor: 'rgba(34, 197, 94, 0.4)'
          }}></div>
          <div className="ripple-ring" style={{
            left: '50%',
            top: '50%',
            width: '160px',
            height: '160px',
            marginLeft: '-80px',
            marginTop: '-80px',
            borderColor: 'rgba(251, 191, 36, 0.3)'
          }}></div>
          
          {/* Floating Particles */}
          <div className="floating-particle" style={{
            width: '6px',
            height: '6px',
            backgroundColor: 'rgba(59, 130, 246, 0.8)',
            left: '30%',
            top: '100%'
          }}></div>
          <div className="floating-particle" style={{
            width: '4px',
            height: '4px',
            backgroundColor: 'rgba(168, 85, 247, 0.7)',
            top: '100%'
          }}></div>
          <div className="floating-particle" style={{
            width: '5px',
            height: '5px',
            backgroundColor: 'rgba(34, 197, 94, 0.6)',
            top: '100%'
          }}></div>
          <div className="floating-particle" style={{
            width: '3px',
            height: '3px',
            backgroundColor: 'rgba(251, 191, 36, 0.8)',
            top: '100%'
          }}></div>
          <div className="floating-particle" style={{
            width: '7px',
            height: '7px',
            backgroundColor: 'rgba(239, 68, 68, 0.7)',
            top: '100%'
          }}></div>
          <div className="floating-particle" style={{
            width: '4px',
            height: '4px',
            backgroundColor: 'rgba(59, 130, 246, 0.6)',
            top: '100%'
          }}></div>
          <div className="floating-particle" style={{
            width: '5px',
            height: '5px',
            backgroundColor: 'rgba(168, 85, 247, 0.5)',
            top: '100%'
          }}></div>

          {/* Main Vibrating Image */}
          <div className="vibrating-ball relative z-10">
            <img 
              src="https://i.ibb.co/67bgZTMv/face.png"
              alt="Profile"
              className="w-32 h-auto max-w-none drop-shadow-2xl"
            />
          </div>
        </div>
        
        {/* Hidden audio element for preloading */}
        <audio ref={audioRef} preload="auto">
          <source src="/bunny_song.mp3" type="audio/mpeg" />
        </audio>
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
        .mild-bubble:nth-child(9n) { animation-delay: -2s; }
        .mild-bubble:nth-child(10n) { animation-delay: -5s; }
        .mild-bubble:nth-child(11n) { animation-delay: -8s; }
        .mild-bubble:nth-child(12n) { animation-delay: -11s; }
        .mild-bubble:nth-child(13n) { animation-delay: -15s; }
        .mild-bubble:nth-child(14n) { animation-delay: -18s; }
        .mild-bubble:nth-child(15n) { animation-delay: -4s; }
        .mild-bubble:nth-child(16n) { animation-delay: -6s; }
        .mild-bubble:nth-child(17n) { animation-delay: -10s; }
        .mild-bubble:nth-child(18n) { animation-delay: -13s; }
        .mild-bubble:nth-child(19n) { animation-delay: -17s; }
        .mild-bubble:nth-child(20n) { animation-delay: -19s; }
        
        @keyframes fireworkBurst {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
          }
          15% {
            transform: scale(0.3) rotate(45deg);
            opacity: 1;
          }
          30% {
            transform: scale(0.8) rotate(90deg);
            opacity: 0.9;
          }
          50% {
            transform: scale(1.2) rotate(180deg);
            opacity: 0.7;
          }
          70% {
            transform: scale(1.5) rotate(270deg);
            opacity: 0.4;
          }
          100% {
            transform: scale(2) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes fireworkTrail {
          0% {
            transform: translateY(0) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          50% {
            transform: translateY(-50px) scale(0.5);
            opacity: 0.8;
          }
          80% {
            transform: translateY(-100px) scale(0.8);
            opacity: 0.3;
          }
          100% {
            transform: translateY(-150px) scale(1);
            opacity: 0;
          }
        }
        
        .firework {
          position: absolute;
          pointer-events: none;
        }
        
        .firework-burst {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          animation: fireworkBurst 2s ease-out infinite;
        }
        
        .firework-trail {
          width: 2px;
          height: 20px;
          border-radius: 2px;
          animation: fireworkTrail 1.5s ease-out infinite;
        }
        
        .firework:nth-child(1) { 
          top: 20%; left: 10%; 
          animation-delay: 0s; 
        }
        .firework:nth-child(2) { 
          top: 30%; left: 80%; 
          animation-delay: -2s; 
        }
        .firework:nth-child(3) { 
          top: 15%; left: 60%; 
          animation-delay: -4s; 
        }
        .firework:nth-child(4) { 
          top: 40%; left: 20%; 
          animation-delay: -1s; 
        }
        .firework:nth-child(5) { 
          top: 25%; left: 90%; 
          animation-delay: -3s; 
        }
        .firework:nth-child(6) { 
          top: 35%; left: 40%; 
          animation-delay: -5s; 
        }
        .firework:nth-child(7) { 
          top: 10%; left: 30%; 
          animation-delay: -1.5s; 
        }
        .firework:nth-child(8) { 
          top: 45%; left: 70%; 
          animation-delay: -3.5s; 
        }
      `}</style>
      
      <div className="flex-grow flex flex-col">
        <audio ref={audioRef} preload="auto">
          <source src="/bunny_song.mp3" type="audio/mpeg" />
        </audio>

        {/* Poster Container */}
        <div className="flex-grow flex items-center justify-center p-0 sm:p-4">
          <div className="relative w-full h-full max-h-[100vh] tall:max-h-[85vh] sm:max-w-[min(calc(100vh*0.7071-64px),calc((100vw-16px)*0.7071))] sm:max-h-[min(calc((100vw-16px)*1.4142),calc(100vh-80px))] sm:aspect-[1/1.4142] overflow-hidden">
            
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"></div>
            
            {/* Enhanced Bubbles Background */}
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
            
            {/* Additional Bubbles for More Effect */}
            <div className="mild-bubble" style={{
              left: '10%',
              width: '4px',
              height: '4px',
              backgroundColor: theme.twins,
              opacity: 0.12
            }}></div>
            <div className="mild-bubble" style={{
              left: '20%',
              width: '7px',
              height: '7px',
              backgroundColor: theme.party,
              opacity: 0.15
            }}></div>
            <div className="mild-bubble" style={{
              left: '40%',
              width: '5px',
              height: '5px',
              backgroundColor: theme.twins,
              opacity: 0.13
            }}></div>
            <div className="mild-bubble" style={{
              left: '50%',
              width: '9px',
              height: '9px',
              backgroundColor: theme.party,
              opacity: 0.16
            }}></div>
            <div className="mild-bubble" style={{
              left: '70%',
              width: '6px',
              height: '6px',
              backgroundColor: theme.twins,
              opacity: 0.14
            }}></div>
            <div className="mild-bubble" style={{
              left: '80%',
              width: '8px',
              height: '8px',
              backgroundColor: theme.party,
              opacity: 0.12
            }}></div>
            <div className="mild-bubble" style={{
              left: '90%',
              width: '4px',
              height: '4px',
              backgroundColor: theme.twins,
              opacity: 0.15
            }}></div>
            <div className="mild-bubble" style={{
              left: '12%',
              width: '6px',
              height: '6px',
              backgroundColor: theme.party,
              opacity: 0.11
            }}></div>
            <div className="mild-bubble" style={{
              left: '32%',
              width: '7px',
              height: '7px',
              backgroundColor: theme.twins,
              opacity: 0.17
            }}></div>
            <div className="mild-bubble" style={{
              left: '52%',
              width: '5px',
              height: '5px',
              backgroundColor: theme.party,
              opacity: 0.13
            }}></div>
            <div className="mild-bubble" style={{
              left: '72%',
              width: '8px',
              height: '8px',
              backgroundColor: theme.twins,
              opacity: 0.14
            }}></div>
            <div className="mild-bubble" style={{
              left: '92%',
              width: '6px',
              height: '6px',
              backgroundColor: theme.party,
              opacity: 0.12
            }}></div>
            
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
            
            {/* Animated Fireworks */}
            <div className="firework">
              <div className="firework-trail" style={{backgroundColor: theme.twins}}></div>
              <div className="firework-burst" style={{backgroundColor: theme.twins, boxShadow: `0 0 15px ${theme.twins}`}}></div>
            </div>
            <div className="firework">
              <div className="firework-trail" style={{backgroundColor: theme.party}}></div>
              <div className="firework-burst" style={{backgroundColor: theme.party, boxShadow: `0 0 15px ${theme.party}`}}></div>
            </div>
            <div className="firework">
              <div className="firework-trail" style={{backgroundColor: '#ffd700'}}></div>
              <div className="firework-burst" style={{backgroundColor: '#ffd700', boxShadow: '0 0 15px #ffd700'}}></div>
            </div>
            <div className="firework">
              <div className="firework-trail" style={{backgroundColor: '#ff6b6b'}}></div>
              <div className="firework-burst" style={{backgroundColor: '#ff6b6b', boxShadow: '0 0 15px #ff6b6b'}}></div>
            </div>
            <div className="firework">
              <div className="firework-trail" style={{backgroundColor: '#4ecdc4'}}></div>
              <div className="firework-burst" style={{backgroundColor: '#4ecdc4', boxShadow: '0 0 15px #4ecdc4'}}></div>
            </div>
            <div className="firework">
              <div className="firework-trail" style={{backgroundColor: theme.twins}}></div>
              <div className="firework-burst" style={{backgroundColor: theme.twins, boxShadow: `0 0 15px ${theme.twins}`}}></div>
            </div>
            <div className="firework">
              <div className="firework-trail" style={{backgroundColor: '#ff69b4'}}></div>
              <div className="firework-burst" style={{backgroundColor: '#ff69b4', boxShadow: '0 0 15px #ff69b4'}}></div>
            </div>
            <div className="firework">
              <div className="firework-trail" style={{backgroundColor: theme.party}}></div>
              <div className="firework-burst" style={{backgroundColor: theme.party, boxShadow: `0 0 15px ${theme.party}`}}></div>
            </div>
            
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
