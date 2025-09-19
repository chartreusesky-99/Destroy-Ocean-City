import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FeaturedImageService } from '../../services/featuredImage-service';
import { IdentityService } from '../../services/identity-service';
import { post } from '../../models/post-model';

@Component({
  selector: 'app-postPreviewer',
  imports: [ RouterLink, NgClass ],
  template: `
    @if (this.featured.image(post)) {
      <div class="cursor-pointer" [ngClass]="cropFeaturedImage ? 'previewer-image-crop' : ''" [routerLink]="['/blog/', post.id]">
          <img [src]="this.featured.image(post)" class="card-img-top" alt="Featured image">
      </div>
    } @else if (cropFeaturedImage) {
      <div class="cursor-pointer previewer-image-crop" [routerLink]="['/blog/', post.id]">
        <img [src]="this.featured.randomFallback()" class="card-img-top" alt="Featured image">
      </div>
    }
    <div class="card-body">
      <a [routerLink]="['/blog/', post.id]">
        <h4 [innerHTML]="post.title.rendered"></h4>
      </a>
      <blockquote class="blockquote mb-0">
        <p [innerHTML]="post.excerpt.rendered"></p>
        <footer class="blockquote-footer mt-4">
          @if (this.identity.authorAvatar(post)) {
            <img [src]="this.identity.authorAvatar(post)" alt="Author avatar" class="rounded-circle" width="48" height="48">
          }            {{ this.identity.authorName(post) }}
        </footer>
      </blockquote>
    </div>
  `
})
export class PostPreviewer {
  @Input() post!: post;
  @Input() cropFeaturedImage: boolean = false;

  constructor(
    public featured: FeaturedImageService,
    public identity: IdentityService
  ) {}

}
