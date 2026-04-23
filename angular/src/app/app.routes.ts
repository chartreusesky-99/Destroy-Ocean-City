import { Routes } from '@angular/router';

// Views Import
import { Landing } from './views/landing/landing';
import { Content } from './views/content/content';
import { Blog } from './views/blog/blog';
import { Store } from './views/store/store';
import { Team } from './views/team/team';
import { Privacy } from './views/privacy/privacy';
import { Testing } from './views/testing/testing';
import { NotFound } from './views/not-found/not-found';

export const routes: Routes = [
  { path: '', component: Landing },
  { path: 'content/:contentSlug', component: Content},
  { path: 'blog', component: Blog },
  { path: 'blog/author/:authorName', component: Blog},
  { path: 'blog/:slug', component: Blog},
  { path: 'facts', redirectTo: 'blog' },
  { path: 'merch', component: Store},
  { path: 'heroes', component: Team},
  { path: 'privacy', component: Privacy },
  { path: 'test', component: Testing },
  { path: 'debug', redirectTo: 'test' },
  { path: 'not-found', component: NotFound },
  { path: 'home', redirectTo: '' },
  { path: 'landing', redirectTo: '' },
  { path: 'store', redirectTo: 'merch'},
  { path: 'about', redirectTo: 'heroes'},
  { path: '**', component: NotFound } // 404 catch
];
