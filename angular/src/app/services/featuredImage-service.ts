import { Injectable } from '@angular/core';
import { post } from '../models/post-model';

@Injectable({ providedIn: 'root' })
export class FeaturedImageService {

    image(post: post): string | null {
        return post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;

    }
    
}