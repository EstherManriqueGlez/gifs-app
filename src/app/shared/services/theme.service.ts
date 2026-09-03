import { Injectable, signal } from '@angular/core';

const THEME_KEY = 'theme';
const DARK_CLASS = 'dark';

function getPreferredTheme(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

@Injectable({ providedIn: 'root' })
export class ThemeService {
  isDark = signal<boolean>(false);

  constructor() {
    const stored = localStorage.getItem(THEME_KEY);
    const initial = stored === 'dark' || (stored === null && getPreferredTheme());
    this.apply(initial);
  }

  toggle() {
    this.apply(!this.isDark());
  }

  private apply(dark: boolean) {
    this.isDark.set(dark);
    document.documentElement.classList.toggle(DARK_CLASS, dark);
    localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light');
  }
}
