// src/hooks/useDataFetching.js
import { useState, useEffect, useCallback, useMemo } from 'react';

const useDataFetching = (fetchFunction, ...args) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Create a stable string representation of defined args for dependency array
  const argsString = useMemo(() => JSON.stringify(args.filter(arg => arg !== undefined)), [args]);

  // Memoize the core data loading logic
  const loadData = useCallback(async (isRetry = false) => {
    if (!isRetry) {
      setData(null);
    }
    setLoading(true);
    setError(null);

    try {
      if (argsString === JSON.stringify(args.filter(arg => arg !== undefined))) {
        const result = await fetchFunction(...args);
        setData(result);
      } else {
         // This state can happen if args change very quickly between renders.
         // Keep loading true, or potentially set an error.
         console.warn("useDataFetching: Args changed during load preparation, skipping fetch.");
         // Option: setError("Could not load data due to changing parameters.");
      }
    } catch (err) {
      console.error('Error in useDataFetching loadData:', err);
      setError(err.message || 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  // FIX: The linter error points to the useEffect below, but the root cause might be complex dependencies.
  // Let's explicitly list dependencies here. `args` is implicitly handled via `argsString`.
  }, [fetchFunction, argsString]); // eslint-disable-line react-hooks/exhaustive-deps

  // Effect to trigger fetch on initial load or when dependencies change
  useEffect(() => {
    // Check if args are ready based on the key
    if (argsString === JSON.stringify(args.filter(arg => arg !== undefined))) {
       loadData(); // Initial load or load when fetchFn/args change
    } else {
        // Args are not ready yet (e.g., waiting for route params), ensure loading state
        setLoading(true);
        setData(null);
        setError(null);
    }
    // FIX: Added eslint-disable-next-line for the 'args' dependency warning.
    // We are correctly depending on `argsString` and `loadData` (which itself depends on argsString).
  }, [loadData, argsString]); // eslint-disable-line react-hooks/exhaustive-deps

  // Expose a stable reload function with explicit retry control
  const reload = useCallback((options = { retry: true }) => {
    loadData(options.retry);
  }, [loadData]);

  return { data, loading, error, reload };
};

export default useDataFetching;