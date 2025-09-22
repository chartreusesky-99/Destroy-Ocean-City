import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ApiService } from '../services/api-service';
import { postComment } from '../models/postComment-model';
import { Streets } from '../data/streets';

@Component({
  selector: 'app-commentViewer',
  imports: [ DatePipe ],
  template: `
    <h5 class="mt-4 mb-2 text-secondary cursor-default">
      <i class="bi bi-life-preserver text-primary"></i> What Real Locals Have to Say:
    </h5>
    <div class="mb-4">
      @for (comment of comments; track comment.id) {
        <div class="card mb-2">
          <div class="card-body">
            <h6 class="cursor-default mt-0 mb-1">
              <img src="anonymous.jpg" alt="{{ comment.author_name }}'s Avatar" class="rounded-circle" width="32" height="32">
              &emsp;{{ comment.author_name }}
              <small class="text-muted"> 
                &emsp;&mdash;
                &emsp;{{ comment.date | date:'EEEE, MMMM d' }} 
                &emsp;<i class="bi bi-brightness-high"></i> 
                &emsp;{{ streets.getRandomStreet() }}, Ocean City
              </small>
            </h6>
            <div [innerHTML]="comment.content.rendered"></div>
          </div>
        </div>
      }
    </div>
  `
})
export class CommentViewer {
  @Input() postId!: number;
  comments: postComment[] = [];
  loading = true;

  constructor( 
    private apiService: ApiService, 
    public streets: Streets
  ){}

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