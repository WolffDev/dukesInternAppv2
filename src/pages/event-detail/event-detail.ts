import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { StorageServiceProvider } from './../../providers/storage-service/storage-service';
import { SingleEventResponse }  from './../../models/events/singleEventResponse.interface.ts';
import { EventServiceProvider } from './../../providers/event-service/event-service';
import { Attendee } from './../../models/events/attendee.interface';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html',
})
export class EventDetailPage {

  amount: number;
  attendees: Attendee[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController, 
    private eventService: EventServiceProvider,
    private storageService: StorageServiceProvider,
    private authService: AuthServiceProvider,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {
  }
  ionViewDidLoad(){
   this.getAttendees()
  }
  getAttendees() {
    let loading = this.loadingCtrl.create({
      content: 'Henter deltagerer'
    });
    loading.present();
    let eventId = this.navParams.get('eventId');
    this.eventService.getEventById(eventId).then(SingleEventResponse => {
      this.storageService.setToken(SingleEventResponse.token);
      this.authService.setToken(SingleEventResponse.token);
      this.attendees = SingleEventResponse.attendees;
      this.amount = SingleEventResponse.attendeeAmount;
      loading.dismiss();
      console.log(JSON.stringify(this.attendees));
    })
    .catch( err => {
      loading.dismiss();
      const alert = this.alertCtrl.create({
        title: 'Fejl ved indlæsning',
        message: err.message,
        buttons: ['Prøv igen']
      });
      alert.present();
    })
  }

  onClose() {
    this.viewCtrl.dismiss();
  }


}
