import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
// import { SessionProvider } from "next-auth/react"
const rootElement = document.getElementById('root');
const root = createRoot(rootElement!);

async function renderApp() {



  root.render(
    <StrictMode>
      {/* <SessionProvider >  */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
      {/* </SessionProvider> */}
    </StrictMode>,
  );
}

renderApp();
