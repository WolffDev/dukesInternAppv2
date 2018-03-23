import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { StorageServiceProvider } from './../../providers/storage-service/storage-service';
import { SingleEventResponse }  from './../../models/events/singleEventResponse.interface.ts';
import { EventServiceProvider } from './../../providers/event-service/event-service';
import { Attendee } from './../../models/events/attendee.interface';
import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

@IonicPage()
@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html',
})
export class EventDetailPage {

  amount: number;
  event: string;
  searchTerm: string = '';
  searchControl: FormControl;
  attendees: Attendee[];
  newAttendees: Attendee[];
  searching: any = false;

  constructor(
    public navParams: NavParams, 
    public viewCtrl: ViewController, 
    private eventService: EventServiceProvider,
    private storageService: StorageServiceProvider,
    private authService: AuthServiceProvider,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
  ) {
    this.searchControl = new FormControl();
    this.getAttendees();
  }
  ionViewDidEnter() {
    this.searchControl.valueChanges.debounceTime(500).subscribe(search => {
      this.searching = false;
      this.filterAttendees()
    })
    
  }
  onSearchInput() {
    this.searching = true;
  }
  public filterAttendees() {
    this.attendees = this.newAttendees.filter(attendee => {
      return attendee.name.toString().toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 ||
      attendee.seat.toString().toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 ||
      attendee.email.toString().toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 ||
      attendee.nickname.toString().toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 || 
      attendee.username.toString().toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 ||
      attendee.lan_ip.toString().toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
    })
  }
  getAttendees() {
    let loading = this.loadingCtrl.create({
      content: 'Henter deltagerer'
    });
    loading.present();
    this.event = this.navParams.data.event;
    let eventId = this.navParams.data.eventId;
    this.eventService.getEventById(eventId).then(SingleEventResponse => {
      this.storageService.setToken(SingleEventResponse.token);
      this.authService.setToken(SingleEventResponse.token);
      this.newAttendees = SingleEventResponse.attendees;
      this.amount = SingleEventResponse.attendeeAmount;
      this.filterAttendees();
      loading.dismiss();
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
  onAttendeeClick(attendee: Attendee) {
    
    const modal = this.modalCtrl.create('ModalPage', {attendee});
    modal.present();
    modal.onDidDismiss( () => {
      this.searchTerm = '';
    })
  }
  onClose() {
    this.viewCtrl.dismiss();
  }


}
