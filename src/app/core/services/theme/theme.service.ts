import { Injectable } from "@angular/core"
import { BehaviorSubject } from "rxjs"

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  private _isDark = false

  get isDark(): boolean {
    return this._isDark
  }

  constructor() { }

  initTheme(): void {
    // Verificar si hay una preferencia guardada
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      this._isDark = savedTheme === "dark"
    } else {
      // Usar preferencia del sistema
      this._isDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    }
    this.applyTheme()
  }

  toggleTheme(): void {
    this._isDark = !this._isDark
    this.applyTheme()
    localStorage.setItem("theme", this._isDark ? "dark" : "light")
  }

  private applyTheme(): void {
    if (this._isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }
}
