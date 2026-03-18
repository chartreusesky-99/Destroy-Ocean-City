import { Component } from '@angular/core';
import { Slogans } from '../../data/slogans';

@Component({
  selector: 'app-sloganator',
  imports: [],
  template: `
  <div class="d-flex justify-content-center cursor-default mt-4 w-100">
    <small class="text-muted monospace">
      <i class="bi bi-filter-right"></i> {{ currentSlogan }} <i class="bi bi-filter-left"></i>
    </small>
  </div>
  `
})
export class Sloganator {
  currentSlogan: string;

  constructor(public slogans: Slogans) {
    this.currentSlogan = this.slogans.getRandomSlogan();
  }

}
