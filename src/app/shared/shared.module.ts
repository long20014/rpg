import { NgModule } from '@angular/core';
import { SharedInAppModule } from './shared-in-app.module';
import { SharedLibsModule } from './shared-libs.module';



@NgModule({
  declarations: [],
  imports: [
    SharedInAppModule,
    SharedLibsModule
  ],
  exports: [
    SharedInAppModule,
    SharedLibsModule
  ]
})
export class SharedModule { }
