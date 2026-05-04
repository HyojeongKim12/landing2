import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,        // 같은 Wi-Fi의 다른 디바이스에서 접속 가능
    port: 5173,
  },
});
