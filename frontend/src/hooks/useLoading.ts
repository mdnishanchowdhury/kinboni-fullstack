import { useState } from "react";

/**
 * useLoading hook - kono action execute korar somoy loading state handle kore.
 * @param duration - millisecond (default 1500ms)
 * @returns [isLoading, triggerLoading]
 */
export const useLoading = (duration: number = 1500): [boolean, (callback: () => void) => void] => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const triggerLoading = (callback: () => void) => {
    setIsLoading(true);
    
    // Nirdisto somoy por loading false hobe ebong callback run hobe
    setTimeout(() => {
      callback();
      setIsLoading(false);
    }, duration);
  };

  return [isLoading, triggerLoading];
};