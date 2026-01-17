"use client";

import React, { useEffect, useState } from 'react';

interface BackgroundPosition {
  top: number;
  left: number;
}

interface ParticlePosition {
  top: number;
  left: number;
  delay: number;
  duration: number;
}

export default function MagazineLanding() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [backgroundPositions, setBackgroundPositions] = useState<BackgroundPosition[]>([]);
  const [particlePositions, setParticlePositions] = useState<ParticlePosition[]>([]);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isMagazineHovered, setIsMagazineHovered] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    // Generate random positions for background elements
    const bgPositions = [...Array(5)].map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
    }));
    setBackgroundPositions(bgPositions);

    // Generate random positions for particles
    const partPositions = [...Array(20)].map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 3,
    }));
    setParticlePositions(partPositions);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % 4);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative min-h-screen supports-[height:100dvh]:min-h-[100dvh] bg-gradient-to-br from-zinc-900 via-neutral-800 to-stone-900 overflow-x-hidden">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes glow-move {
          0%, 100% { box-shadow: -5px 0 30px rgba(251, 191, 36, 0.3); }
          50% { box-shadow: 5px 0 30px rgba(251, 191, 36, 0.8); }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes line-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes bounce-scroll {
          0%, 100% {
            transform: translateY(0);
            opacity: 0.4;
          }
          50% {
            transform: translateY(10px);
            opacity: 1;
          }
        }
        @keyframes dot-pulse {
          0%, 100% {
            box-shadow: 0 0 10px rgba(251, 191, 36, 0.6);
            transform: translateX(-50%) scale(1);
          }
          50% {
            box-shadow: 0 0 20px rgba(251, 191, 36, 1);
            transform: translateX(-50%) scale(1.5);
          }
        }
      `}} />
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {backgroundPositions.map((pos, i) => (
          <div
            key={i}
            className="absolute rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${
                i % 2 === 0 ? '#d4af37' : '#8b7355'
              }, transparent)`,
              width: `${300 + i * 100}px`,
              height: `${300 + i * 100}px`,
              top: `${pos.top}%`,
              left: `${pos.left}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + i}s`,
            }}
          />
        ))}
      </div>

      {/* Parallax background layer */}
      <div
        className="fixed inset-0 transition-transform duration-300 ease-out pointer-events-none"
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
        }}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl" />
      </div>

      {/* Floating particles effect */}
      <div className="fixed inset-0 pointer-events-none">
        {particlePositions.map((pos, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-amber-400/20 rounded-full animate-pulse"
            style={{
              top: `${pos.top}%`,
              left: `${pos.left}%`,
              animationDelay: `${pos.delay}s`,
              animationDuration: `${pos.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden flex flex-col">
        {/* Navbar */}
        <nav className="fixed top-0 left-0 w-full z-50 p-6 sm:p-12 flex justify-start backdrop-blur-sm bg-gradient-to-b from-black/20 to-transparent pointer-events-none">
          <div className="group relative cursor-pointer pointer-events-auto" onClick={handleScrollTop}>
            <span className="text-amber-400 font-[family-name:var(--font-playfair-display)] font-bold text-xl tracking-[0.2em] uppercase transition-all duration-300 group-hover:text-amber-300 group-hover:drop-shadow-[0_0_10px_rgba(251,191,36,0.6)]">
              Home
            </span>
            <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
          </div>
        </nav>

        <div className="relative z-10 flex flex-col lg:flex-row min-h-screen supports-[height:100dvh]:min-h-[100dvh] flex-grow">
        {/* Left side - Logo */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-2 py-20 sm:p-12 lg:p-16">
          <div className="text-center lg:text-left">
            {/* Animated letters */}
            <div className="mb-4 lg:mb-2 overflow-hidden leading-[0.85] lg:leading-normal">
              {['Q', 'U', 'O', 'S', 'S', 'I'].map((letter, i) => (
                <span
                  key={i}
                  className={`inline-block text-[25vw] sm:text-[10rem] md:text-[12rem] lg:text-8xl xl:text-9xl 2xl:text-[11rem] font-[family-name:var(--font-playfair-display)] font-bold text-amber-400 tracking-tight transition-all duration-1000 ${
                    isLoaded
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-20'
                  }`}
                  style={{
                    transitionDelay: `${i * 100}ms`,
                    textShadow: '0 0 30px rgba(212, 175, 55, 0.3)',
                  }}
                >
                  <span
                    className="inline-block"
                    style={{
                      animationName: 'float',
                      animationDuration: '6s',
                      animationTimingFunction: 'ease-in-out',
                      animationIterationCount: 'infinite',
                      animationDelay: `${i * 0.2}s`,
                    }}
                  >
                    {letter}
                  </span>
                  {i === 2 && <br className="lg:hidden" />}
                </span>
              ))}
            </div>

            <div
              className={`mb-8 text-xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-[family-name:var(--font-playfair-display)] text-amber-400 tracking-[0.3em] sm:tracking-[0.5em] md:tracking-[1.2em] uppercase transition-all duration-1000 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              onMouseEnter={() => setIsMagazineHovered(true)}
              onMouseLeave={() => setIsMagazineHovered(false)}
              style={{
                transitionDelay: '600ms',
                textShadow: isMagazineHovered
                  ? '0 0 30px rgba(251, 191, 36, 0.8)'
                  : '0 0 15px rgba(251, 191, 36, 0.3)',
                cursor: 'default',
              }}
            >
              Magazine
            </div>

            {/* Decorative line */}
            <div className="flex items-center justify-center lg:justify-start mb-8">
              <div
                className={`h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent transition-all duration-1500 ${
                  isLoaded ? 'w-48 sm:w-60 md:w-80 lg:w-40 xl:w-60 2xl:w-80 opacity-100' : 'w-0 opacity-0'
                }`}
                style={{
                  transitionDelay: '800ms',
                  animationName: isLoaded ? 'line-pulse' : 'none',
                  animationDuration: '3s',
                  animationTimingFunction: 'ease-in-out',
                  animationIterationCount: 'infinite',
                  animationDelay: '2.5s',
                }}
              />
            </div>
          </div>
        </div>

        {/* Right side - Description */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 sm:p-12 lg:p-16">
          <div className="max-w-xl">
            {/* Vertical divider line */}
            <div
              className={`hidden lg:block absolute left-1/2 top-1/4 bottom-[35%] w-1 bg-gradient-to-b from-transparent via-amber-400 to-transparent transition-all duration-1000 origin-center ${
                isLoaded ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
              }`}
              style={{ 
                transitionDelay: '800ms',
                animation: 'glow-move 3s ease-in-out infinite'
              }}
            />

            {/* Text content */}
            <div
              className={`space-y-6 p-6 sm:p-8 rounded-2xl bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 shadow-2xl transition-all duration-1000 ${
                isLoaded
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-20'
              }`}
              style={{ transitionDelay: '1000ms' }}
            >
              <div className="min-h-[160px] flex items-center">
                {[
                  <>The market doesn’t care who you are — but <span className="text-amber-400 font-semibold">QUOSSI</span> does.</>,
                  <>We tell the stories of traders who’ve been laughed at, doubted, liquidated, and came back sharper.</>,
                  <>These aren’t analysts. They’re <span className="text-amber-400 font-semibold">architects of chaos</span>.</>,
                  <>The <span className="text-amber-400 font-semibold">Market Mavericks</span> — those who broke the system and built a new one in their image.</>
                ].map((text, i) => (
                  currentTextIndex === i && (
                    <p 
                      key={i}
                      className="text-lg sm:text-xl md:text-2xl lg:text-xl xl:text-2xl 2xl:text-3xl text-neutral-100 font-serif leading-relaxed"
                      style={{ animation: 'fade-in-up 0.8s ease-out forwards' }}
                    >
                      {text}
                    </p>
                  )
                ))}
              </div>

              {/* Decorative dots */}
              <div className="flex gap-2 pt-8">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 rounded-full bg-amber-400 transition-all duration-500 ${
                      isLoaded 
                        ? (currentTextIndex === i ? 'w-8 opacity-100' : 'w-2 opacity-30') 
                        : 'w-2 opacity-0'
                    }`}
                    style={{
                      transitionDelay: `${1400 + i * 100}ms`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Separator Structure */}
        <div
          className={`hidden lg:flex w-[800px] absolute left-1/2 bottom-[10%] -translate-x-1/2 items-center justify-center transition-all duration-1000 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '1600ms' }}
        >
          <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-50" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-24 w-px bg-gradient-to-t from-amber-400 to-transparent" />
          <div className="absolute top-0 left-0 h-24 w-px bg-gradient-to-b from-amber-400 to-transparent" />
          <div className="absolute top-0 right-0 h-24 w-px bg-gradient-to-b from-amber-400 to-transparent" />
        </div>
        </div>

        {/* Scroll down indicator */}
        <div
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-20 transition-opacity duration-1000 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: '2000ms' }}
          onClick={handleScrollDown}
        >
          <div className="animate-[bounce-scroll_2.5s_ease-in-out_infinite] text-amber-400 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ filter: 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.4))' }}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>
      </section>

      {/* Second Section - Cards */}
      <section className="relative z-10 py-16 md:py-32 px-4 sm:px-8 md:px-12 lg:px-24 min-h-[80vh] flex flex-col items-center justify-center">
        
        {/* Connecting Lines from Hero */}
        <div className={`hidden lg:block absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-24 transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '2000ms' }}>
            <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-amber-400/50 to-transparent">
               <div 
                 className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-amber-400 rounded-full shadow-[0_0_10px_rgba(251,191,36,0.8)]" 
                 style={{ animation: 'dot-pulse 2s ease-in-out infinite' }}
               />
            </div>
            <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-amber-400/50 to-transparent">
               <div 
                 className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-amber-400 rounded-full shadow-[0_0_10px_rgba(251,191,36,0.8)]" 
                 style={{ animation: 'dot-pulse 2s ease-in-out infinite', animationDelay: '1s' }}
               />
            </div>
        </div>

        <div className="max-w-6xl lg:max-w-[800px] mx-auto grid md:grid-cols-2 gap-8 lg:gap-12 relative mt-8 lg:mt-0">
          {/* Card 1 */}
          <div 
            className={`relative p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-md hover:border-amber-400/50 hover:shadow-[0_0_50px_-12px_rgba(251,191,36,0.2)] hover:scale-[1.02] transition-all duration-500 group overflow-hidden ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-400/10 rounded-full blur-3xl group-hover:bg-amber-400/20 transition-all duration-500" />
            <p className="relative z-10 text-lg md:text-xl text-neutral-300 font-serif leading-relaxed tracking-wide">
              Every chart hides a story. Every candle is a confession.
              <br /><br />
              <span className="text-amber-400 font-semibold group-hover:text-amber-300 transition-colors drop-shadow-sm">QUOSSI Magazine</span> is where those stories are told — in full color and full truth.
              <br /><br />
              Not as numbers, but as mythology. The traders who rise, fall, and rise again — the modern-day heroes behind the signal.
            </p>
          </div>

          {/* Card 2 */}
          <div 
            className={`relative p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-md hover:border-amber-400/50 hover:shadow-[0_0_50px_-12px_rgba(251,191,36,0.2)] hover:scale-[1.02] transition-all duration-500 group overflow-hidden ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-amber-400/10 rounded-full blur-3xl group-hover:bg-amber-400/20 transition-all duration-500" />
            <p className="relative z-10 text-lg md:text-xl text-neutral-300 font-serif leading-relaxed tracking-wide">
              Trading isn’t luck — it’s a rhythm.
              <br /><br />
              Some follow it.
              <br />
              Some create it.
              <br /><br />
              <span className="text-amber-400 font-semibold group-hover:text-amber-300 transition-colors drop-shadow-sm">QUOSSI Magazine</span> celebrates the creators — the market’s innovators, risk-takers, and storytellers who move differently, think deeper, and always stay ahead of the curve.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}