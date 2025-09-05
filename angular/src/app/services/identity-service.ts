import { Injectable } from '@angular/core';
import { post } from '../models/post-model';

@Injectable({ providedIn: 'root' })
export class IdentityService {

    authorAvatar(post: post): string | null {
        return post._embedded?.author?.[0]?.avatar_urls?.['48'] || null;

    }

    authorName(post: post): string {
        return post._embedded?.author?.[0]?.name || 'Friend of Ocean City';

    }

}