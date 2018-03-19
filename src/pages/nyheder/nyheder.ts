import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { StorageServiceProvider } from './../../providers/storage-service/storage-service';
import { NyhederServiceProvider } from './../../providers/nyheder-service/nyheder-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
// import 'rxjs/add/operator/map';

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
    this.getNews();
  }

  getNews() {
    
  }

  
  checkToken() {
    let token = this.authService.getToken();
    this.alert(token);
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
