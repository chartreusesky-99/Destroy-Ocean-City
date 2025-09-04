import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Static Component Import
import { Header } from './static/header/header';
import { AlertComponent } from './static/alert/alert';
import { Footer } from './static/footer/footer';

@Component({
  selector: 'app-root',
  imports: [ RouterOutlet, Header, AlertComponent, Footer ],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true
})
export class App {
  protected readonly title = signal('destroyOceanCity');
}
