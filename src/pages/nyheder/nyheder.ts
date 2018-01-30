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

  news;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, public nyhederService: NyhederServiceProvider) {
  }

  ionViewDidLoad(){
    this.news = [
      {'title': 'Test title 1', 'body':'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam, deserunt!', 'author':'Martin Sigvartsen Sørensen Jacobsen'},
      {'title': 'Test title 2', 'body':'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam, deserunt!', 'author':'Daniel Sigvartsen'},
      {'title': 'Test title 3', 'body':'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam, deserunt!', 'author':'Dennis Duggen'},
      {'title': 'Test title 4', 'body':'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam, deserunt!', 'author':'David Wolff'},
      {'title': 'Test title 5', 'body':'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam, deserunt!', 'author':'Dennis Jørgensen'},
    ]
  }

  newsDetails(data) {
    this.navCtrl.push('NyhedDetailPage', {data})
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
