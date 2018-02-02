import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { StorageServiceProvider } from './../../providers/storage-service/storage-service';
import { NyhederServiceProvider } from './../../providers/nyheder-service/nyheder-service';
import { ServerStatsServiceProvider } from './../../providers/server-stats-service/server-stats-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-nyheder',
  templateUrl: 'nyheder.html',
})
export class NyhederPage {

  news = [];
  amountOfGuests;
  userData;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private alertCtrl: AlertController, 
    public nyhederService: NyhederServiceProvider,
    public storageService: StorageServiceProvider,
    private authService: AuthServiceProvider // only used for testing atm
  ) {
    
  }

  ionViewDidLoad(){
    console.log('ionviewdid load NYHEDER');
    // this.news = [
    //   {'title': 'Test title 1', 'body':'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam, deserunt!', 'author':'Martin Sigvartsen Sørensen Jacobsen'},
    //   {'title': 'Test title 2', 'body':'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam, deserunt!', 'author':'Daniel Sigvartsen'},
    //   {'title': 'Test title 3', 'body':'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam, deserunt!', 'author':'Dennis Duggen'},
    //   {'title': 'Test title 4', 'body':'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam, deserunt!', 'author':'David Wolff'},
    //   {'title': 'Test title 5', 'body':'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam, deserunt!', 'author':'Dennis Jørgensen'},
    // ]
    this.getNews();

  }

  getNews() {
    
  }

  
  checkToken() {
    // let token = this.authService.getToken();
    this.alert(this.amountOfGuests);
  }

  newsDetails(data) {
    this.navCtrl.push('NyhedDetailPage', {data});
  }

  alert(data) {
    let alert = this.alertCtrl.create({
      title: 'Test',
      message: data,
      buttons: ['Okay']
    });
    alert.present();
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
