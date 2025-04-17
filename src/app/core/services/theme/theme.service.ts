import { Injectable } from "@angular/core"
import { BehaviorSubject } from "rxjs"

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  private isDarkThemeSubject = new BehaviorSubject<boolean>(this.getInitialTheme())
  isDarkTheme$ = this.isDarkThemeSubject.asObservable()

  constructor() {
    this.watchSystemTheme()
  }

  private getInitialTheme(): boolean {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      return savedTheme === "dark"
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches
  }

  private watchSystemTheme() {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      if (localStorage.getItem("theme") === "system") {
        this.isDarkThemeSubject.next(e.matches)
      }
    })
  }

  setTheme(theme: "light" | "dark" | "system") {
    localStorage.setItem("theme", theme)

    if (theme === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      this.isDarkThemeSubject.next(isDark)
    } else {
      this.isDarkThemeSubject.next(theme === "dark")
    }
  }

  toggleTheme() {
    const currentTheme = this.isDarkThemeSubject.value
    this.isDarkThemeSubject.next(!currentTheme)
    localStorage.setItem("theme", !currentTheme ? "dark" : "light")
  }
}
