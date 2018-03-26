import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal';

@Injectable()
export class NotificationServiceProvider {

  constructor(public http: HttpClient, private oneSignal: OneSignal) {
    console.log('Hello NotificationServiceProvider Provider');
    this.oneSignal.startInit('8e90792d-c3b7-413a-9cf4-d5c888f4f79b', '630823908238');
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

    this.oneSignal.handleNotificationReceived().subscribe(() => {
     console.log('#### MODTAGET ####');
    });
    
    this.oneSignal.handleNotificationOpened().subscribe(() => {
      console.log('#### OPEN ####');
    });
    
    this.oneSignal.endInit();
  }


}
