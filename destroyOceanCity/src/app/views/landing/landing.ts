import { Component, OnInit, signal } from '@angular/core';
import { ApiService } from '../../services/api-service';
import { post } from '../../models/post-model';

@Component({
  selector: 'app-landing',
  imports: [],
  templateUrl: './landing.html',
  styleUrl: './landing.css'
})
export class Landing {

  posts = signal<post[]>([]);

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getRecentPosts().subscribe((posts: any) => this.posts.set(posts));
    
  }

}
