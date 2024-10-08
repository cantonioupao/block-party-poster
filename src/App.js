import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown, Video } from 'lucide-react';

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
  const [isRecording, setIsRecording] = useState(false);
  const contentRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

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

  const handleVideoExport = async () => {
    if (isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    } else {
      chunksRef.current = [];
      try {
        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: {
            displaySurface: "browser",
            frameRate: 60,
            width: { ideal: 3840 },
            height: { ideal: 2160 }
          },
          audio: false
        });

        mediaRecorderRef.current = new MediaRecorder(stream, {
          mimeType: 'video/webm; codecs=vp9',
          videoBitsPerSecond: 50000000 // 50 Mbps for ultra high quality
        });

        mediaRecorderRef.current.ondataavailable = (event) => {
          if (event.data.size > 0) {
            chunksRef.current.push(event.data);
          }
        };

        mediaRecorderRef.current.onstop = () => {
          const blob = new Blob(chunksRef.current, { type: 'video/webm' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          document.body.appendChild(a);
          a.style = 'display: none';
          a.href = url;
          a.download = 'block-party-poster-ultra-hd.webm';
          a.click();
          window.URL.revokeObjectURL(url);
          stream.getTracks().forEach(track => track.stop());
        };

        mediaRecorderRef.current.start();
        setIsRecording(true);

        // Stop recording after 10 seconds
        setTimeout(() => {
          if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
          }
        }, 10000);

      } catch (err) {
        console.error("Error: " + err);
      }
    }
  };

  const theme = colorThemes[currentTheme];
  const animation = animations[currentAnimation];

  return (
    <div className="flex h-screen bg-black">
      <div className="w-1/6 flex flex-col items-center justify-center">
        <button onClick={prevTheme} className="text-white hover:text-gray-300 mb-4">
          <ChevronLeft size={48} />
        </button>
        <button onClick={prevAnimation} className="text-green-500 hover:text-green-300">
          <ChevronUp size={48} />
        </button>
      </div>
      <div className="w-2/3 relative" ref={contentRef}>
        <div className="absolute inset-0 bg-cover bg-center"
             style={{backgroundImage: "url('/block-party-background.png')", backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}}>
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 h-full flex flex-col justify-between items-center text-center text-white p-8">
          <div className="mt-4">
            <h1 className={`text-7xl font-extrabold mb-2 ${animate ? animation : ''}`}>
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
            <p className="text-3xl italic mb-8" style={{
              color: theme.subtitle,
              textShadow: `0 0 5px ${theme.subtitle}, 0 0 10px ${theme.subtitle}`
            }}>
              "Our Block's Last Dance"
            </p>
          </div>

          <div className="mb-8">
            <div className="bg-black bg-opacity-60 p-6 rounded-lg mb-6 max-w-md">
              <p className="text-2xl mb-3">
                <span className="font-bold" style={{color: theme.emphasis}}>Date:</span> 12/10/2024, Saturday
              </p>
              <p className="text-2xl mb-3">
                <span className="font-bold" style={{color: theme.emphasis}}>Time:</span> 21:00
              </p>
              <p className="text-2xl mb-4">
                <span className="font-bold" style={{color: theme.emphasis}}>Location:</span> Kornhausstrasse 50, 8006 Zurich
              </p>
              <p className="text-xl py-2 px-4 rounded" style={{backgroundColor: theme.emphasis, color: 'black'}}>
                Top Floor
              </p>
            </div>
            <p className="text-xl">#ZurichFinalBeat #DanceTillDemolition</p>
          </div>
        </div>
      </div>
      <div className="w-1/6 flex flex-col items-center justify-center">
        <button onClick={nextTheme} className="text-white hover:text-gray-300 mb-4">
          <ChevronRight size={48} />
        </button>
        <button onClick={nextAnimation} className="text-green-500 hover:text-green-300 mb-4">
          <ChevronDown size={48} />
        </button>
        <button onClick={handleVideoExport} className="text-blue-500 hover:text-blue-300">
          <Video size={48} />
        </button>
      </div>
    </div>
  );
}