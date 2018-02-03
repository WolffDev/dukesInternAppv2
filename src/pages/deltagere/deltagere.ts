import { ModalPage } from './../modal/modal';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, LoadingController, AlertController } from 'ionic-angular';
import { EventServiceProvider } from '../../providers/event-service/event-service';

@IonicPage()
@Component({
  selector: 'page-deltagere',
  templateUrl: 'deltagere.html',
})
export class DeltagerePage {

  public events;
  public newEvents;

  constructor(public navCtrl: NavController, public eventService: EventServiceProvider, public modalCtrl: ModalController, public viewCtrl: ViewController, private loadingCtrl: LoadingController, private alertCtrl: AlertController) {
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
      .then(res => {
        loading.dismiss();
        this.events = res;
        this.newEvents = this.events.slice();
      })
      .catch( err => {
        console.log(err)
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Kan ikke hente listen nu\nPrøv evt igen.',
          message: err,
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
    if(val === '') this.getEvents();
    console.log(this.events);

    if(val && val.trim() !== '') {
      this.events = this.events.filter( event => {
        return event.name.toLowerCase().includes(val.toLowerCase()) || event.lan_ip.toLowerCase().includes(val.toLowerCase());
      })
    }
  }

  onItemClick($event, user) {
    console.log(user);
    let modal = this.modalCtrl.create('ModalPage', user);
    modal.present();
  }

}
