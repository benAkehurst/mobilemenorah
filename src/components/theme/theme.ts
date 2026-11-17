export type ThemeChoice = "light" | "dark" | "system";

export const THEME_STORAGE_KEY = "theme";
export const THEME_CHANGE_EVENT = "theme-change";

/**
 * Runs in <head> before first paint so an explicit light/dark choice never
 * flashes the wrong theme. "System" leaves <html> without `data-theme`, and
 * tokens.css follows prefers-color-scheme.
 */
export const themeInitScript = `try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;
