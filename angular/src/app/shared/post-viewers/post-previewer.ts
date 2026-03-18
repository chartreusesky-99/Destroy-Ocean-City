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
    @if (this.featured.image(post); as featuredImage) {
      <div
        class="cursor-pointer featured-image-wrap"
        [ngClass]="cropFeaturedImage ? 'previewer-image-crop' : ''"
        [class.image-loading]="!isImageLoaded(post.id, featuredImage)"
        [routerLink]="['/blog/', post.id]"
      >
        <img
          [src]="featuredImage"
          class="card-img-top featured-image"
          [class.image-loaded]="isImageLoaded(post.id, featuredImage)"
          (load)="onImageLoad(post.id, featuredImage)"
          alt="Featured image"
        >
      </div>
    } @else if (cropFeaturedImage) {
      <div
        class="cursor-pointer previewer-image-crop featured-image-wrap"
        [class.image-loading]="!isImageLoaded(post.id, fallbackImage(post.id))"
        [routerLink]="['/blog/', post.id]"
      >
        <img
          [src]="fallbackImage(post.id)"
          class="card-img-top featured-image"
          [class.image-loaded]="isImageLoaded(post.id, fallbackImage(post.id))"
          (load)="onImageLoad(post.id, fallbackImage(post.id))"
          alt="Featured image"
        >
      </div>
    }
    <div class="card-body">
      <a class="cursor-pointer" [routerLink]="['/blog/', post.id]">
        <h4 [innerHTML]="post.title.rendered"></h4>
      </a>
      <blockquote class="blockquote mb-0">
        <p class="cursor-default" [innerHTML]="post.excerpt.rendered"></p>
        <footer class="blockquote-footer cursor-default mt-4">
          @if (this.identity.authorAvatar(post)) {
            <img [src]="this.identity.authorAvatar(post)" alt="Author avatar" class="rounded-circle" width="48" height="48">
          }
          {{ this.identity.authorName(post) }}
        </footer>
      </blockquote>
    </div>
  `,
  styles: [`
    .featured-image-wrap {
      position: relative;
      overflow: hidden;
      cursor: pointer;
      background: linear-gradient(110deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.03));
      background-size: 200% 100%;
      animation: image-shell 1.6s linear infinite;
    }

    .card-body a {
      cursor: pointer;
    }

    .featured-image {
      display: block;
      width: 100%;
      transform: scale(1.035);
      filter: blur(12px) saturate(0.86);
      opacity: 0.78;
      transition: filter 420ms ease, transform 520ms ease, opacity 420ms ease;
      will-change: filter, transform, opacity;
    }

    .featured-image.image-loaded {
      transform: scale(1);
      filter: blur(0) saturate(1);
      opacity: 1;
    }

    .featured-image-wrap.image-loading::after {
      content: '';
      position: absolute;
      inset: 0;
      transform: translateX(-100%);
      background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.12) 50%, transparent 100%);
      animation: image-shimmer 1.2s linear infinite;
      pointer-events: none;
    }

    @keyframes image-shimmer {
      to {
        transform: translateX(100%);
      }
    }

    @keyframes image-shell {
      to {
        background-position: -200% 0;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .featured-image-wrap,
      .featured-image-wrap.image-loading::after {
        animation: none;
      }

      .featured-image {
        transition: none;
      }
    }
  `]
})
export class PostPreviewer {
  @Input() post!: post;
  @Input() cropFeaturedImage: boolean = false;
  private loadedImageKeys = new Set<string>();
  private fallbackByPostId = new Map<number, string>();

  constructor(
    public featured: FeaturedImageService,
    public identity: IdentityService
  ) {}

  fallbackImage(postId: number): string {
    const existing = this.fallbackByPostId.get(postId);
    if (existing) {
      return existing;
    }

    const next = this.featured.randomFallback();
    this.fallbackByPostId.set(postId, next);
    return next;
  }

  isImageLoaded(postId: number, src: string): boolean {
    return this.loadedImageKeys.has(this.imageKey(postId, src));
  }

  onImageLoad(postId: number, src: string): void {
    this.loadedImageKeys.add(this.imageKey(postId, src));
  }

  private imageKey(postId: number, src: string): string {
    return `${postId}::${src}`;
  }

}
