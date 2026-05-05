import { Injectable } from '@angular/core';
import streetsData from '../data/streets.json';

@Injectable({ providedIn: 'root' })
export class StreetService {
  private streets: string[] = streetsData.oceanCityStreets;
  private readonly storageKey = 'oc_author_streets';

  getStreetForAuthor(authorName: string): string {
    const map = this.loadMap();
    if (map[authorName]) {
      return map[authorName];
    }
    const street = this.streets[Math.floor(Math.random() * this.streets.length)];
    map[authorName] = street;
    this.saveMap(map);
    return street;
  }

  private loadMap(): Record<string, string> {
    try {
      const raw = sessionStorage.getItem(this.storageKey);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }

  private saveMap(map: Record<string, string>): void {
    sessionStorage.setItem(this.storageKey, JSON.stringify(map));
  }
}
