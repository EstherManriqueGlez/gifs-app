import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScrollStateService {
  trendingScrollState = signal<number>(0);
  trendingShouldLoadMore = signal<boolean>(false);
  private loadThreshold = 300;

  onTrendingScroll(scrollTop: number, clientHeight: number, scrollHeight: number) {
    this.trendingScrollState.set(scrollTop);

    const isAtBottom = scrollTop + clientHeight + this.loadThreshold >= scrollHeight;
    this.trendingShouldLoadMore.set(isAtBottom);
  }

  resetTrendingLoadMore() {
    this.trendingShouldLoadMore.set(false);
  }
}
