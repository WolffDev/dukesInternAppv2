import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = "NewsPage";
  tab2Root = "EventsPage";
  tab3Root = "ForumPage";

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }
}
