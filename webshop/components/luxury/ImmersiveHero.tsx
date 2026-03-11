'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  PlayIcon, 
  PauseIcon, 
  SpeakerXMarkIcon,
  SpeakerWaveIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline'

export function ImmersiveHero() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  const slides = [
    {
      id: 1,
      title: "Timeless Elegance",
      subtitle: "Crafted for the Modern Connoisseur",
      video: "/videos/hero-1.mp4",
      image: "/images/hero-1.jpg",
      cta: "Explore Collection",
      link: "/shop"
    },
    {
      id: 2,
      title: "Artisan Excellence",
      subtitle: "Handcrafted with Passion and Precision",
      video: "/videos/hero-2.mp4",
      image: "/images/hero-2.jpg",
      cta: "Discover Craftsmanship",
      link: "/about"
    },
    {
      id: 3,
      title: "Luxury Redefined",
      subtitle: "Where Heritage Meets Innovation",
      video: "/videos/hero-3.mp4",
      image: "/images/hero-3.jpg",
      cta: "View New Arrivals",
      link: "/category/new-arrivals"
    }
  ]

  const currentSlideData = slides[currentSlide]

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPlaying) {
        nextSlide()
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [isPlaying])

  return (
    <section className={`relative h-screen overflow-hidden transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Background Video/Image */}
      <div className="absolute inset-0">
        <div className="relative w-full h-full">
          <Image
            src={currentSlideData.image}
            alt={currentSlideData.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        </div>
      </div>

      {/* Floating Navigation Controls */}
      <div className="absolute top-8 left-8 right-8 z-20 flex justify-between items-center">
        <div className="text-norelle-cream">
          <div className="text-sm uppercase tracking-wider mb-1 opacity-80">Norelle</div>
          <div className="text-xs opacity-60">Since 2010</div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleMute}
            className="p-2 bg-black/20 backdrop-blur-sm rounded-full text-norelle-cream hover:bg-black/40 transition-all duration-300"
          >
            {isMuted ? (
              <SpeakerXMarkIcon className="w-5 h-5" />
            ) : (
              <SpeakerWaveIcon className="w-5 h-5" />
            )}
          </button>
          
          <button
            onClick={togglePlay}
            className="p-2 bg-black/20 backdrop-blur-sm rounded-full text-norelle-cream hover:bg-black/40 transition-all duration-300"
          >
            {isPlaying ? (
              <PauseIcon className="w-5 h-5" />
            ) : (
              <PlayIcon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 z-20">
        <div className="flex flex-col space-y-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-8 rounded-full transition-all duration-500 ${
                index === currentSlide
                  ? 'bg-norelle-cream'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Animated Entrance */}
          <div className={`transform transition-all duration-1000 delay-300 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-norelle-cream mb-6 leading-tight">
              {currentSlideData.title}
            </h1>
            <p className="text-xl md:text-2xl text-norelle-text-muted mb-12 leading-relaxed max-w-2xl mx-auto">
              {currentSlideData.subtitle}
            </p>
            
            <div className={`transform transition-all duration-1000 delay-500 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <Link 
                href={currentSlideData.link}
                className="btn-primary text-lg px-8 py-4 inline-flex items-center group"
              >
                {currentSlideData.cta}
                <ChevronDownIcon className="w-5 h-5 ml-2 group-hover:translate-y-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center space-y-2 text-norelle-cream opacity-60">
          <span className="text-xs uppercase tracking-wider">Scroll</span>
          <div className="w-6 h-10 border-2 border-norelle-cream/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-norelle-cream rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 translate-x-[-200px] z-20">
        <button
          onClick={prevSlide}
          className="p-3 bg-black/20 backdrop-blur-sm rounded-full text-norelle-cream hover:bg-black/40 transition-all duration-300"
        >
          <ChevronDownIcon className="w-6 h-6 rotate-90" />
        </button>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 translate-x-[200px] z-20">
        <button
          onClick={nextSlide}
          className="p-3 bg-black/20 backdrop-blur-sm rounded-full text-norelle-cream hover:bg-black/40 transition-all duration-300"
        >
          <ChevronDownIcon className="w-6 h-6 -rotate-90" />
        </button>
      </div>
    </section>
  )
}
