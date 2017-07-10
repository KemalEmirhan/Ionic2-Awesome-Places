import { File } from '@ionic-native/file';
import { Location } from './../models/location';
import { Place } from './../models/place';

import { Storage } from "@ionic/storage";
import { Injectable } from "@angular/core";

declare var cordova: any;

@Injectable() // Bu sayede angular'a bu sinifa disardan biseyler eklenecek komutu veriyor. 
export class PlacesService {
    private places: Place[] = [];

    constructor( private storage: Storage, private file: File) {}

    addPlace(title: string, description: string, location: Location, imageUrl: string){
        const place = new Place(title, description, location, imageUrl);
    this.places.push(place);
    this.storage.set('places', this.places)
      .then()
      .catch(
        err => {
          this.places.splice(this.places.indexOf(place), 1);
        }
      );
  }

  fetchPlaces() {
    return this.storage.get('places')
      .then(
        (places: Place[]) => {
          this.places = places != null ? places : [];
          return this.places.slice();
        }
      )
      .catch(
        err => console.log(err)
      );
  }

    loadPlaces(){
        return this.places.slice();
    }
    
    deletePlace(index: number){
        let place = this.places[index];
        this.places.splice(index, 1);
        this.storage.set('places', this.places)
            .then(
                () => {
                    this.removeFile(place);
                }
            )
            .catch(
                error => {
                    console.log(error);
                    
                }
            );
    }

    private removeFile(place: Place){
        let currentName = place.imageUrl.replace(/^.*[\\\/]/, '');
        this.file.removeFile(cordova.file.dataDirectory, currentName)
            .then(
                () => {
                    console.log('Removed File');
                    
                }
            )
            .catch(
                () => {
                    console.log('Error while removing File');
                    this.addPlace(place.title, place.description, place.location, place.imageUrl);
                }
            );
    }
}