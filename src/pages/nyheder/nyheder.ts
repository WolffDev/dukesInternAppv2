import { NyhederServiceProvider } from './../../providers/nyheder-service/nyheder-service';
import { ServerStatsServiceProvider } from './../../providers/server-stats-service/server-stats-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-nyheder',
  templateUrl: 'nyheder.html',
})
export class NyhederPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, public nyhederService: NyhederServiceProvider) {
  }

  ionViewDidLoad(){
  }

  sendConsoleMsg() {
    console.log("Test message");
  }

  testDetails() {
    this.navCtrl.push('NyhedDetailPage')
  }

  updateNews(refresher) {
    setTimeout(() => {
      console.log(event);
      refresher.complete();
    }, 3000)
  }

}
