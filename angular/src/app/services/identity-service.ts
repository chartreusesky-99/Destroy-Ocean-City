import { Injectable } from '@angular/core';
import { post } from '../models/post-model';

@Injectable({ providedIn: 'root' })
export class IdentityService {

    authorAvatar(post: post): string | null {
        return post._embedded?.author?.[0]?.avatar_url || null;

    }

    authorName(post: post): string {
        return post._embedded?.author?.[0]?.name || 'Friend of Ocean City';

    }

    authorTier(post: post): string {
        return post._embedded?.author?.[0]?.tier || 'Contributor';
    }

    slugifyName(name: string): string {
        return name.toLowerCase().replace(/\s+/g, '-');
    }

}