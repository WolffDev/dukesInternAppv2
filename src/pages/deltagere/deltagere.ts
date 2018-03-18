import { ModalPage } from './../modal/modal';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, LoadingController, AlertController } from 'ionic-angular';
import { EventServiceProvider } from '../../providers/event-service/event-service';

interface SingleEvent {
  event: string,
  id: number,
  time_from: string,
  time_to: string
}

// interface eventsResponse {
//   newToken: string,
//   events: singleEvent[]
// }

@IonicPage()
@Component({
  selector: 'page-deltagere',
  templateUrl: 'deltagere.html',
})
export class DeltagerePage {

  public events: SingleEvent[];
  public newEvents;

  constructor(
    public navCtrl: NavController, 
    public eventService: EventServiceProvider, 
    public modalCtrl: ModalController, 
    public viewCtrl: ViewController, 
    private loadingCtrl: LoadingController, 
    private alertCtrl: AlertController
  ) {

  }

  ngOnInit() {
    this.getEvents();
    console.log(this.events);
    console.log('events from init');
  }

  ionViewDidLoad() {
  }

  getEvents() {
    let loading = this.loadingCtrl.create({
      content: 'Henter deltager liste'
    });
    loading.present();
    this.eventService.getEvents()
      .then(eventsResponse => {
        loading.dismiss();
        this.events = eventsResponse.events;
        this.newEvents = this.events.slice();
      })
      .catch( err => {
        console.log(err)
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Fejl ved indlæsning',
          message: err.message,
          buttons: ['Træls']
        });
        alert.present();
      })
  }

  getNewEvents() {
    this.events = this.newEvents.slice();
  }

  resetEvents($event) {
    this.getNewEvents();
  }

  filterItems(event: any) {
    let val = event.target.value;
    if(val === '') this.getNewEvents();
    console.log(this.events);

    if(val && val.trim() !== '') {
      this.events = this.events.filter( event => {
        return event.event.toLowerCase().includes(val.toLowerCase()) || event.time_from.toLowerCase().includes(val.toLowerCase());
      })
    }
  }

  onItemClick($event, user) {
    console.log(user);
    let modal = this.modalCtrl.create('ModalPage', user);
    modal.present();
  }

}
