import { SingleNews } from './../../models/news/singleNews.interface';
import { NewsServiceProvider } from './../../providers/news-service/news-service';
import { NewsResponse } from './../../models/news/newsResponse.interface';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { StorageServiceProvider } from './../../providers/storage-service/storage-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
// import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {

  news: SingleNews[];
  amountOfGuests;
  userData;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private alertCtrl: AlertController, 
    public storageService: StorageServiceProvider,
    private newsService: NewsServiceProvider,
    private authService: AuthServiceProvider // only used for testing atm
  ) {
    
  }

  ionViewDidLoad(){
    this.getNews();
  }

  getNews() {
    // this.newsService.getNews()
    //   .then(NewsResponse => {
    //     // this.news = NewsResponse.news;
    //     console.log(NewsResponse.news);
    //   })
  }

  
  checkToken() {
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
    setTimeout(() => {
      console.log(refresher);
      refresher.complete();
    }, 3000)
  }

}
