import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlertService } from './alert-service';

import { post } from '../models/post-model';


@Injectable({ providedIn: 'root' })
export class ApiService {

  private wpBaseUrl = '/wp-api'; // proxied in dev
  alertService!: AlertService;
  
  constructor(private http: HttpClient, alertService: AlertService) {}

  getPosts(): Observable <any> {
    return this.http.get(`${this.wpBaseUrl}/wp/v2/posts`).pipe(
      catchError((error) => {
        this.alertService.addAlert('error', 'Failed to load posts from WordPress.');
        return throwError(() => error);
      })
    );
    
  }

  getPages(): Observable<any> {
    return this.http.get(`${this.wpBaseUrl}/wp/v2/pages`);

  }

  getRecentPosts(limit = 3): Observable<post[]> {
    return this.http
      .get<post[]>(`${'https://destroyoceancity.app/wp-json/wp/v2'}/posts?per_page=${limit}&_embed`)
      .pipe(map(posts => posts || []));

  }

}
