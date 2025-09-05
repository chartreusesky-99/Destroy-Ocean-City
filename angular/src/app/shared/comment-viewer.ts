import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ApiService } from '../services/api-service';
import { postComment } from '../models/postComment-model';

@Component({
  selector: 'app-commentViewer',
  imports: [ DatePipe ],
  template: `
    <h5 class="my-4">
      What Real Locals Have to Say:
    </h5>
    @for (comment of comments; track comment.id) {
      <div class="card">
        <div class="card-body">
          <h6 class="mt-0 mb-1">
            {{ comment.author_name }}
            <small class="text-muted"> {{ comment.date | date:'medium' }}</small>
          </h6>
          <div [innerHTML]="comment.content.rendered"></div>
        </div>
      </div>
    }
  `
})
export class CommentViewer {
  @Input() postId!: number;
  comments: postComment[] = [];
  loading = true;

  constructor( private apiService: ApiService ){}

  ngOnInit(): void {
    if (this.postId) {
      this.apiService.getCommentsByPostId(this.postId).subscribe({
        next: (res) => {
          this.comments = res;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error fetching comments:', err);
          this.loading = false;
        }
      });
    }
  }

}