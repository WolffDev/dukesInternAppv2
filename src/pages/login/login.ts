import { TouchID } from '@ionic-native/touch-id';
import { FingerprintAIO, FingerprintOptions } from '@ionic-native/fingerprint-aio';
import { StorageServiceProvider } from './../../providers/storage-service/storage-service';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import { LoadingController, AlertController, Platform } from 'ionic-angular';
import { NgForm } from '@angular/forms';

// @IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

private fingerprintOptions: FingerprintOptions;

  public fingerprint = false;

  constructor(
    private authService: AuthServiceProvider,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private storageService: StorageServiceProvider,
    private faio: FingerprintAIO,
    private plt: Platform,
    private touchId: TouchID
  ) {
    this.fingerprintOptions = {
      clientId: 'DukesDenmarkInternApp',
      clientSecret: 'password123',
      disableBackup: true,
      localizedFallbackTitle: 'Cancel',
      localizedReason: 'Login med fingeraftryk'
    }
  }

  ionViewDidLoad() {
    this.checkToken();
  }

  checkFingerprint() {
    const alert = this.alertCtrl.create({
      message: `${this.fingerprint}`
    });
    alert.present();
  }

  async showFingerprintDialog() {
    if(this.plt.is('ios')) {
      const available = await this.touchId.isAvailable();
      if(available === 'touch') {
        this.touchId.verifyFingerprint('Scan dit fingeraftryk...')
          .then(result => {
            this.storageService.setLoginStatus('true');
            this.authService.authChanged.next(true);
          })
          .catch(err => console.log(err))
      }
    } else {
      const available = await this.faio.isAvailable();
      if(available === 'OK') {
        this.faio.show(this.fingerprintOptions)
          .then(result => {
            this.storageService.setLoginStatus('true');
            this.authService.authChanged.next(true);
          })
          .catch(err => console.log(err))
      }
    }



  }

  login(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: 'Logger ind...',
    });
    loading.present();
    // TODO: change logic, so it all happens in auth-service and NOT login.ts
    this.authService.login(form.value.username, form.value.password)
      .then(res => {
        this.authService.setToken(res['token']);
        this.authService.setUser(res['user']);
        this.storageService.setToken(res['token']);
        this.storageService.setUserData(res['user']);
        this.storageService.setLoginStatus('true');
        this.authService.authChanged.next(true);
        loading.dismiss();
      })
      .catch(err => {
        loading.dismiss();

        const alert = this.alertCtrl.create({
          title: 'Kan ikke logge ind',
          message: err.error.message,
          buttons: ['Træls']
        });
        alert.present();
      })
  }

  async checkToken() {
    const token = await this.storageService.getToken();
    if(token !== '') {
      console.log(token);
      console.log('TOKEN IS NOT EMPTY!!!');
      this.fingerprint = true;
    } else {
      console.log('TOKEN IS EMPTY!!!');
    }
  }
  



}
