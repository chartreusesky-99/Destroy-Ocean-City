import { Routes } from '@angular/router';

// Views Import
import { Landing } from './views/landing/landing';
import { Content } from './views/content/content';
import { Blog } from './views/blog/blog';
import { Store } from './views/store/store';
import { ProductViewer } from './views/store/product-viewer/product-viewer';
import { Checkout } from './views/store/checkout/checkout';
import { Team } from './views/team/team';
import { Privacy } from './views/privacy/privacy';
import { Testing } from './views/testing/testing';
import { NotFound } from './views/not-found/not-found';

export const routes: Routes = [
  { path: '', component: Landing },
  { path: 'blog', component: Blog },
  { path: 'blog/author/:authorName', component: Blog },
  { path: 'blog/topic/:topicName', component: Blog },
  { path: 'blog/:slug', component: Blog},
  { path: 'content/:contentSlug', component: Content },
  { path: 'merch', component: Store },
  { path: 'merchandise/checkout', component: NotFound },
  { path: 'merchandise/order/:orderId', component: NotFound },
  { path: 'merchandise/swag/id/:itemId', component: ProductViewer },
  { path: 'merchandise/swag/:itemSlug', component: ProductViewer },
  { path: 'heroes', component: Team },
  { path: 'privacy', component: Privacy },
  { path: 'test', component: Testing },
  { path: 'not-found', component: NotFound },
  { path: 'home', redirectTo: '' },
  { path: 'landing', redirectTo: '' },
  { path: 'debug', redirectTo: 'test' },
  { path: 'facts', redirectTo: 'blog' },
  { path: 'about', redirectTo: 'heroes' },
  { path: 'store', redirectTo: 'merch' },
  { path: '**', component: NotFound } // 404 catch
];
