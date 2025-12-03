import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentsModule } from './components/components-module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from './services/loader.interceptor';
import { provideNgxMask } from 'ngx-mask';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ComponentsModule,
  ],
  exports: [
    ComponentsModule
  ]
  ,
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    ...provideNgxMask()
  ]
})
export class CoreModule { }
