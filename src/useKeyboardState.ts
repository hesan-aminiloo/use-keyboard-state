import { useCallback, useEffect, useRef, useState } from 'react';

type WindowSizes = number[];

const useKeyboardOpen = () => {
  const initialWindow = useRef<WindowSizes>([]);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState<boolean>(false);
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);

  // couldn't figure out what's the type of this event. Maybe you know it?
  const viewportHandler = (e: any) => {
    const { height, width, scale } = e.currentTarget;
    if (document.activeElement instanceof HTMLElement && document.activeElement.nodeName !== 'INPUT') {
      if (isKeyboardOpen) setIsKeyboardOpen(false);
      if (keyboardHeight) setKeyboardHeight(0);
    }
    if (Math.ceil(height * scale) + 10 > initialWindow.current[0]) {
      setIsKeyboardOpen(false);
      setKeyboardHeight(0);
    } else if (
      height < initialWindow.current[0]
      || width < initialWindow.current[1]
    ) {
      if (document.activeElement instanceof HTMLElement && document.activeElement.nodeName === 'INPUT') {
        setIsKeyboardOpen(true);
        setKeyboardHeight((height - initialWindow.current[0]) * scale);
      }
      return;
    }
  };

  const setInitialSizes = useCallback(() => {
    initialWindow.current = [
      document?.documentElement?.clientHeight,
      document?.documentElement?.clientWidth,
      window?.visualViewport?.scale
    ];
  }, []);

  useEffect(() => {
    if (window && typeof window !== 'undefined') {
      setInitialSizes();
      window.visualViewport.addEventListener('resize', viewportHandler);

      return () => window.visualViewport.removeEventListener('resize', viewportHandler);
    }
  }, [])

  return [isKeyboardOpen, keyboardHeight];
};

export default useKeyboardOpen;