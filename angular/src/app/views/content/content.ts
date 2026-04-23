import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiService } from '../../services/api-service';
import { AlertService } from '../../services/alert-service';
import { PostViewer } from '../../shared/post-viewers/post-viewer';
import { post } from '../../models/post-model';

@Component({
  selector: 'content-viewer',
  imports: [ PostViewer ],
  template: `
    @if (contentPost) {
      <app-postViewer
        [post]="contentPost"
        [showAuthorHeader]="false"
        [showAuthorFooter]="false"
        [showComments]="false"
      ></app-postViewer>
    }
  `
})
export class Content implements OnInit {

  public contentPost: post | null = null;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('contentSlug');
      if (!slug) return;

      this.apiService.getContentBySlug(slug).subscribe({
        next: posts => {
          if (posts.length > 0) {
            this.contentPost = posts[0];
          } else {
            this.alertService.addAlert('error', `Content "${slug}" could not be found.`);
          }
        },
        error: () => {
          this.alertService.addAlert('error', `Failed to load content "${slug}".`);
        }
      });
    });
  }

}
