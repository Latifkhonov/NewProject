import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, SkipForward } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

interface CarouselItem {
  id: string;
  content: React.ReactNode;
  title?: string;
}

interface AccessibleCarouselProps {
  items: CarouselItem[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showControls?: boolean;
  showIndicators?: boolean;
  className?: string;
  ariaLabel?: string;
}

export const AccessibleCarousel: React.FC<AccessibleCarouselProps> = ({
  items,
  autoPlay = false,
  autoPlayInterval = 5000,
  showControls = true,
  showIndicators = true,
  className = '',
  ariaLabel = 'Content carousel'
}) => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout>();

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying && !isUserInteracting && items.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
      }, autoPlayInterval);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, isUserInteracting, items.length, autoPlayInterval]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
        setIsUserInteracting(true);
        break;
      case 'ArrowRight':
        e.preventDefault();
        setCurrentIndex((prev) => (prev + 1) % items.length);
        setIsUserInteracting(true);
        break;
      case 'Home':
        e.preventDefault();
        setCurrentIndex(0);
        setIsUserInteracting(true);
        break;
      case 'End':
        e.preventDefault();
        setCurrentIndex(items.length - 1);
        setIsUserInteracting(true);
        break;
      case ' ':
        e.preventDefault();
        setIsPlaying(!isPlaying);
        break;
    }
  }, [items.length, isPlaying]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsUserInteracting(true);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
    setIsUserInteracting(true);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    setIsUserInteracting(true);
  };

  // Reset user interaction flag after a delay
  useEffect(() => {
    if (isUserInteracting) {
      const timeout = setTimeout(() => {
        setIsUserInteracting(false);
      }, 10000); // 10 seconds
      return () => clearTimeout(timeout);
    }
  }, [isUserInteracting]);

  return (
    <div className={`relative ${className}`}>
      {/* Screen reader announcement */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {t.carouselAnnouncement || `Showing item ${currentIndex + 1} of ${items.length}`}
      </div>

      {/* Main carousel container */}
      <div
        ref={carouselRef}
        className="relative overflow-hidden rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2"
        role="region"
        aria-label={ariaLabel}
        aria-roledescription="carousel"
        onKeyDown={handleKeyDown}
        tabIndex={0}
        onMouseEnter={() => setIsUserInteracting(true)}
        onMouseLeave={() => setIsUserInteracting(false)}
        onFocus={() => setIsUserInteracting(true)}
        onBlur={() => setIsUserInteracting(false)}
      >
        {/* Carousel content */}
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          aria-live="polite"
        >
          {items.map((item, index) => (
            <div
              key={item.id}
              className="w-full flex-shrink-0"
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${items.length}${item.title ? `: ${item.title}` : ''}`}
              aria-hidden={index !== currentIndex}
            >
              {item.content}
            </div>
          ))}
        </div>

        {/* Navigation controls */}
        {showControls && items.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 p-2 rounded-full shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label={t.previousSlide || 'Previous slide'}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 p-2 rounded-full shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label={t.nextSlide || 'Next slide'}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {/* Auto-play control */}
        {autoPlay && items.length > 1 && (
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute top-2 right-2 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 p-2 rounded-full shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label={isPlaying ? (t.pauseCarousel || 'Pause carousel') : (t.playCarousel || 'Play carousel')}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
        )}
      </div>

      {/* Slide indicators */}
      {showIndicators && items.length > 1 && (
        <div className="flex justify-center mt-4 space-x-2" role="tablist" aria-label={t.slideIndicators || 'Slide indicators'}>
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                index === currentIndex
                  ? 'bg-blue-600 dark:bg-blue-400'
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
              }`}
              role="tab"
              aria-selected={index === currentIndex}
              aria-label={`Go to slide ${index + 1}`}
              tabIndex={index === currentIndex ? 0 : -1}
            />
          ))}
        </div>
      )}

      {/* Skip to end button for screen readers */}
      <button
        onClick={() => goToSlide(items.length - 1)}
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-blue-600 text-white px-3 py-1 rounded text-sm z-10"
      >
        <SkipForward className="h-4 w-4 inline mr-1" />
        {t.skipToEnd || 'Skip to end of carousel'}
      </button>
    </div>
  );
};