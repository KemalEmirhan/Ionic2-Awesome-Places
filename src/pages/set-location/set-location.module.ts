import { AgmCoreModule } from 'angular2-google-maps/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SetLocationPage } from './set-location';

@NgModule({
  declarations: [
    SetLocationPage,
  ],
  imports: [
    IonicPageModule.forChild(SetLocationPage),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDIb4iWsmw-7talMRzlNo7JXqXvJfzqChU'
    })
  ],
  exports: [
    SetLocationPage
  ]
})
export class SetLocationPageModule {}
