import { Routes } from '@angular/router';

// Views Import
import { Landing } from './views/landing/landing';
import { Blog } from './views/blog/blog';
import { Store } from './views/store/store';
import { Team } from './views/team/team';
import { Privacy } from './views/privacy/privacy';
import { Testing } from './views/testing/testing';
import { NotFound } from './views/not-found/not-found';

export const routes: Routes = [
  { path: '', component: Landing },
  { path: 'blog', component: Blog },
  { path: 'blog/:contentId', component: Blog},
  { path: 'facts', component: Blog},
  { path: 'merch', component: Store},
  { path: 'heroes', component: Team},
  { path: 'privacy', component: Privacy },
  { path: 'test', component: Testing },
  { path: 'not-found', component: NotFound },
  { path: 'home', redirectTo: '' },
  { path: 'landing', redirectTo: '' },
  { path: 'store', redirectTo: 'merch'},
  { path: 'about', redirectTo: 'heroes'},
  { path: '**', redirectTo: 'not-found' } // 404 catch
];
