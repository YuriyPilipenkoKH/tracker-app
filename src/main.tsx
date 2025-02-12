import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
const rootElement = document.getElementById('root');
const root = createRoot(rootElement!);

async function renderApp() {

  root.render(
    <StrictMode>
        <BrowserRouter basename = '/tracker-app'>
          <App />
        </BrowserRouter>
     </StrictMode>
  );
}

renderApp();
