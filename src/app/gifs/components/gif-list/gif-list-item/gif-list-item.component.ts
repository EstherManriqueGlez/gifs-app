import { Component, input, computed } from '@angular/core';
import { Gif } from '../../../interfaces/gif.interface';

@Component({
  selector: 'gif-list-item',
  imports: [],
  templateUrl: './gif-list-item.component.html',
})
export class GifListItemComponent {
  gif = input.required<Gif>();

  imageSrc = computed(() => this.gif().previewUrl || this.gif().url);
  imageAlt = computed(() => this.gif().title || 'Gif');
}
