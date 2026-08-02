import { useEffect, useRef, useState } from 'react';
import { ApiError } from './api';

export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/**
 * Minimal fetch-on-mount hook. `deps` controls refetching, and a request
 * counter guards against a slow earlier response overwriting a newer one
 * when filters change quickly.
 */
export function useApi<T>(fetcher: () => Promise<T>, deps: unknown[]): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T>>({ data: null, loading: true, error: null });
  const requestId = useRef(0);
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  useEffect(() => {
    const id = ++requestId.current;
    setState((prev) => ({ data: prev.data, loading: true, error: null }));

    fetcherRef
      .current()
      .then((data) => {
        if (id === requestId.current) setState({ data, loading: false, error: null });
      })
      .catch((err: unknown) => {
        if (id !== requestId.current) return;
        const message =
          err instanceof ApiError ? err.message : 'Something went wrong. Please try again.';
        setState({ data: null, loading: false, error: message });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
}
