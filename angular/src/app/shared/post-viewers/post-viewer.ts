import { Component, Input } from '@angular/core';
import { FeaturedImageService } from '../../services/featuredImage-service';
import { IdentityService } from '../../services/identity-service';
import { CommentViewer } from '../comment-viewer';
import { post } from '../../models/post-model';

@Component({
  selector: 'app-postViewer',
  imports: [CommentViewer],
  template: `
    <div class="card mb-4">
        <div class="card-body">
            <h1 [innerHTML]="post!.title.rendered"></h1>
            <blockquote class="blockquote mb-0">
              <section class="blockquote-footer mt-4">
                @if (this.identity.authorAvatar(post)) {
                  <img [src]="this.identity.authorAvatar(post)" alt="Author avatar" class="rounded-circle" width="48" height="48">
                }
              {{ this.identity.authorName(post) }}
            </section>
            </blockquote>
            <div [innerHTML]="post!.content.rendered"></div>
        </div>
        <div class="card-footer">
          <!-- post comments -->
          <app-commentViewer></app-commentViewer>
        </div>
    </div>
  `
})
export class PostViewer {
  @Input() post!: post;

  constructor(
    public featured: FeaturedImageService,
    public identity: IdentityService
  ){}

}
