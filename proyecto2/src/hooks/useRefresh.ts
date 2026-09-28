/**
 * src/hooks/useRefresh.ts
 *
 * Administra la actualización del ejemplo RefreshControl.
 * Cada actualización agrega la hora local; busy controla la espera y el temporizador evita operaciones superpuestas.
 * El efecto limpia el temporizador al salir. No realiza peticiones a un servidor.
 */
import { useEffect, useRef, useState } from "react";
// Cada actualización agrega una lectura local real; no requiere servidor ni datos inventados de una API.
export function useRefresh() {
  const [readings, setReadings] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  // Evita iniciar otra actualización mientras hay una pendiente y agrega una lectura al completarla.
  function refresh() {
    if (timer.current) return;
    setBusy(true);
    timer.current = setTimeout(() => {
      setReadings((items) =>
        [new Date().toLocaleTimeString(), ...items].slice(0, 8),
      );
      setBusy(false);
      timer.current = null;
    }, 350);
  }
  return { readings, busy, refresh };
}
