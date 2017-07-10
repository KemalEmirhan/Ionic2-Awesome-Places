import { AgmCoreModule } from 'angular2-google-maps/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddPlacePage } from './add-place';

@NgModule({
  declarations: [
    AddPlacePage,
  ],
  imports: [
    IonicPageModule.forChild(AddPlacePage),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDIb4iWsmw-7talMRzlNo7JXqXvJfzqChU'
    })
  ],
  exports: [
    AddPlacePage
  ]
})
export class AddPlacePageModule {}
