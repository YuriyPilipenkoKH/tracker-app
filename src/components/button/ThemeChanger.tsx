import { MdOutlineNightlight } from "react-icons/md";
import { useState, useEffect } from 'react';
import { LuLampDesk } from "react-icons/lu";
import { FlatButton } from "./Button";


export default function ThemeChanger() {
  const [mounted, setMounted] = useState<boolean>(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    // Initial theme from localStorage (before React mounts)
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme') as 'light' | 'dark';
      if (storedTheme) {
        document.documentElement.setAttribute('data-theme', storedTheme);
        return storedTheme;
      }
    }
    return 'light';
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Save theme to localStorage and apply it
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  if (!mounted) {
    // Placeholder to avoid layout shift 
    return  <div className="bg-transparent placeholder w-9 h-9"></div>
  }

  return (
    <FlatButton
      className="btn btn-ghost text-[var(--text-color)]"
      onClick={toggleTheme}
      aria-label="Toggle Theme"
    >
      {theme === 'light' ? <LuLampDesk size={25}/> : <MdOutlineNightlight  size={25}/>}
    </FlatButton>
  );
}