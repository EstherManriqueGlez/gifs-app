import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenuComponent } from '../../components/side-menu/side-menu.component';
import { ScrollStateService } from '../../../shared/services/scroll-state.service';

@Component({
  selector: 'app-dashboard-page',
  imports: [RouterOutlet, SideMenuComponent],
  templateUrl: './dashboard-page.component.html',
})
export default class DashboardPageComponent {
  isSidebarOpen = signal(false);

  private scrollContainer = viewChild<ElementRef<HTMLDivElement>>('scrollContainer');
  private scrollStateService = inject(ScrollStateService);

  toggleSidebar() {
    this.isSidebarOpen.update((open) => !open);
  }

  closeSidebar() {
    this.isSidebarOpen.set(false);
  }

  onScroll() {
    const scrollDiv = this.scrollContainer()?.nativeElement;
    if (!scrollDiv) return;

    this.scrollStateService.onTrendingScroll(
      scrollDiv.scrollTop,
      scrollDiv.clientHeight,
      scrollDiv.scrollHeight
    );
  }
}
