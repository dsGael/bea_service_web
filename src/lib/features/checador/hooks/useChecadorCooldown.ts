import { useState, useCallback, useEffect, useRef } from 'react';

const COOLDOWN_MS = 5 * 60 * 1000; // 5 minutos, ajusta aquí

export function useChecadorCooldown() {
  const [enCooldown, setEnCooldown] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const registrarChecadaExitosa = useCallback(() => {
    setEnCooldown(true);
    timeoutRef.current = setTimeout(() => setEnCooldown(false), COOLDOWN_MS);
  }, []);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return { enCooldown, registrarChecadaExitosa };
}