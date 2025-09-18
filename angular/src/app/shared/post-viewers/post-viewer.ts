import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FeaturedImageService } from '../../services/featuredImage-service';
import { IdentityService } from '../../services/identity-service';
import { CommentViewer } from '../comment-viewer';
import { post } from '../../models/post-model';
import { Slogans } from '../../data/slogans';

@Component({
  selector: 'app-postViewer',
  imports: [ CommentViewer, RouterLink ],
  template: `
    <div class="card paper mb-4 p-sm-2 p-md-5 mx-auto">
      <div class="card-body">
        <h1 [innerHTML]="post!.title.rendered"></h1>
        <blockquote class="blockquote float-right mb-0">
          <section class="text-muted text-center my-4">
            @if (this.identity.authorAvatar(post)) {
              <img [src]="this.identity.authorAvatar(post)" alt="Author avatar" class="rounded-circle" width="48" height="48">
            }
            {{ this.identity.authorName(post) }}, Contributor
          </section>
        </blockquote>
        <div [innerHTML]="post!.content.rendered"></div>
        <div class="d-flex mt-4 justify-content-center w-100">
          See more from &nbsp;
          <a routerLink="/blog/author/{{ this.identity.authorName(post) }}" class="link-primary">
            {{ this.identity.authorName(post) }}
          </a>, or &nbsp;
          <a class="link-primary mouse-pointer" routerLink="/blog">
            See More Posts
          </a>
        </div>
        <app-commentViewer [postId]="post!.id"></app-commentViewer>
        <div class="d-flex justify-content-center w-100 mt-4">
          <small class="text-muted">
            <i class="bi bi-filter-right"></i> {{ slogans.getRandomSlogan() }} <i class="bi bi-filter-left"></i>
          </small>
        </div>
      </div>
    </div>
  `
})
export class PostViewer {
  @Input() post!: post;

  constructor(
    public featured: FeaturedImageService,
    public identity: IdentityService,
    public slogans: Slogans
  ){}

}
