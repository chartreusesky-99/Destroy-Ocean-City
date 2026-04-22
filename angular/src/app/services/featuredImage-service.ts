import { Injectable } from '@angular/core';
import { post } from '../models/post-model';

@Injectable({ providedIn: 'root' })
export class FeaturedImageService {
    private fallbackImages: string[] = [];

    constructor() {
        const fallbackCount = 7;
        for (let i=0; i< fallbackCount; i++) {
            this.fallbackImages.push(`/featuredImages/featured${i}.png`);
        }
    }

    image(post: post): string | null {
        return post._embedded?.['media']?.[0]?.source_url || null;

    }

    randomFallback(): string {
        const index = Math.floor(Math.random() * this.fallbackImages.length);
        return this.fallbackImages[index];

    }
    
}