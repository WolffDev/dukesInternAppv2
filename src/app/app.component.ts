import { LoginPage } from './../pages/login/login';
import { TabsPage } from './../pages/tabs/tabs';
import { AuthServiceProvider } from './../providers/auth-service/auth-service';
import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;
  isAuth: boolean = false;


  @ViewChild('nav') nav: NavController;


  constructor(statusBar: StatusBar, splashScreen: SplashScreen, platform: Platform, public authService: AuthServiceProvider, public menuCtrl: MenuController) {
    platform.ready().then(() => {
      statusBar.hide();
      splashScreen.hide();
      
    });
  
    this.authService.authChanged.subscribe( (isAuth: boolean) => {
      this.isAuth = isAuth;
      if(this.isAuth) {
        this.nav.setRoot(TabsPage);
      } else {
        this.nav.setRoot(LoginPage);
      }
    })
  }
  ngOnInit() {
    console.log('hello from app.com onInit');
    this.authService.checkAuth();
    if(this.authService.authenticated == false) {
      this.rootPage = LoginPage;
    } else {
      this.rootPage = TabsPage;
    }
  }

  logout() {
    this.authService.logout();
    this.menuCtrl.close();
  }
}
