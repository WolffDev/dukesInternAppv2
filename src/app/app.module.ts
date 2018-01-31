import { NativeStorage } from '@ionic-native/native-storage';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ServerStatsServiceProvider } from '../providers/server-stats-service/server-stats-service';
import { NyhederServiceProvider } from '../providers/nyheder-service/nyheder-service';
import { AvatarModule } from 'ng2-avatar';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { StorageServiceProvider } from '../providers/storage-service/storage-service';


@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: 'Tilbage',
      pageTransition: 'ios-transition'
    }),
    AvatarModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    NativeStorage,
    StatusBar,
    SplashScreen,

    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServerStatsServiceProvider,
    NyhederServiceProvider,
    AuthServiceProvider,
    StorageServiceProvider,
  ]
})
export class AppModule {}
