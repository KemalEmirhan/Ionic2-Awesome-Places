import { PlacePage } from './../place/place';
import { PlacesService } from './../../services/places';
import { Place } from './../../models/place';
import { AddPlacePage } from './../add-place/add-place';
import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

    addPlacePage = AddPlacePage;
    places: Place[] = [];

    constructor(public navCtrl: NavController, private placesService: PlacesService, private modalCtrl: ModalController) {

  }

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.placesService.fetchPlaces()
    .then(
      (places: Place[]) => this.places = places 
    );
  }


  ionViewWillEnter(){
    this.places = this.placesService.loadPlaces();
  }

  onOpenPlace(place: Place, index: number){
    let modal = this.modalCtrl.create(PlacePage, {place: place, index: index });
    modal.present();
  }

}
