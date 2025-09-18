import { Injectable, signal, effect } from '@angular/core';

type Theme = 'light' | 'dark';
type ThemeSetting = 'auto' | 'forceLight' | 'forceDark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
    currentTheme = signal <Theme> ('light');
    currentThemeSetting = signal <ThemeSetting> ('auto');

    private mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    constructor() {
        const savedThemeSetting = localStorage.getItem('themeSetting') as ThemeSetting | null;

        if (savedThemeSetting) {
            this.setTheme(savedThemeSetting, false);

        } else {
            this.setTheme('auto', false);

        }

        this.mediaQuery.addEventListener('change', () => {
            if (this.currentThemeSetting() === 'auto') {
                this.loadTheme(this.mediaQuery.matches ? 'dark' : 'light');

            }
        });

        effect(() => {
            localStorage.setItem('themeSetting', this.currentThemeSetting());

        });
        
    }

    setTheme(themeSetting: ThemeSetting, persist: boolean = true) {
        this.currentThemeSetting.set(themeSetting);

        if (themeSetting === 'auto') {
            const osTheme: Theme = this.mediaQuery.matches ? 'dark' : 'light';
            this.loadTheme(osTheme);

        } else if (themeSetting === 'forceLight') {
            this.loadTheme('light');

        } else if (themeSetting === 'forceDark') {
            this.loadTheme('dark');

        }

        if (persist) {
            localStorage.setItem('themeSetting', themeSetting);

        }

    }

    private loadTheme(theme: 'light' | 'dark') {
        const head = document.head;
        let link = document.getElementById('theme') as HTMLLinkElement | null;

        if (!link) {
            link = document.createElement('link');
            link.id = 'theme';
            link.rel = 'stylesheet';
            head.appendChild(link);

        }

        link.href = theme === 'light' ? 'theme-light.css' : 'theme-dark.css';
        this.currentTheme.set(theme);
        
    }

}
