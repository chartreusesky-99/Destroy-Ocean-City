import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api-service';
import { IdentityService } from '../../services/identity-service';
import { PostPreviewer } from '../../shared/post-viewers/post-previewer';
import { PostViewer } from '../../shared/post-viewers/post-viewer';
import { post } from '../../models/post-model';
import { postComment } from '../../models/postComment-model';

@Component({
  selector: 'app-blog',
  imports: [ PostPreviewer, PostViewer ],
  templateUrl: './blog.html',
  styleUrl: './blog.css'
})
export class Blog {
  post = signal<post | null>(null);
  comments = signal<postComment[]>([]);
  posts = signal<post[]>([]);

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    public identity: IdentityService 
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('contentId'));

    if (id) {
      this.api.getPostById(id).subscribe(({ post, comments }) => {
        this.post.set(post);
        this.comments.set(comments);
      });
    } else {
      const promotedTagId = 123;
      this.api.getPosts(promotedTagId).subscribe(posts => this.posts.set(posts));
    }

  }
}
