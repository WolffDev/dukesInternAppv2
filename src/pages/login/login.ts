import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { LoginResponse } from './../../models/login/loginResponse.interface';
import { TouchID } from '@ionic-native/touch-id';
import { FingerprintAIO, FingerprintOptions } from '@ionic-native/fingerprint-aio';
import { StorageServiceProvider } from './../../providers/storage-service/storage-service';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import { IonicPage, LoadingController, AlertController, Platform, NavController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private fingerprintOptions: FingerprintOptions;
  public fingerprint: boolean;

  constructor(
    private authService: AuthServiceProvider,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private storageService: StorageServiceProvider,
    private faio: FingerprintAIO,
    private plt: Platform,
    private touchId: TouchID,
    private navCtrl: NavController,
    private nativeTransitions: NativePageTransitions
  ) {
    this.fingerprintOptions = {
      clientId: 'DukesDenmarkInternApp',
      clientSecret: 'password123',
      disableBackup: true,
      localizedFallbackTitle: 'Cancel',
      localizedReason: 'Login med fingeraftryk'
    }
    this.checkLoginStatus();
    this.checkToken();
  }
  
  ionViewDidLoad() {
    console.log('View loaded');
  }

  checkLoginStatus() {
    this.storageService.getLoginStatus()
      .then(status => {
        if(status === 'true') {
          console.log(status, '#### FRA STATUS ####');
          this.authService.setFingerprint(true);
          this.alreadyAuth();
        }
        return;
      })
      .catch(err => console.log('Something went wrong, which it should not',err));

  }

  async showFingerprintDialog() {
    if(this.plt.is('ios')) {
      const available = await this.touchId.isAvailable();
      if(available === 'touch') {
        this.touchId.verifyFingerprint('Scan dit fingeraftryk...')
          .then(result => {
            this.alreadyAuth();
          })
          .catch(err => console.log(err))
      }
    } else {
      const available = await this.faio.isAvailable();
      if(available === 'OK') {
        this.faio.show(this.fingerprintOptions)
          .then(result => {
            this.alreadyAuth();
          })
          .catch(err => console.log(err))
      }
    }
  }

  async login(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: 'Logger ind...',
    });
    loading.present();
    await this.authService.login(form.value.username, form.value.password)
      .then( LoginResponse => {
        this.authService.setFingerprint(true);
        this.authService.setToken(LoginResponse.token);
        this.authService.setUser(LoginResponse.user);
        this.storageService.setToken(LoginResponse.token);
        this.storageService.setUserData(LoginResponse.user);
        this.storageService.setLoginStatus('true');
        const options: NativeTransitionOptions = {
          direction: 'up',
          duration: 400,
          iosdelay: 100,
          androiddelay: 100
        }
        this.nativeTransitions.flip(options)
        this.navCtrl.setRoot('TabsPage');
        loading.dismiss();

      })
      .catch(e => {
        loading.dismiss();
        console.log(e.error);
        const alert = this.alertCtrl.create({
          title: 'Kan ikke logge ind',
          message: e.error.message,
          buttons: ['Træls']
        });
        alert.present();
      })    
  }

  async checkToken() {
    const token = await this.storageService.getToken();
    if(token !== '') {
      await this.authService.setFingerprint(true);
      this.fingerprint = this.authService.getFingerprint();
      console.log('TOKEN IS NOT EMPTY!!!');
    } else {
      await this.authService.setFingerprint(false);
      this.fingerprint = this.authService.getFingerprint();
      console.log('TOKEN IS EMPTY!!!');
    }
  }

  async alreadyAuth() {
    this.authService.setToken(await this.storageService.getToken());
    this.authService.setUser(await this.storageService.getUserData());
    // this.authService.refreshToken();
    await this.storageService.setLoginStatus('true');
    const options: NativeTransitionOptions = {
      direction: 'up',
      duration: 400,
      iosdelay: 100,
      androiddelay: 100
    }
    this.nativeTransitions.flip(options)
    this.navCtrl.setRoot('TabsPage');
  }

}
