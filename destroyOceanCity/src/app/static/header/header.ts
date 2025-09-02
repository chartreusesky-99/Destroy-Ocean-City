import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api-service';

@Component({
  selector: 'app-header',
  imports: [ RouterLink ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  posts: any;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getPosts().subscribe({
      next: (data) => {
        this.posts = data;
        console.log('Posts:', data);
      },
      error: (err) => console.error('Error loading posts', err)
    });
  }

}
