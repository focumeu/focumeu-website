import { Routes } from '@angular/router';
import path from 'path';
import { Homepage } from './pages/homepage/homepage';

export const routes: Routes = [
  { path: '', component: Homepage, title: 'Homepage' },
];
