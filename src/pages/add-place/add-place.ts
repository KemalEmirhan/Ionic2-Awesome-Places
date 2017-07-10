import { HomePage } from './../home/home';
import { PlacesService } from './../../services/places';
import { Location } from './../../models/location';
import { SetLocationPage } from './../set-location/set-location';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { NgForm } from "@angular/forms";
import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';
import { File, FileError,Entry } from '@ionic-native/file';


declare var cordova: any;

@IonicPage()
@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html',
})
export class AddPlacePage {
  location: Location = {
    lat: 40.7624324,
    lng: -73.9759827
  };
  locationIsSet = false;
  imageUrl = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController,
              private geolocation: Geolocation, private loadCtrl: LoadingController, private alertCtrl: AlertController,
              private camera: Camera, private placesService: PlacesService, private file: File, private toastCtrl: ToastController) {}

  onSubmit(form: NgForm){
    this.placesService.addPlace(form.value.title, form.value.description, this.location, this.imageUrl);
    form.reset();
    this.location = {
        lat: 40.7624324,
        lng: -73.9759827
    };
    this.imageUrl = '';
    this.locationIsSet = false; 
    this.navCtrl.popToRoot();
  }
 
  onOpenMap() {
     let modal = this.modalCtrl.create(SetLocationPage, {location: this.location, isSet: this.locationIsSet});
      modal.present();

      modal.onDidDismiss(
        data => {
          if(data){
            this.location = data.location;
            this.locationIsSet = true;
          }
        }
      );
  }
  
  onLocate() {
    let loading = this.loadCtrl.create({
      
      content: 'Please wait...'
    });
    loading.present();
    this.geolocation.getCurrentPosition()
    .then(
      location => {
        loading.dismiss();
        this.location.lat = location.coords.latitude;
        this.location.lng = location.coords.longitude;
        this.locationIsSet = true;
      }
    )
    .catch(
      error => {
        let alert = this.alertCtrl.create({
          title: 'Error in location',
          message: error.message,
          buttons: ['OK']
        });
        alert.present();
        console.log(error);
      }
    )
    
  }

  

  onTakePhoto(){
      this.camera.getPicture({
        encodingType: this.camera.EncodingType.JPEG,
        correctOrientation: true
      })
      .then(
        imageData => {
          let currentName = imageData.replace(/^.*[\\\/]/, '');
          let path = imageData.replace(/[^\/]*$/, '');
          let newFileName = new Date().getMilliseconds() + '.jpg';
          this.file.moveFile(path, currentName, cordova.file.dataDirectory, currentName)
              .then(
                (data: Entry) => {
                  this.imageUrl = data.nativeURL;
                  this.camera.cleanup();
                  //this.file.removeFile(path, currentName); 103. satirdaki kodun isleviyle ayni isleve sahip alternatif kod
                }
              )
              .catch(
                (error: FileError) => {
                  let toast = this.toastCtrl.create({
                    message: 'Could not save the image' + error.message,
                    duration: 2500
                  });
                  toast.present();
                  this.camera.cleanup();
                }
              ); 
          this.imageUrl = imageData;
        }
      )
      .catch(
        error => {
          let toast = this.toastCtrl.create({
             message: 'Could not save the image' + error.message,
             duration: 2500
             });
             toast.present();
             this.camera.cleanup();
        }
      );


  }

}
