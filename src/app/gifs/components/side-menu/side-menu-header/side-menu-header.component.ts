import { Component, computed, inject } from '@angular/core';
import { environment } from '@environments/environment';
import { ThemeService } from '../../../../shared/services/theme.service';

@Component({
  selector: 'gifs-side-menu-header',
  imports: [],
  templateUrl: './side-menu-header.component.html',
  styleUrl: './side-menu-header.component.css',
})
export class SideMenuHeaderComponent {
  envs = environment;
  themeService = inject(ThemeService);

  greeting = computed(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'Good morning';
    if (hour >= 12 && hour < 18) return 'Good afternoon';
    return 'Good evening';
  });

  toggleTheme() {
    this.themeService.toggle();
  }
}
