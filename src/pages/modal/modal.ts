import { Attendee } from './../../models/events/attendee.interface';
import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {

  attendee: Attendee;
  constructor(public navParams: NavParams, public viewCtrl: ViewController) {
    this.attendee = this.navParams.get('attendee');
  }
  
  ionViewDidLoad() {
  }

  onClose() {
    this.viewCtrl.dismiss();
  }

}
