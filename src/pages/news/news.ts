import { RefreshTokenResponse } from './../../models/auth/refreshTokenResponse.interface';
import { SingleNews } from './../../models/news/singleNews.interface';
import { NewsServiceProvider } from './../../providers/news-service/news-service';
import { NewsResponse } from './../../models/news/newsResponse.interface';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { StorageServiceProvider } from './../../providers/storage-service/storage-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
// import 'rxjs/add/operator/map';
import * as daLocale from 'date-fns/locale/da/index.js'

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {

  news: SingleNews[];
  amountOfGuests;
  userData;
  public i18nOptions = {
    locale: daLocale
  }

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private alertCtrl: AlertController, 
    public storageService: StorageServiceProvider,
    private newsService: NewsServiceProvider,
    private loadingCtrl: LoadingController,
    private authService: AuthServiceProvider // only used for testing atm
  ) {
    
  }

  ionViewDidLoad(){
    this.getNews();
  }

  getNews() {
    let loading = this.loadingCtrl.create({
      content: 'Henter Nyheder'
    });
    loading.present();
    this.newsService.getNews()
      .then(NewsResponse => {
        loading.dismiss();
        this.news = NewsResponse.news;
      })
      .catch(err => {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Fejl ved indlæsning',
          message: JSON.stringify(err),
          buttons: ['Træls']
        });
        alert.present();
      })
  }

  
  async checkToken() {
    let token = this.authService.getToken();
    this.alert(JSON.stringify(token));
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
  

  testDetails() {
    this.navCtrl.push('NyhedDetailPage')
  }

  updateNews(refresher) {
    this.newsService.getNews()
      .then(NewsResponse => {
        this.news = NewsResponse.news;
        refresher.complete();
      })
      .catch(err => {
        console.log(err);
        refresher.complete();
      })
  }

}
