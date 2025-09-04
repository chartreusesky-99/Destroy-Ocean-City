import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api-service';
import { post } from '../../models/post-model';

@Component({
  selector: 'app-blog',
  imports: [],
  templateUrl: './blog.html',
  styleUrl: './blog.css'
})
export class Blog {
  post = signal<post | null>(null);

  constructor(private route: ActivatedRoute, private api: ApiService ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('contentId'));
    console.log(`Entered blog view with activatedRoute param ${id}`);
    if (id) {
      this.api.getPostById(id).subscribe(post => this.post.set(post));

    }

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
