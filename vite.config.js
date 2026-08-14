import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // 상대 경로로 빌드해 GitHub Pages 등 서브 경로 배포에서도 그대로 동작
  base: './',
  server: { port: 5173, open: true },
});
