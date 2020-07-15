import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RpgPageComponent } from './rpg-page/rpg-page.component';
import { RouterModule } from '@angular/router';
import { RpgRoutes } from './rpg.route';


@NgModule({
  declarations: [RpgPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(RpgRoutes),
  ]
})
export class RpgModule { }
