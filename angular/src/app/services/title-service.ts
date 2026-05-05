import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class TitleService {

  private readonly defaultTitle = 'DESTROY OCEAN CITY!';

  constructor(private title: Title) {}

  setCustomSiteTitle(title: string): void {
    this.title.setTitle(`DOC! ${title}`);

  }

  resetSiteTitle(): void {
    this.title.setTitle(this.defaultTitle);

  }
  
}
