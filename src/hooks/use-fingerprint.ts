// hooks/useFingerprint.js

import { useState, useCallback } from 'react';
import { getDeviceFingerprint } from '@/lib/utils/fingerprint';

export function useFingerprint() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fingerprint, setFingerprint] = useState(null);

  const generate = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await getDeviceFingerprint();
      setFingerprint(result);
      return result;
    } catch (err) {
      setError(err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { generate, fingerprint, isLoading, error };
}
