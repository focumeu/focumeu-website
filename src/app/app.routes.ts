import { Routes } from '@angular/router';
import { Homepage } from './pages/homepage/homepage';

// Il <title> è gestito da SeoService (tradotto per lingua),
// quindi qui non si imposta `title` per evitare che lo sovrascriva.
export const routes: Routes = [
  { path: '', component: Homepage },
  { path: '**', redirectTo: '' },
];
