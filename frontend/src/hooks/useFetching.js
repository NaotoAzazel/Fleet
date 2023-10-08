import { useState, useMemo } from "react"; 

export const useFetching = (callback) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetching = useMemo(() => async(...args) => {
    try {
      setIsLoading(true);
      await callback(...args);
    } catch(err) {
      setError(err.message);
    }
    finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500)
    }
  }, [callback]);

  return [fetching, isLoading, error];
}