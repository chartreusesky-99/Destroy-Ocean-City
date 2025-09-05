import { Component, signal } from '@angular/core';
import { ApiService } from '../../services/api-service';
import { PostPreviewer } from '../../shared/post-viewers/post-previewer';
import { post } from '../../models/post-model';

@Component({
  selector: 'app-landing',
  imports: [ PostPreviewer ],
  templateUrl: './landing.html',
  styleUrl: './landing.css'
})
export class Landing {
  posts = signal<post[]>([]);

  constructor( private api: ApiService ) {}

  ngOnInit(): void {
    this.api.getRecentPosts().subscribe((posts: any) => this.posts.set(posts));
    
  }

}
