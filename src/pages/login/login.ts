import { StorageServiceProvider } from './../../providers/storage-service/storage-service';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

// @IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(
    private navCtrl: NavController, 
    private authService: AuthServiceProvider,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private storageService: StorageServiceProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: 'Logger ind...',
    });
    loading.present();

    this.authService.login(form.value.username, form.value.password)
      .then(res => {
        // console.log('fre login',res);
        this.authService.setToken(res['token']);
        this.authService.setUser(res['user']);
        this.storageService.setToken(res['token']);
        this.storageService.setUserData(res['user']);
        this.authService.authChanged.next(true);
        loading.dismiss();
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
