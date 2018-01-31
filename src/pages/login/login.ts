import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(
    public navCtrl: NavController, 
    private auth: AuthServiceProvider,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: 'Logger ind...',
    });
    loading.present();

    this.auth.login(form.value.username, form.value.password)
      .then(res => {
        console.log(res);
        loading.dismiss();
        this.navCtrl.setRoot('TabsPage');
      })
      .catch(err => {
        console.log(err);
        loading.dismiss();

        const alert = this.alertCtrl.create({
          title: 'Kan ikke logge ind',
          message: err.error.message,
          buttons: ['Træls']
        });
        alert.present();
      })
  }



}
