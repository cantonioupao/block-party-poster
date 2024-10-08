import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextTheme = () => setCurrentTheme((prev) => (prev + 1) % colorThemes.length);
  const prevTheme = () => setCurrentTheme((prev) => (prev - 1 + colorThemes.length) % colorThemes.length);
  const nextAnimation = () => setCurrentAnimation((prev) => (prev + 1) % animations.length);
  const prevAnimation = () => setCurrentAnimation((prev) => (prev - 1 + animations.length) % animations.length);

  const theme = colorThemes[currentTheme];
  const animation = animations[currentAnimation];

  return (
    <div className="flex flex-col h-screen bg-black">
      <div className="flex-grow flex flex-col">
        {/* Poster Container */}
        <div className="flex-grow flex items-center justify-center p-0 sm:p-4">
          <div className="relative w-full h-full sm:max-w-[min(calc(100vh*0.7071-64px),calc((100vw-16px)*0.7071))] sm:max-h-[min(calc((100vw-16px)*1.4142),calc(100vh-80px))] sm:aspect-[1/1.4142]">
            {/* Background Image */}
            <div className="absolute inset-0 bg-cover bg-center"
                 style={{backgroundImage: "url('/block-party-background.png')", backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}>
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            
            {/* Poster Content */}
            <div className="relative z-10 flex flex-col h-full text-white p-3 sm:p-4 overflow-y-auto">
              <div className="flex-grow"></div>
              
              <div className="text-center mb-3 sm:mb-4">
                <h1 className={`text-5xl sm:text-4xl md:text-6xl font-extrabold mb-2 sm:mb-2 ${animate ? animation : ''}`}>
                  <span className="block mb-1" style={{
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
                <p className="text-xl sm:text-xl md:text-3xl italic" style={{
                  color: theme.subtitle,
                  textShadow: `0 0 5px ${theme.subtitle}, 0 0 10px ${theme.subtitle}`
                }}>
                  "Our Block's Last Dance"
                </p>
              </div>
              
              <div className="flex-grow"></div>
              
              <div className="text-center">
                <div className="bg-black bg-opacity-60 p-3 sm:p-3 rounded-lg mb-3 sm:mb-3 inline-block">
                  <p className="text-base sm:text-base md:text-xl mb-1">
                    <span className="font-bold" style={{color: theme.emphasis}}>Date:</span> 12/10/2024, Saturday
                  </p>
                  <p className="text-base sm:text-base md:text-xl mb-1">
                    <span className="font-bold" style={{color: theme.emphasis}}>Time:</span> 21:00
                  </p>
                  <p className="text-base sm:text-base md:text-xl mb-2 sm:mb-2">
                    <span className="font-bold" style={{color: theme.emphasis}}>Location:</span> Kornhausstrasse 50, 8006 Zurich
                  </p>
                  <p className="text-sm sm:text-sm md:text-lg py-1 px-2 rounded inline-block" style={{backgroundColor: theme.emphasis, color: 'black'}}>
                    Top Floor
                  </p>
                </div>
                <p className="text-base sm:text-base md:text-xl mb-2">#ZurichFinalBeat #DanceTillDemolition</p>
                <p className="text-lg sm:text-lg md:text-2xl font-bold" style={{color: theme.emphasis}}>
                  Bring Your Own Drinks!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-center items-center w-full h-16 sm:h-16 bg-black">
          <button onClick={prevTheme} className="text-white hover:text-gray-300 mx-2 sm:mx-2">
            <ChevronLeft size={24} />
          </button>
          <button onClick={prevAnimation} className="text-green-500 hover:text-green-300 mx-2 sm:mx-2">
            <ChevronUp size={24} />
          </button>
          <button onClick={nextAnimation} className="text-green-500 hover:text-green-300 mx-2 sm:mx-2">
            <ChevronDown size={24} />
          </button>
          <button onClick={nextTheme} className="text-white hover:text-gray-300 mx-2 sm:mx-2">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}