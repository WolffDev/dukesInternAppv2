import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage';

@Injectable()
export class StorageServiceProvider {

  constructor(private storage: NativeStorage ) {
    console.log('Hello StorageServiceProvider Provider');
  }

}
