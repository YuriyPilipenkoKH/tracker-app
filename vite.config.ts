import { defineConfig , loadEnv} from 'vite'
import react from '@vitejs/plugin-react'
import envCompatible from 'vite-plugin-env-compatible';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react(),  envCompatible()],
    define: {
      "process.env.NEXTAUTH_URL": JSON.stringify(env.NEXTAUTH_URL),
    },
  };
});
// export default defineConfig({
//   plugins: [react(),  envCompatible()],
// })
