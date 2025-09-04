import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlertService } from './alert-service';

import { post } from '../models/post-model';


@Injectable({ providedIn: 'root' })
export class ApiService {

  private WPBaseUrl = 'https://destroyoceancity.app/wp-json/wp/v2';
  alertService!: AlertService;
  
  constructor(private http: HttpClient, alertService: AlertService) {}

  getRecentPosts(limit = 3): Observable<post[]> {
  return this.http.get<post[]>(`${this.WPBaseUrl}/posts?per_page=${limit}&_embed`).pipe(map(posts => posts || []));
  
  }

  getPostsByTag(tag = 'Promoted'): Observable<post[]> {
    return this.http.get<post[]>(`${this.WPBaseUrl}/posts?tags=${tag}&_embed`).pipe(map(posts => posts || []));

  }

  getPostById(id: number): Observable<post> {
    return this.http.get<post>(`${this.WPBaseUrl}/posts/${id}?_embed`);

  }

}
