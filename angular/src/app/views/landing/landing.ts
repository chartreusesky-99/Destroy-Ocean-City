import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api-service';
import { post } from '../../models/post-model';

@Component({
  selector: 'app-landing',
  imports: [ RouterLink ],
  templateUrl: './landing.html',
  styleUrl: './landing.css'
})
export class Landing {

  posts = signal<post[]>([]);

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getRecentPosts().subscribe((posts: any) => this.posts.set(posts));
    console.log(`Raw recentPostsPreviewer posts data:`, this.posts);
    
  }

  featuredImage(post: post): string | null {
    return post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;

  }

  authorAvatar(post: post): string | null {
    return post._embedded?.author?.[0]?.avatar_urls?.['48'] || null;

  }

  authorName(post: post): string {
    return post._embedded?.author?.[0]?.name || 'Unknown Author';

  }

}
