import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
  name: string;
  email: string;
  event: string;
  netpass: string;
  nickname: string;
  seat: string;
  dateFrom: string;
  dateTo: string;
  username: string;

  constructor(public navParams: NavParams, public viewCtrl: ViewController) {
  }
  
  ionViewDidLoad() {
    this.name = this.navParams.get('name');
    this.email = this.navParams.get('email');
    this.event = this.navParams.get('event');
    this.netpass = this.navParams.get('netpass');
    this.nickname = this.navParams.get('nickname');
    this.seat = this.navParams.get('seat');
    this.dateFrom = this.navParams.get('date_from');
    this.dateTo = this.navParams.get('date_to');
    this.username = this.navParams.get('username');
    
  }

  onClose() {
    this.viewCtrl.dismiss();
  }

}
