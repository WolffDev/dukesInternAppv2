import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-nyheder',
  templateUrl: 'nyheder.html',
})
export class NyhederPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NyhederPage');
  }

  sendConsoleMsg() {
    console.log("Test message");
  }

}
