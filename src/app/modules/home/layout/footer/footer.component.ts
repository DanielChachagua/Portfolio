import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { ThemeService } from '../../../../core/services/theme/theme.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  @Input() activeSection = "home"

  currentTime = ""
  currentTheme = "system"
  private timeSubscription: Subscription | null = null
  private themeSubscription: Subscription | null = null

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.updateTime()
    this.timeSubscription = interval(1000).subscribe(() => this.updateTime())

    // this.themeSubscription = this.themeService.isDarkTheme$.subscribe((isDark) => {
    //   this.currentTheme = isDark ? "dark" : "light"
    // })
  }

  ngOnDestroy() {
    if (this.timeSubscription) {
      this.timeSubscription.unsubscribe()
    }
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe()
    }
  }

  private updateTime() {
    const now = new Date()
    const hours = String(now.getHours()).padStart(2, "0")
    const minutes = String(now.getMinutes()).padStart(2, "0")
    const seconds = String(now.getSeconds()).padStart(2, "0")
    this.currentTime = `${hours}:${minutes}:${seconds}`
  }

  currentYear() {
    return new Date().getFullYear()
  }
}
