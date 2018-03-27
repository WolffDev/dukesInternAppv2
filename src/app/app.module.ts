import { DirectivesModule } from './../directives/directives.module';
import { ForumServiceProvider } from './../providers/forum-service/forum-service';
import { AuthInterceptorProvider } from './../providers/auth-interceptor/auth-interceptor';
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
import { TouchID } from '@ionic-native/touch-id';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { Keyboard } from '@ionic-native/keyboard';


@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: 'Tilbage',
      tabsHideOnSubPages: true
    }),
    AvatarModule.forRoot(),
    DirectivesModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptorProvider, 
      multi: true
    },
    FingerprintAIO,
    Keyboard,
    TouchID,
    NativeStorage,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    StorageServiceProvider,
    NativePageTransitions,
    ForumServiceProvider,
  ]
})
export class AppModule {}
