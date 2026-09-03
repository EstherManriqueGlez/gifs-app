import { Component, effect, inject } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { ScrollStateService } from 'src/app/shared/services/scroll-state.service';
import { GifListItemComponent } from '../../components/gif-list/gif-list-item/gif-list-item.component';
import { GifListSkeletonComponent } from '../../components/gif-list-skeleton/gif-list-skeleton.component';

@Component({
  selector: 'app-trending-page',
  imports: [GifListItemComponent, GifListSkeletonComponent],
  templateUrl: './trending-page.component.html',
})
export default class TrendingPageComponent {
  gifService = inject(GifsService);
  scrollStateService = inject(ScrollStateService);

  constructor() {
    effect(() => {
      if (this.scrollStateService.trendingShouldLoadMore()) {
        this.gifService.loadTrendingGifs();
        this.scrollStateService.resetTrendingLoadMore();
      }
    });
  }
}
