// src/components/AnimatedCard.tsx
import { useState, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  delay?: number;
}

export function AnimatedCard({ children, delay = 0 }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const style = {
    transition: `opacity 0.6s ease-out ${delay}s, transform 0.6s ease-out ${delay}s`,
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'none' : 'translateY(20px)',
  };

  return (
    <div ref={ref} style={style}>
      {children}
    </div>
  );
}