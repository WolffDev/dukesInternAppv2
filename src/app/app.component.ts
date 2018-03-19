import { LoginPage } from './../pages/login/login';
import { TabsPage } from './../pages/tabs/tabs';
import { AuthServiceProvider } from './../providers/auth-service/auth-service';
import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from '@ionic-native/splash-screen';
import { timer } from 'rxjs/observable/timer'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;
  isAuth: boolean = false;
  showSplash = true;


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
      timer(1500).subscribe(() => this.showSplash = false)
      
    
      this.authService.authChanged.subscribe( (isAuth: boolean) => {
        this.isAuth = isAuth;
        if(this.isAuth) {
          this.nav.setRoot(TabsPage);
        } else {
          this.nav.setRoot(LoginPage);
        }
      })

      this.authService.checkAuth();
      if(this.authService.authenticated == false) {
        // this.rootPage = LoginPage;
        this.nav.setRoot(LoginPage)
      } else {
        this.nav.setRoot(TabsPage)
        // this.rootPage = TabsPage;
      }
    });
  }
  // ngOnInit() {
  //   this.authService.checkAuth();
  //   if(this.authService.authenticated == false) {
  //     // this.rootPage = LoginPage;
  //     this.nav.setRoot(LoginPage)
  //   } else {
  //     this.nav.setRoot(TabsPage)
  //     // this.rootPage = TabsPage;
  //   }
  // }

  logout() {
    this.authService.logout();
    this.menuCtrl.close();
  }

  goToTabs() {
    this.nav.setRoot(TabsPage);
    this.menuCtrl.close();
  }
}
