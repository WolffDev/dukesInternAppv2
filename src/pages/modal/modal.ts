import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {

  constructor(public navParams: NavParams, public viewCtrl: ViewController) {
  }
  
  ionViewDidLoad() {
    
  }

  onClose() {
    this.viewCtrl.dismiss();
  }

}
