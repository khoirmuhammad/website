import { useEffect, useState } from "react";

export const useDebounce = (value: string, delay = 500) => {
  // state : The delayed version of value
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Wait X ms, then update debounced value”
      setDebounced(value);
    }, delay);

    // If user types again or component re-renders, then cancel previous timer
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
};
