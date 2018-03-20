import { AuthInterceptorProvider } from './../providers/auth-interceptor/auth-interceptor';
// import { TabsPage } from './../pages/tabs/tabs';
// import { LoginPage } from './../pages/login/login';
import { NativeStorage } from '@ionic-native/native-storage';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AvatarModule } from 'ng2-avatar';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { StorageServiceProvider } from '../providers/storage-service/storage-service';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio'
import { TouchID } from '@ionic-native/touch-id'


@NgModule({
  declarations: [
    MyApp,
    // TabsPage,
    // LoginPage,
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
    MyApp,
    // TabsPage,
    // LoginPage,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptorProvider, 
      multi: true
    },
    FingerprintAIO,
    TouchID,
    NativeStorage,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    StorageServiceProvider,
  ]
})
export class AppModule {}
