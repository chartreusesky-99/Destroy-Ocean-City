import { Routes } from '@angular/router';

// Views Import
import { Landing } from './views/landing/landing';
import { Blog } from './views/blog/blog';
import { Testing } from './views/testing/testing';
import { NotFound } from './views/not-found/not-found';

export const routes: Routes = [
  { path: '', component: Landing },
  { path: 'home', redirectTo: '' },
  { path: 'landing', redirectTo: '' },
  { path: 'blog', component: Blog },
  { path: 'blog/author/:authorName', component: Blog},
  { path: 'blog/:contentId', component: Blog},
  { path: 'test', component: Testing },
  { path: 'not-found', component: NotFound },
  { path: '**', redirectTo: 'not-found' } // 404 catch
];
