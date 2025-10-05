import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';

const GIF_KEYS = 'searchHistory';

const loadHistoryFromLocalStorage = () => {
  const gifsFromLocalStorage = localStorage.getItem(GIF_KEYS) ?? '{}'; //Record<string, gifs[]>
  const gifs = JSON.parse(gifsFromLocalStorage);

  return gifs;
};

// Ejemplo del objeto que se armará para la busqueda.
// {
//   'goku': [gif1, gif2, gif3],
//   'saitama': [gif1, gif2, gif3],
//   'dragon ball': [gif1, gif2, gif3],
// }

// Esto es el tipado de la señal
// Record<string, Gif[]> Es lo de la linea 27

// Asi es como se define la señal para el objeto de historial de busquedas
// searchHistory = signal<Record<string, Gif[]>>({});

@Injectable({ providedIn: 'root' })
export class GifsService {
  private http = inject(HttpClient);

  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal<boolean>(false);
  private trendingPage = signal<number>(0);

  trendingGifGroup = computed<Gif[][]>(() => {
    const groups: Gif[][] = [];
    for (let i = 0; i < this.trendingGifs().length; i += 3) {
      groups.push(this.trendingGifs().slice(i, i + 3));
    }

    return groups;
  });

  searchHistory = signal<Record<string, Gif[]>>(loadHistoryFromLocalStorage());
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  constructor() {
    this.loadTrendingGifs();
  }

  saveGifsHistoryToLocalStorage = effect(() => {
    const getHistoryGifs = JSON.stringify(this.searchHistory());
    localStorage.setItem(GIF_KEYS, getHistoryGifs);
  });

  loadTrendingGifs() {
    if (this.trendingGifsLoading()) return;

    this.trendingGifsLoading.set(true);

    this.http
      .get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
        params: {
          api_key: environment.giphyApiKey,
          limit: '20',
          offset: (this.trendingPage() * 20).toString(),
        },
      })
      .subscribe((response) => {
        const gifs = GifMapper.mapGiphyItemsToGifArray(response.data);
        this.trendingGifs.update((currentGifs) => [...currentGifs, ...gifs]);
        this.trendingPage.update((currentPage) => currentPage + 1);
        this.trendingGifsLoading.set(false);
      });
  }

  searchGifs(query: string): Observable<Gif[]> {
    return this.http
      .get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
        params: {
          api_key: environment.giphyApiKey,
          q: query,
          limit: '20',
        },
      })
      .pipe(
        map(({ data }) => data),
        map((items) => GifMapper.mapGiphyItemsToGifArray(items)),

        // TODO: Historial de busquedas
        tap((items) => {
          this.searchHistory.update((history) => ({
            ...history,
            [query.toLowerCase()]: items,
          }));
        })
      );

    // .subscribe((response) => {
    //   const gifs = GifMapper.mapGiphyItemsToGifArray(response.data);

    //   console.log({ shearch: gifs });
    // });
  }

  getHistoryGifs(query: string): Gif[] {
    return this.searchHistory()[query] ?? [];
  }
}
