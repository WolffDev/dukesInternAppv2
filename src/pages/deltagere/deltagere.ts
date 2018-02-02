import { ModalPage } from './../modal/modal';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { EventServiceProvider } from '../../providers/event-service/event-service';

@IonicPage()
@Component({
  selector: 'page-deltagere',
  templateUrl: 'deltagere.html',
})
export class DeltagerePage {

  public events;
  public newEvents;

  constructor(public navCtrl: NavController, public eventService: EventServiceProvider, public modalCtrl: ModalController, public viewCtrl: ViewController) {
  }

  ngOnInit() {
    this.getEvents();
    console.log(this.events);
    console.log('events from init');
  }

  ionViewDidLoad() {
  }

  getEvents() {
    this.eventService.getEvents()
      .then(res => {
        this.events = res;
        this.newEvents = this.events.slice();
      })
      .catch( err => console.log(err))
  }

  getNewEvents() {
    this.events = this.newEvents.slice();
  }

  resetEvents($event) {
    this.getNewEvents();
  }

  filterItems(event: any) {
    let val = event.target.value;
    if(val === '') this.getEvents();
    console.log(this.events);

    if(val && val.trim() !== '') {
      this.events = this.events.filter( event => {
        return event.name.toLowerCase().includes(val.toLowerCase());
      })
    }
  }

  onItemClick($event, user) {
    console.log(user);
    let modal = this.modalCtrl.create('ModalPage', user);
    modal.present();
  }

}
