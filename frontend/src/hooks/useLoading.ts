import { useState } from "react";

export const useLoading = (duration: number = 1500): [boolean, (callback: () => void) => void] => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const triggerLoading = (callback: () => void) => {
    setIsLoading(true);
    
    setTimeout(() => {
      callback();
      setIsLoading(false);
    }, duration);
  };

  return [isLoading, triggerLoading];
};