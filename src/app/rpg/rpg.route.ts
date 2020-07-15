import { Routes } from '@angular/router';
import { RpgPageComponent } from './rpg-page/rpg-page.component';

export const RpgRoutes: Routes = [
  { path: '', component: RpgPageComponent, data: { reuse: true } }
];
