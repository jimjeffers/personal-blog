import { useEffect, useState } from 'react';
import './ScreenshotCarousel.css';

type ScreenshotCarouselProps = {
  screenshots: string[];
  title: string;
  intervalMs?: number;
};

export default function ScreenshotCarousel({ screenshots, title, intervalMs = 5000 }: ScreenshotCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (screenshots.length <= 1) return;
    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % screenshots.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [screenshots.length, intervalMs]);

  if (screenshots.length === 0) {
    return null;
  }

  return (
    <section className="screenshot-carousel" aria-label={`${title} app screenshots`}>
      <div className="screenshot-carousel__stage">
        {screenshots.map((src, index) => (
          <img
            key={src}
            className={`screenshot-carousel__image${index === activeIndex ? ' is-active' : ''}`}
            src={src}
            alt={`${title} screenshot ${index + 1}`}
            loading={index === 0 ? 'eager' : 'lazy'}
            decoding="async"
            aria-hidden={index === activeIndex ? undefined : 'true'}
          />
        ))}
      </div>
    </section>
  );
}
