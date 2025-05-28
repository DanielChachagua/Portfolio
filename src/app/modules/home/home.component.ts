import { Component, HostBinding } from '@angular/core';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from '../../core/services/theme/theme.service';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './content/content.component';
// import { PropertiesComponent } from './layout/properties/properties.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ContentComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
}
