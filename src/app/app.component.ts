import { AuthServiceProvider } from './../providers/auth-service/auth-service';
import { Component, ViewChild } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Subscription } from 'rxjs/Subscription';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: string;
  isAuth: boolean = false;
  subscription: Subscription;


  @ViewChild('nav') nav: NavController


  constructor(statusBar: StatusBar, splashScreen: SplashScreen, platform: Platform, public authService: AuthServiceProvider) {
    platform.ready().then(() => {
      statusBar.hide();
      splashScreen.hide();
    });
  
    this.authService.authChanged.subscribe( (isAuth: boolean) => {
      console.log('hello from subs');
      this.isAuth = isAuth;
      if(isAuth) {
        this.rootPage = ('TabsPage');
      } else {
        this.rootPage = ('LoginPage');
      }
    })
  }
}
