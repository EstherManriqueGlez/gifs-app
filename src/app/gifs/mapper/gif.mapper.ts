import { Gif } from '../interfaces/gif.interface';
import { GiphyItem } from '../interfaces/giphy.interfaces';

export class GifMapper {
  static mapGiphyItemToGif(item: GiphyItem): Gif {
    const fixedWidth = item.images.fixed_width;
    const previewWebp = item.images.preview_webp;

    const previewUrl =
      projectPath(previewWebp?.url) ||
      projectPath(fixedWidth?.webp) ||
      projectPath(item.images.downsized_medium?.url) ||
      item.images.original.url;

    return {
      id: item.id,
      title: item.title,
      url: item.images.original.url,
      previewUrl,
    };
  }

  static mapGiphyItemsToGifArray(items: GiphyItem[]): Gif[] {
    return items.map((item) => this.mapGiphyItemToGif(item));
  }
}

function projectPath(url: string | undefined): string | undefined {
  return url && url.trim().length > 0 ? url : undefined;
}
