import { AuthServiceProvider } from './../providers/auth-service/auth-service';
import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = 'LoginPage';
  showSplash = false;


  @ViewChild('nav') nav: NavController;


  constructor(
    private statusBar: StatusBar, 
    private splashScreen: SplashScreen, 
    private platform: Platform, 
    public authService: AuthServiceProvider, 
    public menuCtrl: MenuController
  ) {
    this.platform.ready().then(() => {
      this.splashScreen.hide();
      this.statusBar.hide();
    
      
    });
  }

  logout() {
    this.authService.logout();
    this.nav.setRoot('LoginPage');
    this.menuCtrl.close();
  }

  goToTabs() {
    this.nav.setRoot('TabsPage');
    this.menuCtrl.close();
  }
}
