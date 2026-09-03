import { Component, input } from '@angular/core';

@Component({
  selector: 'gif-list-skeleton',
  imports: [],
  template: `
    <div class="columns-2 md:columns-4 gap-4">
      @for (_ of placeholderHeights; track $index) {
      <div
        class="break-inside-avoid mb-4 rounded-lg animate-pulse bg-slate-200 dark:bg-slate-700"
        [style.height.px]="height()[$index % height().length]"
      ></div>
      }
    </div>
  `,
})
export class GifListSkeletonComponent {
  count = input<number>(12);
  height = input<number[]>([220, 320, 280, 260, 340, 300, 240, 320, 280, 260, 300, 340]);

  get placeholderHeights(): number[] {
    const c = this.count();
    const h = this.height();
    return Array.from({ length: c }, (_, i) => h[i % h.length]);
  }
}
