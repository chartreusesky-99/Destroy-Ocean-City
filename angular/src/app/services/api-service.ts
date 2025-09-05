import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlertService } from './alert-service';
import { post } from '../models/post-model';
import { postComment } from '../models/postComment-model';

@Injectable({ providedIn: 'root' })
export class ApiService {

  private baseUrl = 'https://destroyoceancity.app/wp-json/wp/v2';
  private promotedId = 3;

  constructor(private http: HttpClient, private alertService: AlertService) {}

  getPosts(tagId: number): Observable<post[]> {
    return this.http
      .get<post[]>(`${this.baseUrl}/posts?categories=${this.promotedId}&_embed`)
      .pipe(
        map(posts => posts || []),
        catchError(err => this.handleError(err, `fetching posts for tag ${tagId}`))
      );
  }

  getPostById(id: number): Observable<{ post: post, comments: postComment[] }> {
    return this.http
      .get<post>(`${this.baseUrl}/posts/${id}?_embed`)
      .pipe(switchMap(postData => this.http.get<postComment[]>(`${this.baseUrl}/comments?post=${id}&_embed`)
        .pipe(map(comments => ({ post: postData, comments }))
      )
    ),
    catchError(err => this.handleError(err, `loading post with ID ${id}`))
    );
  }

  getRecentPosts(limit = 3): Observable<post[]> {
    return this.http
      .get<post[]>(`${this.baseUrl}/posts?per_page=${limit}&categories=${this.promotedId}&_embed`)
      .pipe(
        map(posts => posts || []),
        catchError(err => this.handleError(err, 'fetching recent posts.'))
      );
  }

  getCommentsByPostId(postId: number): Observable<postComment[]> {
    return this.http
      .get<postComment[]>(`${this.baseUrl}/comments?post=${postId}&_embed`);
  }

  private handleError(error: any, context: string) {
    console.error(`API error while ${context}:`, error);

    let message = 'An unexpected error occurred while communicating with the backend API.';

    if (error instanceof HttpErrorResponse) {
      message = `API Service encountered an error (${error.status}) while ${context}.`;
      if (error.error?.message) {
        message += ` Details: ${error.error.message}`;
      }
    }
    this.alertService.addAlert('error', message, true);
    return throwError(() => error);
  }
}