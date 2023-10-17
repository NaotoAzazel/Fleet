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
      setIsLoading(false);
    }
  }, [callback]);

  return [fetching, isLoading, error];
}