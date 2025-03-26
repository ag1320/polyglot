import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    https: {
      key: fs.readFileSync(path.resolve('/app/utils', 'polyglot-key.pem')),
      cert: fs.readFileSync(path.resolve('/app/utils', 'polyglot-cert.pem')),
    },
  },
})
