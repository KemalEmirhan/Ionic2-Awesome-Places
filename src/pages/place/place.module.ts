import { AgmCoreModule } from 'angular2-google-maps/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlacePage } from './place';

@NgModule({
  declarations: [
    PlacePage,
  ],
  imports: [
    IonicPageModule.forChild(PlacePage),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDIb4iWsmw-7talMRzlNo7JXqXvJfzqChU'
    })
  ],
  exports: [
    PlacePage
  ]
})
export class PlacePageModule {}
