import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'fs'
import path from 'path'

const certPath = path.resolve(process.env.HOME, 'Library/Application Support/mkcert/dev-cert.pem')
const keyPath = path.resolve(process.env.HOME, 'Library/Application Support/mkcert/dev-key.pem')

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: {
      key: readFileSync(keyPath),
      cert: readFileSync(certPath),
    },
  },
  plugins: [react()],
})
