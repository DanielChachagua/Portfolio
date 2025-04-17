import { Component } from "@angular/core"
import { ThemeService } from "../../../core/services/theme/theme.service"
import { CommonModule } from "@angular/common"

@Component({
  selector: 'app-theme-toggle',
  imports: [CommonModule],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.css'
})

export class ThemeToggleComponent {
  isDarkTheme = false

  constructor(private themeService: ThemeService) {
    this.themeService.isDarkTheme$.subscribe((isDark) => {
      this.isDarkTheme = isDark
    })
  }

  toggleTheme() {
    this.themeService.toggleTheme()
  }
}
