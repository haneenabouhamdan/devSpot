import { useEffect, useState } from 'react';

// Hook
export function useWindowSize() {
  const [windowSize, setWindowSize] = useState<{
    height: number;
    width: number;
    isTablet: boolean;
    isPhone: boolean;
  }>({
    width: 0,
    height: 0,
    isTablet: window.innerWidth < 991.98,
    isPhone: window.innerWidth < 487.58,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        isTablet: window.innerWidth < 991.98,
        isPhone: window.innerWidth < 487.58,
      });
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}
