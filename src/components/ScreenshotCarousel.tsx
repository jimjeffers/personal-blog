import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import './ScreenshotCarousel.css';

type ScreenshotCarouselProps = {
  screenshots: string[];
  title: string;
};

export default function ScreenshotCarousel({ screenshots, title }: ScreenshotCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center',
    loop: screenshots.length > 1,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  if (screenshots.length === 0) {
    return null;
  }

  return (
    <section className="screenshot-carousel" aria-label={`${title} app screenshots`}>
      <div className="screenshot-carousel__viewport" ref={emblaRef}>
        <div className="screenshot-carousel__container">
          {screenshots.map((src, index) => (
            <div className="screenshot-carousel__slide" key={src}>
              <img
                className="screenshot-carousel__image"
                src={src}
                alt={`${title} screenshot ${index + 1}`}
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>

      {screenshots.length > 1 && (
        <div className="screenshot-carousel__controls">
          <button
            className="screenshot-carousel__button"
            type="button"
            onClick={scrollPrev}
            aria-label="Previous screenshot"
          >
            <ChevronLeft aria-hidden="true" size={20} strokeWidth={2} />
          </button>

          <div className="screenshot-carousel__dots" aria-label="Choose screenshot">
            {scrollSnaps.map((_, index) => (
              <button
                className={`screenshot-carousel__dot${index === selectedIndex ? ' is-selected' : ''}`}
                type="button"
                key={index}
                onClick={() => scrollTo(index)}
                aria-label={`Show screenshot ${index + 1}`}
                aria-current={index === selectedIndex ? 'true' : undefined}
              />
            ))}
          </div>

          <button
            className="screenshot-carousel__button"
            type="button"
            onClick={scrollNext}
            aria-label="Next screenshot"
          >
            <ChevronRight aria-hidden="true" size={20} strokeWidth={2} />
          </button>
        </div>
      )}
    </section>
  );
}
