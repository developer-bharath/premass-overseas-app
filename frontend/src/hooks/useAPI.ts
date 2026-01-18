import { useState, useEffect, useCallback } from 'react';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/**
 * Custom hook for fetching data from API
 * @param fetchFn - Function that makes the API call
 * @param dependencies - Dependencies array for useEffect
 */
export const useFetch = <T,>(
  fetchFn: () => Promise<T>,
  dependencies: any[] = []
) => {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const execute = useCallback(async () => {
    setState({ data: null, loading: true, error: null });
    try {
      const result = await fetchFn();
      setState({ data: result, loading: false, error: null });
      return result;
    } catch (err: any) {
      const errorMessage = err.message || 'An error occurred';
      setState({ data: null, loading: false, error: errorMessage });
      throw err;
    }
  }, [...dependencies]);

  useEffect(() => {
    execute();
  }, [execute]);

  return { ...state, refetch: execute };
};

/**
 * Custom hook for async operations (POST, PUT, DELETE)
 */
export const useAsync = <T, E = string>(
  asyncFunction: () => Promise<T>,
  immediate = true
) => {
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [value, setValue] = useState<T | null>(null);
  const [error, setError] = useState<E | null>(null);

  const execute = useCallback(async () => {
    setStatus('pending');
    setValue(null);
    setError(null);
    try {
      const response = await asyncFunction();
      setValue(response);
      setStatus('success');
      return response;
    } catch (error: any) {
      setError(error.message);
      setStatus('error');
      throw error;
    }
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { execute, status, value, error };
};

/**
 * Custom hook for form submission with loading state
 */
export const useFormSubmit = <T,>(
  onSubmit: (data: T) => Promise<any>
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (data: T) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await onSubmit(data);
      setSuccess(true);
      return result;
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { handleSubmit, loading, error, success };
};
