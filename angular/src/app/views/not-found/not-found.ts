import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [],
  templateUrl: './not-found.html'
})
export class NotFound {
  attemptedUrl = signal<string>('');

  constructor(private router: Router) {
    this.attemptedUrl.set(router.url);

  }

}
