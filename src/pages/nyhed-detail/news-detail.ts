import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { SingleNews } from '../../models/news/singleNews.interface';
import * as daLocale from 'date-fns/locale/da/index.js'

/**
 * Generated class for the NyhedDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-news-detail',
  templateUrl: 'news-detail.html',
})
export class NewsDetailPage {

  public news: SingleNews;
  public i18nOptions = {
    locale: daLocale
  }

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private viewCtrl: ViewController
  ) {
    this.news = this.navParams.get('news')
  }

  ionViewDidLoad() {
    console.log(JSON.stringify(this.news));
  }

  onClose() {
    this.viewCtrl.dismiss();
  }

}
