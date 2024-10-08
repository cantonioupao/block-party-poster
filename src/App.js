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
  const contentRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextTheme = () => {
    setCurrentTheme((prev) => (prev + 1) % colorThemes.length);
  };

  const prevTheme = () => {
    setCurrentTheme((prev) => (prev - 1 + colorThemes.length) % colorThemes.length);
  };

  const nextAnimation = () => {
    setCurrentAnimation((prev) => (prev + 1) % animations.length);
  };

  const prevAnimation = () => {
    setCurrentAnimation((prev) => (prev - 1 + animations.length) % animations.length);
  };

  const theme = colorThemes[currentTheme];
  const animation = animations[currentAnimation];

  return (
    <div className="flex flex-col md:flex-row h-screen bg-black">
      <div className="w-full md:w-1/6 flex flex-row md:flex-col items-center justify-center p-4">
        <button onClick={prevTheme} className="text-white hover:text-gray-300 mr-4 md:mr-0 md:mb-4">
          <ChevronLeft size={32} />
        </button>
        <button onClick={prevAnimation} className="text-green-500 hover:text-green-300">
          <ChevronUp size={32} />
        </button>
      </div>
      <div className="w-full md:w-2/3 relative flex flex-col" ref={contentRef}>
        <div className="absolute inset-0 bg-cover bg-center"
             style={{backgroundImage: "url('/block-party-background.png')", backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}}>
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 flex flex-col h-full text-white p-4 md:p-8">
          <div className="text-center mb-8 md:mb-16">
            <h1 className={`text-4xl md:text-7xl font-extrabold mb-2 ${animate ? animation : ''}`}>
              <span className="block mb-2" style={{
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
            <p className="text-xl md:text-3xl italic" style={{
              color: theme.subtitle,
              textShadow: `0 0 5px ${theme.subtitle}, 0 0 10px ${theme.subtitle}`
            }}>
              "Our Block's Last Dance"
            </p>
          </div>
          
          <div className="flex-grow"></div>
          
          <div className="text-center">
            <div className="bg-black bg-opacity-60 p-4 md:p-6 rounded-lg mb-4 inline-block">
              <p className="text-lg md:text-2xl mb-2">
                <span className="font-bold" style={{color: theme.emphasis}}>Date:</span> 12/10/2024, Saturday
              </p>
              <p className="text-lg md:text-2xl mb-2">
                <span className="font-bold" style={{color: theme.emphasis}}>Time:</span> 21:00
              </p>
              <p className="text-lg md:text-2xl mb-3">
                <span className="font-bold" style={{color: theme.emphasis}}>Location:</span> Kornhausstrasse 50, 8006 Zurich
              </p>
              <p className="text-md md:text-xl py-2 px-4 rounded inline-block" style={{backgroundColor: theme.emphasis, color: 'black'}}>
                Top Floor
              </p>
            </div>
            <p className="text-lg md:text-xl mb-2">#ZurichFinalBeat #DanceTillDemolition</p>
            <p className="text-xl md:text-2xl font-bold" style={{color: theme.emphasis}}>
              Bring Your Own Drinks!
            </p>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/6 flex flex-row md:flex-col items-center justify-center p-4">
        <button onClick={nextTheme} className="text-white hover:text-gray-300 mr-4 md:mr-0 md:mb-4">
          <ChevronRight size={32} />
        </button>
        <button onClick={nextAnimation} className="text-green-500 hover:text-green-300">
          <ChevronDown size={32} />
        </button>
      </div>
    </div>
  );
}