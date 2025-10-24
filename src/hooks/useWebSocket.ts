'use client';

import { useEffect, useState, useCallback } from 'react';

export function useWebSocket() {
  const [isConnected, setIsConnected] = useState(false);
  const [ws, _setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    setIsConnected(true);

    // Uncomment below to connect to a real WebSocket server
    /*
      const websocket = new WebSocket('ws://your-server.com/socket')
      
      websocket.onopen = () => setIsConnected(true)
      websocket.onclose = () => setIsConnected(false)
      websocket.onerror = (error) => console.error('WebSocket error:', error)
      
      setWs(websocket)
      
      return () => {
        websocket.close()
      }
      */
  }, []);

  const sendMessage = useCallback(
    (message: string) => {
      if (ws && isConnected) {
        ws.send(JSON.stringify({ type: 'message', data: message }));
      }
    },
    [ws, isConnected]
  );

  return { isConnected, sendMessage };
}
