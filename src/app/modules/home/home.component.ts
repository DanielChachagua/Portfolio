import { Component, HostBinding } from '@angular/core';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from '../../core/services/theme/theme.service';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './content/content.component';
import { PropertiesComponent } from './layout/properties/properties.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, SidebarComponent, CommonModule, ContentComponent, PropertiesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  activeSection = "home"
  leftSidebarOpen = true
  rightSidebarOpen = true
  isMobile = false

  @HostBinding("class.dark-theme") isDarkTheme = false

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.checkMobileView()
    window.addEventListener("resize", () => this.checkMobileView())

    this.themeService.isDarkTheme$.subscribe((isDark) => {
      this.isDarkTheme = isDark
    })
  }

  checkMobileView() {
    this.isMobile = window.innerWidth < 768
    if (this.isMobile) {
      this.leftSidebarOpen = false
      this.rightSidebarOpen = false
    } else {
      this.leftSidebarOpen = true
      this.rightSidebarOpen = true
    }
  }

  handleSectionChange(section: string) {
    this.activeSection = section
    if (this.isMobile) {
      this.leftSidebarOpen = false
      this.rightSidebarOpen = false
    }
  }

  toggleLeftSidebar() {
    this.leftSidebarOpen = !this.leftSidebarOpen
  }

  toggleRightSidebar() {
    this.rightSidebarOpen = !this.rightSidebarOpen
  }
}
