import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from 'lucide-react';

const colorThemes = [
  {
    demolition: '#ffa500',
    party: '#ffd700',
    subtitle: '#ffa500',
    emphasis: '#ffa500',
  },
  {
    demolition: '#7fffd4',
    party: '#ff1493',
    subtitle: '#7fffd4',
    emphasis: '#7fffd4',
  },
  {
    demolition: '#00fa9a',
    party: '#9400d3',
    subtitle: '#00fa9a',
    emphasis: '#00fa9a',
  }
];

const animations = [
  'animate-shake',
  'animate-pulse',
  'animate-bounce',
  'animate-spin',
  'animate-ping',
  'animate-float',
  'animate-flip'
];

export default function BlockPartyPoster() {
  const [currentTheme, setCurrentTheme] = useState(0);
  const [currentAnimation, setCurrentAnimation] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);
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
      audioRef.current.volume = 0.1; // Start with volume at 0.1
      audioRef.current.loop = true; // Enable looping
      audioRef.current.play().catch(error => console.error("Audio playback failed:", error));
      setAudioStarted(true);

      let volume = 0.1;
      volumeIntervalRef.current = setInterval(() => {
        volume = Math.min(volume + 0.05, 0.8); // Increase by 0.05 every 2 seconds, max 0.8
        if (audioRef.current) {
          audioRef.current.volume = volume;
        }
        if (volume >= 0.8) {
          clearInterval(volumeIntervalRef.current); // Stop increasing when we reach 0.8
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

  const nextTheme = () => {
    setCurrentTheme((prev) => (prev + 1) % colorThemes.length);
    startAudio();
  };

  const prevTheme = () => {
    setCurrentTheme((prev) => (prev - 1 + colorThemes.length) % colorThemes.length);
    startAudio();
  };

  const nextAnimation = () => {
    setCurrentAnimation((prev) => (prev + 1) % animations.length);
    startAudio();
  };

  const prevAnimation = () => {
    setCurrentAnimation((prev) => (prev - 1 + animations.length) % animations.length);
    startAudio();
  };

  const theme = colorThemes[currentTheme];
  const animation = animations[currentAnimation];

  return (
    <div className="flex flex-col h-screen bg-black">
      <div className="flex-grow flex flex-col">
        {/* Audio element */}
        <audio ref={audioRef}>
          <source src="/song.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>

        {/* Poster Container */}
        <div className="flex-grow flex items-center justify-center p-0 sm:p-4">
          <div className="relative w-full h-full max-h-[100vh] tall:max-h-[85vh] sm:max-w-[min(calc(100vh*0.7071-64px),calc((100vw-16px)*0.7071))] sm:max-h-[min(calc((100vw-16px)*1.4142),calc(100vh-80px))] sm:aspect-[1/1.4142]">
            {/* Background Image */}
            <div className="absolute inset-0 bg-cover bg-center tall:bg-bottom"
                 style={{backgroundImage: "url('/block-party-background.png')", backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            
            {/* Poster Content */}
            <div className="relative z-10 flex flex-col justify-between h-full text-white p-2 sm:p-4 overflow-y-auto">
              <div className="text-center mb-1 sm:mb-4">
                <h1 className={`text-4xl sm:text-4xl md:text-6xl font-extrabold mb-1 sm:mb-2 ${animate ? animation : ''}`}>
                  <span className="block mb-0 sm:mb-1" style={{
                    color: theme.demolition,
                    textShadow: `0 0 2px #fff, 0 0 4px #fff, 0 0 6px #fff, 0 0 10px ${theme.demolition}, 0 0 20px ${theme.demolition}, 0 0 30px ${theme.demolition}, 0 0 40px ${theme.demolition}`
                  }}>
                    DEMOLITION
                  </span>
                  <span className="block" style={{
                    color: 'white',
                    textShadow: `0 0 2px #fff, 0 0 4px #fff, 0 0 6px #fff, 0 0 10px ${theme.party}, 0 0 20px ${theme.party}, 0 0 30px ${theme.party}, 0 0 40px ${theme.party}`
                  }}>
                    PARTY
                  </span>
                </h1>
                <p className="text-lg sm:text-xl md:text-3xl italic" style={{
                  color: theme.subtitle,
                  textShadow: `0 0 5px ${theme.subtitle}, 0 0 10px ${theme.subtitle}`
                }}>
                  "Our Block's Last Dance"
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-black bg-opacity-60 p-2 sm:p-3 rounded-lg mb-1 sm:mb-3 w-full">
                  <p className="text-sm sm:text-base md:text-xl mb-0.5 sm:mb-1">
                    <span className="font-bold" style={{color: theme.emphasis}}>Date:</span> 12/10/2024, Saturday
                  </p>
                  <p className="text-sm sm:text-base md:text-xl mb-0.5 sm:mb-1">
                    <span className="font-bold" style={{color: theme.emphasis}}>Time:</span> 21:00
                  </p>
                  <p className="text-sm sm:text-base md:text-xl mb-0.5 sm:mb-2">
                    <span className="font-bold" style={{color: theme.emphasis}}>Location:</span> Kornhausstrasse 50, 8006 Zurich
                  </p>
                  <p className="text-xs sm:text-sm md:text-lg py-0.5 sm:py-1 px-2 rounded inline-block" style={{backgroundColor: theme.emphasis, color: 'black'}}>
                    Top Floor
                  </p>
                </div>
                <p className="text-sm sm:text-base md:text-xl mb-0.5 sm:mb-1">#ZurichFinalBeat #DanceTillDemolition</p>
                <p className="text-base sm:text-lg md:text-2xl font-bold" style={{color: theme.emphasis}}>
                  Bring Your Own Drinks!
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