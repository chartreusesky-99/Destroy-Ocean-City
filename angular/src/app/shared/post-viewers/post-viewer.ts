import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FeaturedImageService } from '../../services/featuredImage-service';
import { IdentityService } from '../../services/identity-service';
import { CommentViewer } from '../comment-viewer';
import { post } from '../../models/post-model';

@Component({
  selector: 'app-postViewer',
  imports: [ CommentViewer, RouterLink ],
  template: `
    <div class="card paper px-0 mb-4 mx-auto">
      <div class="card-body p-sm-2 p-md-5">
        <h1 [innerHTML]="post!.title.rendered" class="cursor-default"></h1>
        <blockquote class="blockquote float-right cursor-default mb-0">
          <section class="text-muted text-center my-4">
            @if (this.identity.authorAvatar(post)) {
              <img [src]="this.identity.authorAvatar(post)" alt="Author avatar" class="rounded-circle" width="48" height="48">
            }
            {{ this.identity.authorName(post) }}, Contributor
          </section>
        </blockquote>
        <div [innerHTML]="post!.content.rendered"></div>
      </div>
      <div class="card-footer px-sm-2 px-md-5 pb-sm-2 pb-md-5">
        <div class="d-sm-none d-md-flex mt-4 justify-content-center cursor-default w-100">
          See more from&nbsp;<span routerLink="/blog/author/{{ this.identity.authorName(post).trimEnd() }}" class="link-primary cursor-pointer">{{ this.identity.authorName(post).trimEnd() }}</span>, or&nbsp;<span class="link-primary cursor-pointer" routerLink="/blog">See More Posts</span>.
        </div>
        <app-commentViewer [postId]="post!.id"></app-commentViewer>
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
