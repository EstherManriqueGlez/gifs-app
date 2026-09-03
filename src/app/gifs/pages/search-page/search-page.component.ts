import { Component, inject, signal } from '@angular/core';
import { GifListComponent } from '../../components/gif-list/gif-list.component';
import { GifListSkeletonComponent } from '../../components/gif-list-skeleton/gif-list-skeleton.component';
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-search-page',
  imports: [GifListComponent, GifListSkeletonComponent],
  templateUrl: './search-page.component.html',
})
export default class SearchPageComponent {
  gifService = inject(GifsService);
  gifs = signal<Gif[]>([]);
  searching = signal(false);

  onSearch(query: string): void {
    if (!query.trim() || this.searching()) return;

    this.searching.set(true);
    this.gifService.searchGifs(query).subscribe((response) => {
      this.gifs.set(response);
      this.searching.set(false);
    });
  }
}
